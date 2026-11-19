import { useEffect, useState } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { mockInstagramFeedPosts, type InstagramFeedPost } from '@/content/instagramFeed'

const instagramUrl = 'https://www.instagram.com/tecvaleconstrutora/'

type FeedResponse = {
  mode: 'mock' | 'meta'
  posts: InstagramFeedPost[]
}

function PostActions() {
  return (
    <div className="flex items-center justify-between text-ink" aria-hidden="true">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.8 8.7c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />
        </svg>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
        </svg>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />
        </svg>
      </div>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-4-6 4V4.8Z" />
      </svg>
    </div>
  )
}

function InstagramPostCard({ post }: { post: InstagramFeedPost }) {
  return (
    <article className="min-w-0 border-b border-ink/15 pb-5">
      <div className="flex items-center justify-between gap-3 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center border border-wine text-sm font-medium text-wine">
            T
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">tecvaleconstrutora</p>
            <p className="truncate text-[11px] text-muted">{post.project}</p>
          </div>
        </div>
        <span className="shrink-0 text-[9px] uppercase tracking-[0.12em] text-wine">
          Mockup
        </span>
      </div>

      <img
        src={post.imageUrl}
        alt={post.imageAlt}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />

      <div className="pt-3">
        <PostActions />
        <p className="mt-3 text-xs leading-5 text-ink">
          <span className="font-semibold">{post.project}</span> {post.caption}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-muted">
          Publicação ilustrativa
        </p>
      </div>
    </article>
  )
}

export function InstagramSection() {
  const [posts, setPosts] = useState(mockInstagramFeedPosts)
  const [isMock, setIsMock] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/instagram/posts', {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
          throw new Error('Feed indisponível')
        }

        return (await response.json()) as FeedResponse
      })
      .then((feed) => {
        if (feed.posts?.length) {
          setPosts(feed.posts.slice(0, 4))
          setIsMock(feed.mode !== 'meta')
        }
      })
      .catch(() => {
        // No preview local, mantém os mockups até a rota do Worker estar disponível.
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="py-20 md:py-28">
      <div className="frame-x mx-auto max-w-[1600px]">
        <div className="grid items-end gap-8 border-t border-ink/15 pt-8 md:grid-cols-12 md:gap-12 md:pt-10">
          <div className="md:col-span-8">
            <Eyebrow>Instagram · @tecvaleconstrutora</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">
              Acompanhe de perto o que estamos construindo.
            </h2>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-3 text-sm text-wine transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine md:col-span-4 md:justify-self-end"
          >
            Ver perfil no Instagram
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {isMock && (
          <div className="mt-8 flex flex-col gap-2 border-y border-ink/15 py-4 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>Mockups para apresentação: imagens e legendas são ilustrativas.</p>
            <p className="text-wine">Feed real após autorização da conta</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-x-7">
          {posts.map((post) => <InstagramPostCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  )
}
