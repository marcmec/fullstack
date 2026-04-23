import mongoose from 'mongoose'
import criancas from './data/seed.json'
import { ChildrenModel } from '../models/Children'

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fullstack')
  console.log('Conectado ao MongoDB')

  await ChildrenModel.deleteMany({})
  console.log('Coleção limpa')

  await ChildrenModel.insertMany(criancas)
  console.log(`${criancas.length} registros inseridos`)

  await mongoose.disconnect()
  console.log('Desconectado')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
