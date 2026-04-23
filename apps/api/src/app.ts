import Fastify from 'fastify'
import cors from '@fastify/cors'
import mongoPlugin from './plugins/mongo'
import { childrenRoutes } from './routes/children'

export const build = (opts = {}) => {
  const app = Fastify({ logger: true, ...opts })

  app.register(cors, {
    origin: 'http://localhost:3000',
  })

  app.register(mongoPlugin)
  app.register(childrenRoutes)

  app.get('/health', async () => {
    return { status: 'ok' }
  })

  return app
}