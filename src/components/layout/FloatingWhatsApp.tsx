import { useEffect, useState } from 'react'

const whatsappUrl = 'https://wa.me/5512988534827'

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.querySelector<HTMLElement>('[data-home-hero]')
      const isMobile = window.matchMedia('(max-width: 767px)').matches
      setVisible(window.scrollY > 0 && !(isMobile && hero && hero.getBoundingClientRect().bottom > 0))
    }
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)
    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale pelo WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full border border-wine/15 bg-page text-wine transition-[opacity,transform,visibility] duration-200 hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine motion-reduce:transition-none ${visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'}`}
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7">
        <path d="M26.2 5.8A14.2 14.2 0 0 0 3.8 22.9L2 30l7.3-1.9A14.2 14.2 0 0 0 26.2 5.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11.1 9.3c-.4-.9-.8-.9-1.2-.9h-1c-.4 0-.9.2-1.3.7-.5.5-1.7 1.6-1.7 3.8s1.8 4.4 2 4.7c.2.3 3.5 5.6 8.7 7.4 4.3 1.5 5.2 1.2 6.2 1.1 1-.1 3.1-1.3 3.5-2.5.4-1.2.4-2.2.3-2.4-.2-.2-.5-.4-1-.6l-3.2-1.5c-.4-.2-.8-.3-1.1.3-.4.5-1.2 1.5-1.5 1.8-.3.4-.6.4-1 .1-.5-.2-2-.7-3.8-2.4-1.4-1.2-2.4-2.8-2.7-3.3-.3-.5 0-.8.2-1.1l.8-.9c.2-.3.3-.5.5-.8.1-.3 0-.6-.1-.8l-1.6-3.7Z" fill="currentColor" transform="translate(2 0) scale(.85)" />
      </svg>
    </a>
  )
}
