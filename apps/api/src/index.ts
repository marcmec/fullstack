import Fastify from 'fastify'
import cors from '@fastify/cors'

const app = Fastify({ logger: true })

app.register(cors, {
  origin: 'http://localhost:3000'
})

app.get('/', async () => {
  return { hello: 'world' }
})

app.get('/health', async () => {
  return { status: 'ok' }
})

app.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})