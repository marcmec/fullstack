import { FastifyInstance } from 'fastify'

const VALID_EMAIL = 'tecnico@prefeitura.rio'
const VALID_PASSWORD = 'painel@2024'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/token', async (request, reply) => {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }

    const token = app.jwt.sign(
      { email },
      { expiresIn: '8h' }
    )

    return { token }
  })
}