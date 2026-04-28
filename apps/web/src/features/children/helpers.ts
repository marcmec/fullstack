import { Crianca } from "@fullstack/types";

const countAlerts = (crianca: Crianca):number =>{

    return [
        ...(crianca?.saude?.alertas || []),
        ...(crianca?.educacao?.alertas || []),
        ...(crianca?.assistencia_social?.alertas || []),
    ].length
}
export { countAlerts }

export function getAlerts(c: Crianca): string[] {
  return [
    ...(c.saude?.alertas ?? []),
    ...(c.educacao?.alertas ?? []),
    ...(c.assistencia_social?.alertas ?? []),
    ...(!c.saude ? ['sem_saude'] : []),
    ...(!c.educacao ? ['sem_educacao'] : []),
    ...(!c.assistencia_social ? ['sem_assistencia'] : []),
  ]
}