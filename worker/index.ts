import { getMockInstagramFeed } from './providers/mockInstagramFeed'

type WorkerEnvironment = {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  INSTAGRAM_FEED_MODE?: 'mock' | 'meta'
  AI: { run: (model: string, input: { messages: { role: string; content: string }[]; temperature: number; max_completion_tokens: number; chat_template_kwargs: { enable_thinking: boolean } }) => Promise<{ response?: string; choices?: { message?: { content?: string } }[] }> }
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}

async function translate(source: string, request: Request, env: WorkerEnvironment) {
  const leading = source.match(/^\s*/)?.[0] ?? ''
  const trailing = source.match(/\s*$/)?.[0] ?? ''
  const bytes = new TextEncoder().encode(source)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  const key = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
  const cache = (caches as CacheStorage & { default: Cache }).default
  const cacheRequest = new Request(new URL(`/translations/pt-en/v4/${key}`, request.url))
  const cached = await cache.match(cacheRequest)
  if (cached) return cached.text()
  const response = await env.AI.run('@cf/google/gemma-4-26b-a4b-it', {
    messages: [
      { role: 'system', content: 'Translate Brazilian Portuguese website text into natural English. This is a real estate developer website. Use development for empreendimento, floor plan for planta, parking space for vaga, and en-suite bedroom for suíte when appropriate. Preserve names, addresses, numbers, units, punctuation, and all [[KEEP_0]] style tokens exactly. Return only the translation, with no explanation or quotation marks.' },
      { role: 'user', content: source.trim() },
    ],
    temperature: 0,
    max_completion_tokens: 500,
    chat_template_kwargs: { enable_thinking: false },
  })
  const translated = response.response ?? response.choices?.[0]?.message?.content
  if (!translated) throw new Error('Empty translation')
  const sourceNumbers = source.match(/\d+(?:[.,]\d+)*/g) ?? []
  const translatedNumbers = translated.match(/\d+(?:[.,]\d+)*/g) ?? []
  let numberIndex = 0
  const preserved = sourceNumbers.length === translatedNumbers.length
    ? translated.replace(/\d+(?:[.,]\d+)*/g, () => sourceNumbers[numberIndex++])
    : translated
  const result = `${leading}${preserved.trim()}${trailing}`
  await cache.put(cacheRequest, new Response(result, { headers: { 'Cache-Control': 'public, max-age=2592000' } }))
  return result
}

export default {
  async fetch(request: Request, env: WorkerEnvironment): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname.startsWith('/api/')) {
      if (pathname === '/api/translate') {
        if (request.method !== 'POST') return json({ error: 'Método não permitido.' }, 405, { Allow: 'POST' })
        const origin = request.headers.get('Origin')
        const currentUrl = new URL(request.url)
        let localPreview = false
        if (origin && ['localhost', '127.0.0.1'].includes(currentUrl.hostname)) {
          try {
            const source = new URL(origin)
            localPreview = source.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(source.hostname)
          } catch {
            localPreview = false
          }
        }
        if (origin && origin !== currentUrl.origin && !localPreview) return json({ error: 'Origem não permitida.' }, 403)
        if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({ error: 'Formato inválido.' }, 415)
        const body = await request.json().catch(() => null) as { texts?: unknown } | null
        if (!Array.isArray(body?.texts) || body.texts.length > 8 || body.texts.some((value) => typeof value !== 'string' || value.length > 1200)) {
          return json({ error: 'Textos inválidos.' }, 400)
        }
        try {
          const translations: string[] = []
          for (let index = 0; index < body.texts.length; index += 8) {
            const group = body.texts.slice(index, index + 8) as string[]
            translations.push(...await Promise.all(group.map((source) => translate(source, request, env))))
          }
          return json({ translations }, 200, { 'Cache-Control': 'public, max-age=3600' })
        } catch (error) {
          console.error('Translation failed', error)
          return json({ error: 'Não foi possível traduzir o conteúdo.' }, 502)
        }
      }
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
