import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import mongoose from 'mongoose'

async function mongoPlugin(app: FastifyInstance) {
  const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/fullstack'

  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
    })
    app.log.info('MongoDB conectado com sucesso')
  } catch (err) {
    app.log.error('Erro ao conectar no MongoDB')
    throw err
  }

  app.addHook('onClose', async () => {
    await mongoose.disconnect()
  })
}

export default fp(mongoPlugin, {
  name: 'mongo',
})
