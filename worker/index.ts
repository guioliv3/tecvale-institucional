import { getMockInstagramFeed } from './providers/mockInstagramFeed'

type WorkerEnvironment = {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  INSTAGRAM_FEED_MODE?: 'mock' | 'meta'
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}

export default {
  async fetch(request: Request, env: WorkerEnvironment): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname.startsWith('/api/')) {
      if (pathname !== '/api/instagram/posts') {
        return json({ error: 'Rota de API não encontrada.' }, 404)
      }

      if (request.method !== 'GET') {
        return json({ error: 'Método não permitido.' }, 405, { Allow: 'GET' })
      }

      if (env.INSTAGRAM_FEED_MODE !== 'mock') {
        return json(
          { error: 'A conexão oficial com o Instagram ainda não foi configurada.' },
          501,
        )
      }

      return json(getMockInstagramFeed())
    }

    return env.ASSETS.fetch(request)
  },
}
