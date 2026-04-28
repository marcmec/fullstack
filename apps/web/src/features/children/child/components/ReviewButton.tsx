'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { reviewAction } from '../actions'

export function ReviewButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleReview() {
    setLoading(true)
    try {
      await reviewAction(id)
      setOpen(false)
    } catch {
      setError('Não foi possível marcar como revisado. Tente novamente.')

    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(status:boolean) => {   setError(null); setOpen(status) }}>
      <DialogTrigger asChild>
        <Button variant="default" >Marcar como revisado</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar revisão</DialogTitle>
          <DialogDescription>
            Ao confirmar, este caso será marcado como revisado com seu email de técnico.
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleReview} disabled={loading}>
            {loading ? 'Revisando...' : 'Confirmar revisão'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}