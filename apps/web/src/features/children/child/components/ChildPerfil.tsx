import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Crianca } from "@fullstack/types"
import { getAlerts } from "../../helpers"
import { alertLabels } from "../../labels"

const ChildPerfil = ({ data }: { data: Crianca }) => {
    const alerts = getAlerts(data)

    return (
        <Card className="p-6 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-primary">{data.nome}</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {data.id} · {data.bairro} · Nascimento: {data.data_nascimento}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Responsável: {data.responsavel}
                    </p>
                    {data.revisado_em && data.revisado_por && (
                        <>

                            <p className="text-sm text-muted-foreground">
                                Revisado em: {data.revisado_em}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Revisado por: {data.revisado_por}
                            </p>
                        </>
                    )}
                </div>
                <Badge variant={data.revisado ? 'default' : 'destructive'}>
                    {data.revisado ? 'Revisado' : 'Pendente'}
                </Badge>
            </div>

            {alerts.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {alerts.map(alert => (
                        <Badge key={alert} variant="destructive">
                            {alertLabels[alert as keyof typeof alertLabels] ?? alert}
                        </Badge>
                    ))}
                </div>
            )}
        </Card>
    )
}

export default ChildPerfil