import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { getEmpreendimento } from "@/content/empreendimentos";
import { ContactForm } from "@/features/contato/ContactForm";

const siteUrl = "https://tecvaleconstrutora.com.br";

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Tecvale Construtora e Incorporadora | Vale do Paraíba",
    description:
      "Conheça os empreendimentos da Tecvale em Jacareí e São José dos Campos e fale com nossa equipe.",
  },
  "/empreendimentos": {
    title: "Empreendimentos | Tecvale Construtora",
    description:
      "Explore os empreendimentos da Tecvale em obras e entregues, com localização, tipologia, área e etapa.",
  },
  "/sobre": {
    title: "Sobre a Tecvale | Construtora e Incorporadora",
    description:
      "Conheça a história da Tecvale, seus valores e compromissos com qualidade nos empreendimentos em Jacareí e São José dos Campos.",
  },
  "/contato": {
    title: "Contato | Tecvale",
    description:
      "Entre em contato com a equipe da Tecvale para saber mais sobre nossos empreendimentos.",
  },
};

export function RootLayout() {
  const { pathname, search } = useLocation();
  const selectedProject =
    pathname === "/contato"
      ? getEmpreendimento(new URLSearchParams(search).get("empreendimento") ?? undefined)
      : undefined;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    const project = pathname.startsWith("/empreendimentos/")
      ? getEmpreendimento(pathname.split("/").filter(Boolean).at(-1))
      : undefined;
    const metadata = project
      ? { title: `${project.name} | Tecvale`, description: project.summary }
      : (pageMetadata[pathname] ?? {
          title: "Página não encontrada | Tecvale",
          description: "A página solicitada não foi encontrada.",
        });

    document.title = metadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", metadata.description);
    const socialImageUrl = new URL(project?.cover.src ?? "/images/neori-interior-option.jpg", siteUrl).href;
    const socialImageAlt =
      project?.cover.alt ?? "Imagem ilustrativa de empreendimento residencial da Tecvale";
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", socialImageUrl);
    document
      .querySelector('meta[property="og:image:alt"]')
      ?.setAttribute("content", socialImageAlt);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", socialImageUrl);
    document
      .querySelector('meta[name="twitter:image:alt"]')
      ?.setAttribute("content", socialImageAlt);

    const canonicalUrl = new URL(pathname, siteUrl).href;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);

    const schemaId = "page-structured-data";
    const schemaScript = document.getElementById(schemaId) ?? document.createElement("script");
    if (pathname === "/sobre") {
      schemaScript.id = schemaId;
      schemaScript.type = "application/ld+json";
      schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: metadata.title,
        description: metadata.description,
        url: canonicalUrl,
        inLanguage: "pt-BR",
        mainEntity: {
          "@type": "Organization",
          name: "Tecvale Construtora e Incorporadora",
          url: siteUrl,
          logo: `${siteUrl}/images/logo-tecvale-preto.svg`,
        },
      });
      document.head.append(schemaScript);
    } else {
      schemaScript.remove();
    }
  }, [pathname]);
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <section aria-labelledby="footer-contact-title" className="bg-surface py-20 md:py-28">
        <div className="frame-x mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 id="footer-contact-title" className="text-3xl md:text-5xl">
              Envie uma mensagem
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">
              Conte como podemos ajudar e fale com a equipe da Tecvale.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm key={selectedProject?.slug ?? "geral"} projeto={selectedProject} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
