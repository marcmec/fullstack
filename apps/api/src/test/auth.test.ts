import { describe, it, expect } from 'vitest'
import { build } from '../app'

describe('POST /auth/token', () => {
  it('retorna token com credenciais válidas', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: {
        email: 'tecnico@prefeitura.rio',
        password: 'painel@2024',
      },
    })
    const body = JSON.parse(res.body)
    expect(res.statusCode).toBe(200)
    expect(body.token).toBeDefined()
    expect(typeof body.token).toBe('string')
  })

  it('retorna 401 com senha inválida', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: {
        email: 'tecnico@prefeitura.rio',
        password: 'senha_errada',
      },
    })
    expect(res.statusCode).toBe(401)
  })

  it('retorna 403 se email não for do domínio @prefeitura.rio', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: {
        email: 'qualquer@gmail.com',
        password: 'painel@2024',
      },
    })
    expect(res.statusCode).toBe(403)
  })

  it('retorna 400 se email for malformado', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: {
        email: 'nao-eh-email',
        password: 'painel@2024',
      },
    })
    expect(res.statusCode).toBe(400)
  })

  it('retorna 400 se email não for fornecido', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: { password: 'painel@2024' },
    })
    expect(res.statusCode).toBe(400)
  })

  it('retorna 400 se password não for fornecido', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: { email: 'tecnico@prefeitura.rio' },
    })
    expect(res.statusCode).toBe(400)
  })
})

describe('PATCH /children/:id/review (protegido)', () => {
  it('retorna 401 sem token', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'PATCH',
      url: '/children/c001/review',
    })
    expect(res.statusCode).toBe(401)
  })

  it('retorna 401 com token inválido', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'PATCH',
      url: '/children/c001/review',
      headers: { authorization: 'Bearer token_invalido' },
    })
    expect(res.statusCode).toBe(401)
  })

  it('marca como revisado com token válido', async () => {
    const app = build({ logger: false })

    const loginRes = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: {
        email: 'tecnico@prefeitura.rio',
        password: 'painel@2024',
      },
    })
    const { token } = JSON.parse(loginRes.body)

    const res = await app.inject({
      method: 'PATCH',
      url: '/children/c001/review',
      headers: { authorization: `Bearer ${token}` },
    })
    const body = JSON.parse(res.body)

    expect(res.statusCode).toBe(200)
    expect(body.data.revisado).toBe(true)
    expect(body.data.revisado_por).toBe('tecnico@prefeitura.rio')
  })

  it('retorna 404 com token válido mas id inexistente', async () => {
    const app = build({ logger: false })

    const loginRes = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: {
        email: 'tecnico@prefeitura.rio',
        password: 'painel@2024',
      },
    })
    const { token } = JSON.parse(loginRes.body)

    const res = await app.inject({
      method: 'PATCH',
      url: '/children/c999/review',
      headers: { authorization: `Bearer ${token}` },
    })
    expect(res.statusCode).toBe(404)
  })
})