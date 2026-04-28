import { Card } from "@/components/ui/card"

const SectorCard = <T,>({title,data,render,}: {title: string, data: T | null, render: (data: T) => React.ReactNode}) => {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-bold text-primary text-sm uppercase tracking-wide">
        {title}
      </h3>
      {data ? (
        render(data)
      ) : (
        <p className="text-sm text-muted-foreground">
          Sem dados registrados
        </p>
      )}
    </Card>
  )
}

export default SectorCard