'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { logoutAction } from '@/features/auth/actions'

export function UserMenu({ email }: { email: string }) {
  const initials = email.slice(0, 2).toUpperCase()
  
  const handleLogout = async () => {
    await logoutAction()
  }
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" >
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <button className="w-full cursor-pointer" onClick={handleLogout}>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}