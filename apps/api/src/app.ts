import Fastify from 'fastify'
import cors from '@fastify/cors'
import mongoPlugin from './plugins/mongo'
import { childrenRoutes } from './routes/children'
import { authRoutes } from './routes/auth'
import authPlugin from './plugins/auth'

export const build = (opts = {}) => {
  const app = Fastify({ logger: true, ...opts })

  app.register(cors, {
    origin: 'http://localhost:3000',
  })

  app.register(mongoPlugin)
  app.register(authPlugin)
  app.register(childrenRoutes)
  app.register(authRoutes)
  app.get('/health', async () => {
    return { status: 'ok' }
  })

  app.ready(() => {
  console.log(app.printRoutes())
})
  return app
}