import mongoose from 'mongoose'
import { inject, beforeAll, afterAll } from 'vitest'
import { ChildrenModel } from '../models/Children'
import criancas from '../scripts/data/seed.json'

beforeAll(async () => {
  const uri = inject('MONGO_URI')
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(uri)
  }
  await ChildrenModel.deleteMany({})
  await ChildrenModel.insertMany(criancas)
})

afterAll(async () => {
  await mongoose.disconnect()
})