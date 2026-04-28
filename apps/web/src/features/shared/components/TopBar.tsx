import { UserMenu } from "./UserMenu"
import { getCurrentUser } from "@/lib/auth"

import Link from "next/link"
import { NavLink } from "./NavLink"


const TopBar = async () => {
    const user = await getCurrentUser()
    return (
        <header className="w-full border-b border-primary bg-card shadow-xl fixed top-0 z-20">
            <div className="flex justify-between items-center px-6 py-4">
                <Link href={'/'} className="hover:underline">
                    <h1 className="text-lg font-bold text-primary">Painel Municipal</h1>
                    <p className="text-xs text-muted-foreground">prefeitura · centro de operações</p>
                </Link>
                <div className="w-full items-start gap-4 hidden md:flex">
                    <NavLink href={'/dashboard'}>
                     Dashboard
                    </NavLink>
                    <NavLink href={'/children'}>
                        Crianças
                    </NavLink>
                </div>

                <div className="flex flex-row items-center gap-4">
                    <span className="hidden md:inline">{user?.email}</span>
                    
                    <UserMenu email={user?.email ?? 'usuário'} />
                </div>
            </div>
        </header>
    )
}

export default TopBar