
import { Badge } from "@/components/ui/badge"
import { alertLabels } from "../../labels"
const AlertsList = ({ alertas }: { alertas: string[] }) => {
  if (alertas.length === 0) {
    return <p className="text-xs text-green-600">✓ Sem alertas</p>
  }

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {alertas.map((a) => (
        <Badge key={a} variant="destructive" className="text-xs">
          {alertLabels[a as keyof typeof alertLabels] ?? a}
        </Badge>
      ))}
    </div>
  )
}
export default AlertsList


