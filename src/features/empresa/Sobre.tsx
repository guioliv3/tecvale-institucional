import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageSectionNav } from "@/components/ui/PageSectionNav";
import { TextLink } from "@/components/ui/TextLink";
import { img } from "@/content/empreendimentos";
import { SobreHero } from "./SobreHero";

const sections = [
  { id: "historia", label: "Nossa história" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "essencia", label: "Nossa essência" },
  { id: "qualidade", label: "Como construímos" },
  { id: "responsabilidade", label: "Responsabilidade" },
  { id: "resultados", label: "Nossos resultados" },
];

function SectionTitle({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow: string;
  children: string;
}) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 text-3xl md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

export function Sobre() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setMenuVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={heroRef}>
        <SobreHero />
      </div>
      <div className="frame-x mx-auto max-w-[1600px] pb-24 pt-10 md:pb-36 md:pt-16">
        <div className="grid gap-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-24">
          <div className="md:sticky md:top-32 md:h-fit">
            <PageSectionNav title="A Tecvale" sections={sections} visible={menuVisible} />
          </div>

          <div className="min-w-0">
            <section
              id="historia"
              aria-labelledby="historia-title"
              className="scroll-mt-28 py-20 md:py-32"
            >
              <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
                <div>
                  <Eyebrow>Nossa história</Eyebrow>
                  <h2 id="historia-title" className="mt-4 text-3xl md:text-5xl">
                    O começo de uma trajetória.
                  </h2>
                </div>
                <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
                  <p>
                    A Tecvale consolidou sua atuação com planejamento, qualidade nos materiais,
                    acabamento cuidadoso e escolha criteriosa de cada localização — sempre com
                    atenção à segurança, ao bem-estar e à valorização dos imóveis.
                  </p>
                  <p>
                    Essa trajetória tem como referência o legado de seu fundador, Antônio Augusto
                    Martins Lopes: respeito ao próximo e o compromisso de fazer sempre o melhor.
                  </p>
                  <p>
                    Com uma história de luta e conquista de capital próprio, a empresa se fortalece
                    e amplia sua atuação, levando mais sofisticação aos empreendimentos.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="arquitetura-title" className="pb-20 md:pb-32">
              <div className="mb-8 max-w-xl">
                <Eyebrow>Espaços que ficam</Eyebrow>
                <h2 id="arquitetura-title" className="mt-4 text-3xl md:text-5xl">
                  A vida acontece nos detalhes.
                </h2>
              </div>
              <div className="grid grid-cols-2 items-start gap-3 md:gap-6">
                <Photo
                  photo={{
                    src: img("fachada-1.jpg"),
                    alt: "Fachada residencial cercada por vegetação, imagem ilustrativa",
                  }}
                  className="col-span-2 aspect-[16/8]"
                />
                <Photo
                  photo={{
                    src: img("concreto.jpg"),
                    alt: "Detalhe de arquitetura em concreto, imagem ilustrativa",
                  }}
                  className="aspect-[4/5]"
                />
                <Photo
                  photo={{
                    src: img("casa-2.jpg"),
                    alt: "Casa com revestimento em pedra, imagem ilustrativa",
                  }}
                  className="mt-8 aspect-[4/5] md:mt-16"
                />
              </div>
              <p className="mt-4 text-xs text-muted">
                Imagens ilustrativas do material visual atual.
              </p>
            </section>

            <section
              id="trajetoria"
              aria-labelledby="trajetoria-title"
              className="scroll-mt-28 bg-surface px-6 py-10 md:px-12 md:py-14"
            >
              <SectionTitle id="trajetoria-title" eyebrow="Trajetória">
                Uma empresa em movimento.
              </SectionTitle>
              <ol className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
                {[
                  ["2009", "Mirante do Vale", "Jacareí"],
                  ["2012", "Condomínio Mirante do Vale", "Jacareí"],
                  ["2014", "Residencial Johanna", "Jacareí"],
                  ["2017", "Maison Soraya", ""],
                  ["2019", "Residencial Antonio de Vimioso", "São José dos Campos"],
                  ["2021", "Green Life Villa Branca", "Jacareí"],
                  ["2023", "Believe Residence", "São José dos Campos"],
                ].map(([year, name, place]) => (
                  <li
                    key={year}
                    className="grid gap-1 py-4 md:grid-cols-[100px_1fr_auto] md:items-baseline md:gap-6"
                  >
                    <span className="font-serif text-xl text-wine">{year}</span>
                    <span className="text-sm text-ink md:text-base">{name}</span>
                    {place && <span className="text-sm text-muted">{place}</span>}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-muted">
                Marcos publicados pela Tecvale em{" "}
                <a
                  href="https://tecvaleconstrutora.com.br/obras-entregues/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-ink"
                >
                  Obras Entregues
                </a>
                .
              </p>
            </section>

            <section
              id="essencia"
              aria-labelledby="essencia-title"
              className="scroll-mt-28 py-20 md:py-32"
            >
              <SectionTitle id="essencia-title" eyebrow="Nossa essência">
                O que nos orienta.
              </SectionTitle>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Propósito, visão e valores dão direção ao trabalho e ajudam a transformar intenção
                em escolhas cotidianas.
              </p>
              <div className="mt-10 grid gap-x-10 md:grid-cols-3">
                {[
                  [
                    "Propósito",
                    "Contribuir para realizar sonhos por meio da construção com excelência e da entrega de empreendimentos diferenciados, com respeito a todos os envolvidos.",
                  ],
                  [
                    "Visão",
                    "Evoluir constantemente, manter colaboradores motivados e conquistar clientes cada vez mais satisfeitos, superando expectativas.",
                  ],
                  [
                    "Valores",
                    "Fé em Deus, responsabilidade, honestidade, transparência, inovação, excelência, compromisso social, empatia e paixão pelo que faz.",
                  ],
                ].map(([title, copy]) => (
                  <article key={title} className="border-t border-ink/20 py-5">
                    <h3 className="font-serif text-2xl">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{copy}</p>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="qualidade"
              aria-labelledby="qualidade-title"
              className="scroll-mt-28 bg-wine px-6 py-10 text-white md:px-12 md:py-14"
            >
              <Eyebrow>Como construímos</Eyebrow>
              <h2 id="qualidade-title" className="mt-4 max-w-xl text-3xl text-white md:text-5xl">
                Qualidade é compromisso em cada etapa.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                A política da qualidade reúne compromissos que atravessam o projeto, a obra e as
                relações com clientes, fornecedores e colaboradores.
              </p>
              <ul className="mt-8 grid gap-x-8 border-t border-white/30 md:grid-cols-2">
                {[
                  "Melhoria contínua dos produtos e serviços",
                  "Satisfação dos clientes e parceria com fornecedores",
                  "Sustentabilidade nos canteiros de obras",
                  "Inovação nos produtos",
                  "Atendimento às exigências legais e requisitos aplicáveis",
                  "Capacitação dos colaboradores",
                ].map((item) => (
                  <li key={item} className="border-b border-white/20 py-4 text-sm text-white/90">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section
              id="responsabilidade"
              aria-labelledby="responsabilidade-title"
              className="scroll-mt-28 py-20 md:py-32"
            >
              <SectionTitle id="responsabilidade-title" eyebrow="Responsabilidade">
                Cuidar também faz parte da obra.
              </SectionTitle>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                O compromisso social da Tecvale começa pela comunidade que a cerca. A empresa também
                inclui a sustentabilidade em seus canteiros de obras.
              </p>
              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <article>
                  <h3 className="border-t border-ink/20 pt-4 font-serif text-2xl">
                    Compromisso social
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    A Tecvale acredita que construir também é assumir responsabilidade com as
                    pessoas e com a comunidade ao redor. Esse compromisso faz parte dos valores que
                    orientam a empresa.
                  </p>
                </article>
                <article>
                  <h3 className="border-t border-ink/20 pt-4 font-serif text-2xl">
                    Compromisso ambiental
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    A política da qualidade prevê sustentabilidade nos canteiros de obras e inovação
                    nos produtos. Nos empreendimentos, a empresa também destaca soluções como horta
                    compartilhada e bicicletas compartilhadas.
                  </p>
                </article>
              </div>
            </section>

            <section
              id="resultados"
              aria-labelledby="resultados-title"
              className="scroll-mt-28 pt-10 md:pt-14"
            >
              <div>
                <Eyebrow>Nossos resultados</Eyebrow>
                <h2 id="resultados-title" className="mt-4 text-3xl md:text-5xl">
                  O que construímos juntos.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                  Sete empreendimentos entregues aparecem na relação publicada pela Tecvale, de
                  Mirante do Vale, em 2009, ao Believe Residence, em 2023.
                </p>
                <div className="mt-5">
                  <TextLink to="/empreendimentos">Ver empreendimentos</TextLink>
                </div>
              </div>
              <dl className="mt-12 grid grid-cols-3 gap-x-4 md:gap-x-8">
                {[
                  ["47+", "Anos de mercado"],
                  ["199", "Empreendimentos lançados"],
                  ["5,8", "Milhões de m²"],
                ].map(([value, label]) => (
                  <div key={value} className="flex flex-col">
                    <dt className="order-2 mt-3 text-[9px] uppercase leading-relaxed tracking-[0.14em] text-muted md:text-xs">
                      {label}
                    </dt>
                    <dd className="order-1 font-sans text-5xl font-light leading-none tracking-[-0.05em] text-ink md:text-7xl">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
