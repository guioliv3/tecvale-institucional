import { journal } from '@/content/site'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Photo } from '@/components/ui/Photo'

export function JournalSection() {
  return (
    <section className="frame-x mx-auto max-w-[1600px]">
      <div className="max-w-xl">
        <Eyebrow>Universo Tecvale</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-5xl">Novidades e tendências que definem a nossa essência</h2>
        <p className="mt-4 text-sm text-muted">Títulos de demonstração.</p>
      </div>
      <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {journal.map((a) => (
          <li key={a.title}>
            <Photo photo={a.image} className="aspect-[4/3]" tag={false} />
            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-wine">{a.tag}</p>
            <h3 className="mt-2 text-xl leading-snug md:text-2xl">{a.title}</h3>
          </li>
        ))}
      </ul>
    </section>
  )
}
