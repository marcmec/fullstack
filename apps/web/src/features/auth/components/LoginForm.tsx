'use client'

import { useActionState, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction } from '../actions'
import { Eye, EyeOff } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Card className="w-full max-w-sm p-6 bg-primary-foreground/10 border-primary-foreground/20">
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-primary text-xs uppercase tracking-wide">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tecnico@prefeitura.rio"
          className="bg-primary-foreground text-primary border"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-primary text-xs uppercase tracking-wide">
          Senha
        </Label>
        <div className='flex flex-row gap-2 items-center max-w-full relative'>

          <Input
            id="password"
            name="password"
            type={isVisible ? "text" : "password"}
            className="bg-primary-foreground text-primary border-1"
            required
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

      </div>

      {(state?.errors || state?.message) && (
        <p className="text-sm text-destructive-foreground bg-destructive/30 px-3 py-2 rounded">
          {state.errors?.email?.[0] || state.errors?.password?.[0] || state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
      >
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
    </Card>
  )
}