import Fastify from 'fastify'
import cors from '@fastify/cors'
import mongoPlugin from './plugins/mongo'
import addFormats from 'ajv-formats'
import { childrenRoutes } from './routes/children'
import { authRoutes } from './routes/auth'
import authPlugin from './plugins/auth'

export const build = (opts = {}) => {
 const app = Fastify({
    logger: true,
    ajv: {
  plugins: [[addFormats as any, { formats: ['email'] }]],
},
    ...opts,
  })
  
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

  return app
}