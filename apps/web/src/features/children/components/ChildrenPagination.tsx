'use client'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { PaginationProps } from "./interfaces/PaginationProps"
import { useRouter, useSearchParams } from "next/dist/client/components/navigation"

const ChildrenPagination = ({ page, pages }: PaginationProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    return (
        <Pagination>
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem>

                        <PaginationPrevious
                            onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.set("page", (page - 1).toString());
                                router.push(`?${params.toString()}`);
                            }}
                        />

                    </PaginationItem>
                )}
                <PaginationItem>
                <PaginationLink>
                     {page} 
                </PaginationLink>
                <span>de {pages}</span>
                </PaginationItem>
                {page < pages && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.set("page", (page + 1).toString());
                                router.push(`?${params.toString()}`);
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>

        </Pagination>
    )

}

export default ChildrenPagination