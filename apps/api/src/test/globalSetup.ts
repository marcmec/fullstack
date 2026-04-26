import type { TestProject } from 'vitest/node'
import { MongoMemoryServer } from 'mongodb-memory-server'
import 'dotenv/config'

declare module 'vitest' {
  export interface ProvidedContext {
    MONGO_URI: string
  }
}

let mongod: MongoMemoryServer

export async function setup({ provide }: TestProject) {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  provide('MONGO_URI', uri)
}

export async function teardown() {
  await mongod.stop()
}