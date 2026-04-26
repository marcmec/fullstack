import { describe, it, expect, beforeAll } from 'vitest'
import { build } from '../app'


let token: string
let app: ReturnType<typeof build>

beforeAll(async () => {
  app = build({ logger: false })
  await app.ready()

  const loginRes = await app.inject({
    method: 'POST',
    url: '/auth/token',
    payload: {
      email: 'tecnico@prefeitura.rio',
      password: 'painel@2024',
    },
  })
  token = JSON.parse(loginRes.body).token
})


const authedGet = (url: string) =>
  app.inject({
    method: 'GET',
    url,
    headers: { authorization: `Bearer ${token}` },
  })


describe('GET /children', () => {
  it('retorna todas as crianças', async () => {
    const res = await authedGet('/children')
    const body = JSON.parse(res.body)
    expect(res.statusCode).toBe(200)
    expect(body.pagination.total).toBe(25)
  })

 it('filtra por bairro', async () => {
  const res = await authedGet('/children?bairro=Rocinha')
  const body = JSON.parse(res.body)
  expect(body.data.every((c: any) => c.bairro === 'Rocinha')).toBe(true)
})

it('filtra por alerta', async () => {
  const res = await authedGet('/children?alerta=vacinas_atrasadas')
  const body = JSON.parse(res.body)
  expect(body.pagination.total).toBe(8)
})

  it('filtra por revisado', async () => {
    const res = await authedGet('/children?revisado=true')
    const body = JSON.parse(res.body)
    expect(body.pagination.total).toBe(5)
  })

  it('respeita paginação', async () => {
    const res = await authedGet('/children?page=1&limit=10')
    const body = JSON.parse(res.body)
    expect(body.data.length).toBe(10)
    expect(body.pagination.pages).toBe(3)
  })
})

describe('GET /children/:id', () => {
  it('retorna uma criança pelo id', async () => {
    const res = await authedGet('/children/c001')
    const body = JSON.parse(res.body)
    expect(res.statusCode).toBe(200)
    expect(body.data.nome).toBe('Ana Clara Mendes')
  })

  it('retorna 404 para id inexistente', async () => {
    const res = await authedGet('/children/c999')
    expect(res.statusCode).toBe(404)
  })
})

describe('GET /stats', () => {
  it('retorna contagens corretas', async () => {
    const res = await authedGet('/stats')
    const body = JSON.parse(res.body)
    expect(res.statusCode).toBe(200)
    expect(body.total).toBe(25)
    expect(body.revisados).toBe(5)
    expect(body.pendentes).toBe(20)
    expect(body.alertas.vacinas_atrasadas).toBe(8)
    expect(body.alertas.frequencia_baixa).toBe(7)
    expect(body.alertas.sem_saude).toBe(2)
    expect(body.alertas.sem_educacao).toBe(5)
    expect(body.alertas.sem_assistencia).toBe(4)
  })
})