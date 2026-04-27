import { Summary } from "@fullstack/types"
import StatsCard from "./StatsCard"

const StatsChildren = ({Summary}: {Summary: Summary}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            <StatsCard title="Crianças Acompanhadas" value={Summary.total} />
            <StatsCard title="Crianças com Pendências" value={Summary.pendentes} />
            <StatsCard title="Crianças Revisadas" value={Summary.revisados} />
            <StatsCard title="Crianças sem Assistência" value={Summary.alertas.sem_assistencia} alert />
        </div>
    )
}   

export default StatsChildren