import Fastify from 'fastify'
import cors from '@fastify/cors'
import mongoPlugin from './plugins/mongo'

const app = Fastify({ logger: true })

app.register(cors, {
  origin: 'http://localhost:3000',
})

app.register(mongoPlugin)

app.get('/health', async () => {
  return { status: 'ok' }
})

app.listen({ port: 3001, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
