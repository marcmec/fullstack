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

  it('retorna 401 com email inválido', async () => {
    const app = build({ logger: false })
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: {
        email: 'errado@email.com',
        password: 'painel@2024',
      },
    })
    expect(res.statusCode).toBe(401)
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
      headers: {
        authorization: 'Bearer token_invalido',
      },
    })
    expect(res.statusCode).toBe(401)
  })

  it('marca como revisado com token válido', async () => {
    const app = build({ logger: false })

    // primeiro pega o token
    const loginRes = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: {
        email: 'tecnico@prefeitura.rio',
        password: 'painel@2024',
      },
    })
    const { token } = JSON.parse(loginRes.body)

    // usa o token para fazer o PATCH
    const res = await app.inject({
      method: 'PATCH',
      url: '/children/c001/review',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const body = JSON.parse(res.body)

    expect(res.statusCode).toBe(200)
    expect(body.data.revisado).toBe(true)
    expect(body.data.revisado_por).toBe('tecnico@prefeitura.rio')
    expect(body.data.revisado_em).toBeDefined()
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
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    expect(res.statusCode).toBe(404)
  })
})