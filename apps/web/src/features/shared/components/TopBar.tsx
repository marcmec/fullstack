import { UserMenu } from "./UserMenu"
import { getCurrentUser } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"


const TopBar = async () => {

      const user = await getCurrentUser()

    return (
        <header className="w-full border-b border-primary bg-card shadow-xl">
            <div className="flex justify-between items-center px-6 py-4">
                <div>
                    <h1 className="text-lg font-bold text-primary">Painel Municipal</h1>
                    <p className="text-xs text-muted-foreground">prefeitura · centro de operações</p>
                </div>

                <div className="flex flex-row items-center gap-4">
                    {/* TODO: alertas vindos do /stats */}
                    <Badge variant="destructive" className="text-xs shadow-2xl outline-2">
                        7 Alertas Ativos
                    </Badge>
                    <UserMenu email={user?.email ?? 'usuário'} />
                </div>
            </div>
        </header>
    )
}

export default TopBar