import { Crianca } from "@fullstack/types";

const countAlerts = (crianca: Crianca):number =>{

    return [
        ...(crianca?.saude?.alertas || []),
        ...(crianca?.educacao?.alertas || []),
        ...(crianca?.assistencia_social?.alertas || []),
    ].length
}
export { countAlerts }