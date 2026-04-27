import { Card } from "@/components/ui/card";
import { StatCardProps } from "../types";

const StatsCard = ({ title, value, description, alert=false}: StatCardProps) => {
    return (
        <Card
      className={`p-4 transition-colors ${
        alert
          ? 'bg-destructive/10 border-destructive/40'
          : 'bg-card border-border'
      }`}
    >
      <p
        className={`text-xs uppercase tracking-wide font-medium ${
          alert ? 'text-destructive' : 'text-muted-foreground'
        }`}
      >
        {title}
      </p>

      <p
        className={`text-2xl font-bold mt-1 ${
          alert ? 'text-destructive' : 'text-foreground'
        }`}
      >
        {value}
      </p>

      {description && (
        <p className="text-xs text-muted-foreground mt-2">
          {description}
        </p>
      )}
    </Card>
    )
}

export default StatsCard
