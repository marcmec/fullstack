export type LoginActionState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
} | null