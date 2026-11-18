import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageSectionNav } from "@/components/ui/PageSectionNav";
import { TimelineBlock } from "@/components/ui/TimelineBlock";
import { TextLink } from "@/components/ui/TextLink";
import { RollingNumber } from "@/components/ui/RollingNumber";
import { img } from "@/content/empreendimentos";
import { TrajectoryTimeline } from "./TrajectoryTimeline";
import { SobreHero } from "./SobreHero";
import { GoogleReviewsCarousel } from "./GoogleReviewsCarousel";
import { SocialResponsibilityLogos } from "./SocialResponsibilityLogos";

const sections = [
  { id: "historia", label: "Nossa história" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "essencia", label: "Nossa essência" },
  { id: "resultados", label: "Nossos resultados" },
  { id: "qualidade", label: "Como construímos" },
  { id: "responsabilidade", label: "Responsabilidade" },
  { id: "avaliacoes", label: "Avaliações" },
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
        <div className="grid gap-10 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-8">
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
              <div className="mt-8 md:mt-10">
                <TextLink to="/contato">Fale com a Tecvale</TextLink>
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
              <div className="mt-6">
                <TextLink to="/empreendimentos">Ver empreendimentos</TextLink>
              </div>
            </section>

            <TimelineBlock id="trajetoria" eyebrow="Trajetória" title="Uma empresa em movimento.">
              <TrajectoryTimeline />
            </TimelineBlock>

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
                    <h3 className="font-serif text-2xl text-wine">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{copy}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6">
                <TextLink to="/contato">Converse com a Tecvale</TextLink>
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
                  Cada empreendimento lançado e cada unidade entregue representam uma história que
                  começa. Os números a seguir mostram a dimensão do que a Tecvale construiu junto
                  às pessoas e às cidades onde atua.
                </p>
                <div className="mt-5">
                  <TextLink to="/empreendimentos">Ver empreendimentos</TextLink>
                </div>
              </div>
              <dl className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-8">
                {[
                  { value: 17, suffix: "+", label: "Anos de mercado" },
                  { value: 9, suffix: "+", label: "Empreendimentos lançados" },
                  { value: 21, suffix: " mil+", label: "m² em áreas divulgadas" },
                  { value: 158, suffix: "+", label: "Unidades entregues" },
                ].map(({ value, suffix, label }) => (
                  <div key={label} className="flex min-w-0 flex-col">
                    <dt className="order-2 mt-3 text-[9px] uppercase leading-relaxed tracking-[0.14em] text-muted md:text-xs">
                      {label}
                    </dt>
                    <dd className="order-1 font-sans text-3xl font-light leading-none tracking-[-0.05em] text-wine sm:text-5xl md:text-7xl">
                      <RollingNumber value={value} suffix={suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section
              id="qualidade"
              aria-labelledby="qualidade-title"
              className="scroll-mt-28 py-20 md:py-32"
            >
              <SectionTitle id="qualidade-title" eyebrow="Como construímos">
                Qualidade é compromisso em cada etapa.
              </SectionTitle>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                A qualidade orienta o desenvolvimento dos produtos, a condução das obras e as
                relações com clientes, fornecedores e colaboradores. Na prática, ela se traduz em
                melhoria contínua, responsabilidade e atenção às exigências aplicáveis.
              </p>
              <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
                {[
                  {
                    title: "No projeto",
                    items: [
                      {
                        title: "Melhoria contínua",
                        description:
                          "Aperfeiçoamos produtos e serviços, buscando elevar a qualidade a cada etapa.",
                      },
                      {
                        title: "Inovação",
                        description:
                          "Novas ideias contribuem para o desenvolvimento dos empreendimentos.",
                      },
                    ],
                  },
                  {
                    title: "Na obra",
                    items: [
                      {
                        title: "Sustentabilidade",
                        description:
                          "Práticas sustentáveis fazem parte dos compromissos nos canteiros de obras.",
                      },
                      {
                        title: "Conformidade",
                        description:
                          "Atendemos às exigências legais e aos requisitos aplicáveis a cada atividade.",
                      },
                    ],
                  },
                  {
                    title: "Nas relações",
                    items: [
                      {
                        title: "Parceria e satisfação",
                        description:
                          "Valorizamos a satisfação dos clientes e a parceria com fornecedores.",
                      },
                      {
                        title: "Capacitação",
                        description:
                          "O desenvolvimento dos colaboradores também integra nossa política de qualidade.",
                      },
                    ],
                  },
                ].map(({ title, items }) => (
                  <article key={title} className="border-t border-ink/20 pt-5">
                    <h3 className="font-serif text-2xl text-wine">{title}</h3>
                    <ul className="mt-6 space-y-6">
                      {items.map((item) => (
                        <li key={item.title}>
                          <h4 className="text-sm font-medium text-wine">{item.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {item.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <div className="mt-8">
                <TextLink to="/contato">Fale com nossa equipe</TextLink>
              </div>
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
              <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
                <article>
                  <h3 className="border-t border-ink/20 pt-4 font-serif text-2xl">
                    Apoio que fortalece a comunidade
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    A Tecvale apoia instituições que acolhem, cuidam e promovem saúde na região:
                    Asilo Franciscano Santo Antônio, GACC Vale do Paraíba e Serviço de Hematologia e
                    Hemoterapia de São José dos Campos.
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
                <article>
                  <h3 className="border-t border-ink/20 pt-4 font-serif text-2xl">
                    Quem faz a Tecvale
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    Capacitar e manter os colaboradores motivados também faz parte da política de
                    qualidade da Tecvale. Assim, cada pessoa contribui com atenção e responsabilidade
                    ao longo da obra.
                  </p>
                </article>
              </div>
              <div className="mt-8">
                <TextLink to="/contato">Saiba mais com a Tecvale</TextLink>
              </div>
              <div className="mt-12 md:mt-16">
                <SocialResponsibilityLogos />
              </div>
            </section>

            <section
              id="avaliacoes"
              aria-labelledby="avaliacoes-title"
              className="scroll-mt-28 py-20 md:py-32"
            >
              <SectionTitle id="avaliacoes-title" eyebrow="Avaliações">
                Veja o que nossos clientes e parceiros pensam.
              </SectionTitle>
              <GoogleReviewsCarousel />
            </section>


          </div>
        </div>
      </div>
    </>
  );
}
