'use client'

import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const ChildrenFilters = ({ data }: { data: string[] }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [bairro, setBairro] = useState(searchParams.get('bairro') ?? '')
    const [revisado, setRevisado] = useState(searchParams.get('revisado') ?? '')
    const [alerta, setAlerta] = useState(searchParams.get('alerta') ?? '')
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const pushParams = useCallback(
        (overrides: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString())

            const next = { bairro, revisado, alerta, ...overrides }

            params.delete('page')

            for (const [key, value] of Object.entries(next)) {
                if (value) params.set(key, value)
                else params.delete(key)
            }

            router.push(`?${params.toString()}`)
        },
        [router, searchParams, bairro, revisado, alerta]
    )

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            pushParams({ bairro })
        }, 400)
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [bairro])

    const handleRevisado = (value: string) => {
        setRevisado(value)
        pushParams({ revisado: value })
    }

    const handleAlerta = (value: string) => {
        setAlerta(value)
        pushParams({ alerta: value })
    }

    const handleClear = () => {
        setBairro('')
        setRevisado('')
        setAlerta('')
        router.push('?')
    }

    const hasFilters = bairro || revisado || alerta

    return (
        <div className="flex flex-wrap items-center gap-4 mt-3">
            {/* Bairro — autocomplete com datalist */}
            <div className="flex items-center gap-2">
                <label htmlFor="bairro" className="text-sm font-medium text-muted-foreground">
                    Bairro:
                </label>
                <input
                    type="text"
                    id="bairro"
                    list="bairros-list"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    placeholder="Todos"
                    className="border rounded-md px-2 py-1 text-sm w-40"
                />
                <datalist id="bairros-list">
                    {data.map((b) => (
                        <option key={b} value={b} />
                    ))}
                </datalist>
            </div>

            <div className="flex items-center gap-2">
                <label htmlFor="revisado" className="text-sm font-medium text-muted-foreground">
                    Revisado:
                </label>
                <select
                    id="revisado"
                    value={revisado}
                    onChange={(e) => handleRevisado(e.target.value)}
                    className="border rounded-md px-2 py-1 text-sm"
                >
                    <option value="">Todos</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label htmlFor="alerta" className="text-sm font-medium text-muted-foreground">
                    Alerta:
                </label>
                <select
                    id="alerta"
                    value={alerta}
                    onChange={(e) => handleAlerta(e.target.value)}
                    className="border rounded-md px-2 py-1 text-sm"
                >
                    <option value="">Todos</option>
                    <option value="true">Com Alerta</option>
                    <option value="false">Sem Alerta</option>
                </select>
            </div>

            {hasFilters && (
                <Button
                    onClick={handleClear}
                    className="text-sm underline underline-offset-2 hover:text-secondary hover:bg-white transition-colors cursor-pointer"
                >
                    Limpar filtros
                </Button>
            )}
        </div>
    )
}

export default ChildrenFilters