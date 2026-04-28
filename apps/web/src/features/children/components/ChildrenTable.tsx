import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Crianca } from "@fullstack/types";
import Link from "next/link";
import { countAlerts } from "../helpers";
import { Badge } from "@/components/ui/badge";

const ChildrenTable = ({ data }: { data: Crianca[] }) => {

    if (data.length === 0) {
        return (
            <Card className="p-8 text-center text-muted-foreground">
                <CardContent>Nenhuma Criança Encontrada</CardContent>
            </Card>
        )
    }


    return (

        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead className="text-center">Alertas</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((crianca) => {
                        const alertas = countAlerts(crianca);
                        return (
                            <TableRow key={crianca.id} className="cursor-pointer">
                                <TableCell>{crianca.id}</TableCell>
                                <TableCell ><Link href={`/children/${crianca.id}`} className="hover:text-primary">{crianca.nome}</Link></TableCell>
                                <TableCell>{crianca.bairro}</TableCell>
                                <TableCell className="text-center">
                                    {alertas > 0 ?(
                                        <Badge variant="destructive">{alertas}</Badge>
                                    ) : (
                                        <span className="text-muted-foreground">0</span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {crianca.revisado ? (
                                        <Badge variant="outline">Revisado</Badge>
                                    ) : (
                                        <Badge variant="outline">Pendente</Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        )
                    })
                    }


                </TableBody>
            </Table>
        </Card>
    )



}

export default ChildrenTable;