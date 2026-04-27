import Link from 'next/link'
import { Crianca } from '@fullstack/types'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { countAlerts } from '@/features/children/helpers'

const CriticalCasesSidebar = ({ cases }: { cases: Crianca[] }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary">Casos críticos</h3>
        <Link 
          href="/children" 
          className="text-xs text-muted-foreground hover:text-primary"
        >
          ver todos →
        </Link>
      </div>

      <div className="space-y-2">
        {cases.map(c => {
          const initials = c.nome.split(' ').slice(0, 2).map(n => n[0]).join('')
          const alertCount = countAlerts(c)
          
          return (
            <Link
              key={c.id}
              href={`/children/${c.id}`}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Avatar className="w-9 h-9">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{c.nome}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {c.bairro} · {c.id}
                </p>
              </div>
              
              <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                {alertCount}
              </span>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}

export default CriticalCasesSidebar