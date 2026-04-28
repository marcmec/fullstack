import { Crianca } from "@fullstack/types"
import AlertsList from "./AlertsList"
import InfoRow from "./InfoRow"
import SectorCard from "./SectorCard"

const StatsChild = ({ data }: { data: Crianca }) => {
    return (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SectorCard
        title="Saúde"
        data={data.saude}
        render={(s) => (
          <>
            <InfoRow label="Última consulta" value={s.ultima_consulta} />
            <InfoRow label="Vacinas em dia" value={s.vacinas_em_dia ? 'Sim' : 'Não'} />
            <AlertsList alertas={s.alertas} />
          </>
        )}
      />

      <SectorCard
        title="Educação"
        data={data.educacao}
        render={(e) => (
          <>
            <InfoRow label="Escola" value={e?.escola!} />
            <InfoRow label="Frequência" value={`${e?.frequencia_percent!}%`} />
            <AlertsList alertas={e?.alertas!} />
          </>
        )}
      />

      <SectorCard
        title="Assistência Social"
        data={data.assistencia_social}
        render={(a) => (
          <>
            <InfoRow label="CadÚnico" value={a?.cad_unico ? 'Sim' : 'Não'} />
            <InfoRow label="Benefício ativo" value={a?.beneficio_ativo ? 'Sim' : 'Não'} />
            <AlertsList alertas={a?.alertas} />
          </>
        )}
      />
    </div>
    )
}

export default StatsChild