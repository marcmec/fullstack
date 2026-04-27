import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .endsWith('@prefeitura.rio', 'Use seu email institucional'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>