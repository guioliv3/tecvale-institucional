type TranslationResponse = { translations?: string[] }

const cacheKey = 'tecvale-en-translations-v4'
let stored: [string, string][] = []
try { stored = JSON.parse(localStorage.getItem(cacheKey) || '[]') as [string, string][] } catch { /* Ignore damaged local cache. */ }
const cached = new Map<string, string>(stored)
const originals = new WeakMap<Text, { source: string; rendered: string }>()
const attributeOriginals = new WeakMap<Element, Map<string, { source: string; rendered: string }>>()
const attributes = ['alt', 'aria-label', 'placeholder', 'title', 'content']

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function translatePage(protectedValues: string[]) {
  const names = [...new Set(protectedValues.filter((value) => value.length > 2))].sort((a, b) => b.length - a.length)
  const protectedPattern = new RegExp(`(${names.map(escapeRegex).join('|')}|[\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,})`, 'gi')
  const pending = new Set<string>()
  const failed = new Set<string>()
  let timer: number | undefined
  let sending = false
  let stopped = false

  function mask(source: string) {
    const values: string[] = []
    const text = source.replace(protectedPattern, (value) => {
      values.push(value)
      return `[[KEEP_${values.length - 1}]]`
    })
    return { text, values }
  }

  function shouldTranslate(value: string) {
    return /[A-Za-zÀ-ÿ]/.test(value.replace(/\[\[KEEP_\d+\]\]/g, ''))
      && value.trim().length > 1
  }

  function translated(source: string) {
    const { text, values } = mask(source)
    return (cached.get(text) ?? text).replace(/\[\[KEEP_(\d+)\]\]/g, (token, index: string) => values[Number(index)] ?? token)
  }

  function collect(source: string) {
    const { text } = mask(source)
    if (shouldTranslate(text) && !cached.has(text) && !failed.has(text) && text.length <= 1200) pending.add(text)
  }

  function visit(root: ParentNode) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const node = walker.currentNode as Text
      const parent = node.parentElement
      if (!parent || parent.closest('[translate="no"], script, style, noscript, textarea')) continue
      const last = originals.get(node)
      const source = last && node.data === last.rendered ? last.source : node.data
      if (!source.trim()) continue
      collect(source)
      const next = translated(source)
      originals.set(node, { source, rendered: next })
      if (node.data !== next) node.data = next
    }

    for (const element of root.querySelectorAll('[alt], [aria-label], [placeholder], [title], meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]')) {
      if (element.closest('[translate="no"]')) continue
      const known = attributeOriginals.get(element) ?? new Map<string, { source: string; rendered: string }>()
      for (const attribute of attributes) {
        if (!element.hasAttribute(attribute)) continue
        if (attribute === 'content' && !element.matches('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]')) continue
        const value = element.getAttribute(attribute) ?? ''
        const previous = known.get(attribute)
        const source = previous && value === previous.rendered ? previous.source : value
        collect(source)
        const next = translated(source)
        known.set(attribute, { source, rendered: next })
        if (value !== next) element.setAttribute(attribute, next)
      }
      attributeOriginals.set(element, known)
    }
  }

  async function flush() {
    if (sending || stopped || !pending.size) return
    sending = true
    const texts = [...pending].slice(0, 8)
    texts.forEach((text) => pending.delete(text))
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts }),
      })
      if (!response.ok) throw new Error(`Translation request failed: ${response.status}`)
      const result = await response.json() as TranslationResponse
      if (!result.translations || result.translations.length !== texts.length) throw new Error('Invalid translation response')
      texts.forEach((text, index) => cached.set(text, result.translations![index]))
      try { localStorage.setItem(cacheKey, JSON.stringify([...cached].slice(-1500))) } catch { /* Storage is optional. */ }
      visit(document.body)
      visit(document.head)
    } catch (error) {
      console.error('Não foi possível traduzir a página.', error)
      texts.forEach((text) => failed.add(text))
    } finally {
      sending = false
      if (pending.size) schedule()
    }
  }

  function schedule() {
    window.clearTimeout(timer)
    timer = window.setTimeout(flush, 120)
  }

  function update() {
    visit(document.body)
    visit(document.head)
    schedule()
  }

  const observer = new MutationObserver(() => {
    if (stopped) return
    window.clearTimeout(timer)
    timer = window.setTimeout(update, 80)
  })
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attributes })
  observer.observe(document.head, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attributes })
  update()
  return () => { stopped = true; observer.disconnect(); window.clearTimeout(timer) }
}
