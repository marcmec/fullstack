import { FastifyInstance } from 'fastify'

const VALID_EMAIL = 'tecnico@prefeitura.rio'
const VALID_PASSWORD = 'painel@2024'
const ALLOWED_DOMAIN = '@prefeitura.rio'

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/auth/token',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 1 },
          },
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body as {
        email: string
        password: string
      }

      if (!email.endsWith(ALLOWED_DOMAIN)) {
        return reply.status(403).send({
          message: `Apenas emails do domínio ${ALLOWED_DOMAIN} são permitidos`,
        })
      }

      if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
        return reply.status(401).send({ message: 'Invalid credentials' })
      }

      const token = app.jwt.sign({ email }, { expiresIn: '8h' })

      return { token }
    }
  )
}