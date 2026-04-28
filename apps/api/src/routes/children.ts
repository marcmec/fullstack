import { FastifyInstance } from "fastify";
import { ChildrenModel } from "../models/Children";


export async function childrenRoutes(app: FastifyInstance) {
    app.get('/children', async (request, reply) => {
        const { bairro, alerta, revisado, page = '1', limit = '15' } = request.query as {
            bairro?: string,
            alerta?: string,
            revisado?: string,
            page?: string,
            limit?: string

        }

        const filtro: Record<string, any> = {}

        if (bairro) {
            filtro.bairro = bairro
        }
        if (alerta) {
            filtro.$or = [
                { 'saude.alertas': alerta },
                { 'educacao.alertas': alerta },
                { 'assistencia_social.alertas': alerta }
            ]
        }

        if (revisado !== undefined) {
            filtro.revisado = revisado === 'true'
        }

        const pageNum = Math.max(1, parseInt(page))
        const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
        const skip = (pageNum - 1) * limitNum
        

        const [children, total] = await Promise.all([
            ChildrenModel.find(filtro).skip(skip).limit(limitNum).select('-_id -__v').lean(),
            ChildrenModel.countDocuments(filtro)
        ])


        return {
            data: children,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum),
            },
        }
    })

    app.get('/children/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const crianca = await ChildrenModel.findOne({ id }).select('-_id -__v').lean()
        if (!crianca) {
            return reply.status(404).send({ message: "Criança não encontrada" })
        }
        return { data: crianca }
    })

    //adicionar JWT para obritaroiedade do endpoint
    app.patch('/children/:id/review'
        , { onRequest: [app.authenticate] }, async (request, reply) => {
        const { id } = request.params as { id: string }
        const user = request.user as { preferred_username: string }

        const crianca = await ChildrenModel.findOneAndUpdate(
            { id },
            {
                revisado: true,
                revisado_por: user.preferred_username,
                revisado_em: new Date().toISOString(),
            },
            { new: true }
        ).select('-_id -__v').lean()

        if (!crianca) {
            return reply.status(404).send({ message: "Criança não encontrada" })
        }
        return { data: crianca }
    }
    )

    app.get('/stats', async () => {
        const [result] = await ChildrenModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: 1
                    },
                    revisados: {
                        $sum: { $cond: ["$revisado", 1, 0] }
                    },
                    sem_saude: {
                        $sum: { $cond: [{ $eq: ["$saude", null] }, 1, 0] }
                    },
                    sem_educacao: {
                        $sum: { $cond: [{ $eq: ["$educacao", null] }, 1, 0] }
                    },
                    sem_assistencia: {
                        $sum: { $cond: [{ $eq: ["$assistencia_social", null] }, 1, 0] }
                    },
                    vacinas_atrasadas: {
                        $sum: { $cond: [{ $eq: ["$saude.vacinas_em_dia", false] }, 1, 0] }
                    },
                    frequencia_baixa: {
                        $sum: {
                            $cond: [
                                {
                                    $in: [
                                        'frequencia_baixa',
                                        { $ifNull: ['$educacao.alertas', []] },
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                    beneficio_suspenso: {
                        $sum: {
                            $cond: [
                                {
                                    $in: ['beneficio_suspenso', { $ifNull: ['$assistencia_social.alertas', []] }],
                                },
                                1,
                                0,
                            ],
                        },
                    },

                }
            

            },
            {
                    $project: {
                    _id: 0,
                    total: 1,
                    revisados: 1,
                    pendentes: { $subtract: ["$total", "$revisados"] },
                    alertas: {
                        sem_saude: '$sem_saude',
                        sem_educacao: '$sem_educacao',
                        sem_assistencia: '$sem_assistencia',
                        vacinas_atrasadas: '$vacinas_atrasadas',
                        frequencia_baixa: '$frequencia_baixa',
                        beneficio_suspenso: '$beneficio_suspenso',
                    },
                }
            }
        ])
        return  result;
    }
    )
}
