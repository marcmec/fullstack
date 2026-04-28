import { Pagination } from "@/components/ui/pagination";
import ChildrenFilters from "@/features/children/components/ChildrenFilters";
import ChildrenPagination from "@/features/children/components/ChildrenPagination";
import ChildrenTable from "@/features/children/components/ChildrenTable";
import { getAuthToken } from "@/lib/auth";
import {  getChildren } from "@/services/childrenServices";


const ChildrenPage = async ({ searchParams }: {
    searchParams: Promise<{
        bairro?: string;
        revisado?: string;
        alerta?: string;
        page?: string;
    }>
}) => {
    //criar rotas com filtros melhores do que esse hardcorded, e criar um endpoint para retornar os bairros disponiveis
   const token = await getAuthToken();
    const filters = await searchParams;
 
    const [{ data, pagination }, allChildren] = await Promise.all([
        getChildren(token!, filters),
        getChildren(token!, { limit: "100" }),
    ]);
    const paginationData = pagination;
    const bairros = [...new Set(allChildren.data.map((c) => c.bairro))].sort();
    return (

        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-primary">Crianças</h2>
                <ChildrenFilters data={bairros} />

                <p className="text-sm text-muted-foreground mt-1">
                    {pagination.total} {pagination.total === 1 ? 'criança' : 'crianças'} encontradas
                </p>
            </div>
            <ChildrenTable data={data} />
            <ChildrenPagination page={paginationData.page} pages={paginationData.pages} />
        </div>
    )
}

export default ChildrenPage;    