import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { useEmpreendimentos } from "@/features/empreendimentos/useEmpreendimentos";
import { office } from "@/content/site";
import { translatePage } from "@/features/i18n/translatePage";

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
      "Fale com a Tecvale por telefone, e-mail, WhatsApp ou formulário e encontre o escritório em São José dos Campos.",
  },
  "/politica-de-privacidade": {
    title: "Política de privacidade | Tecvale",
    description:
      "Saiba como a Tecvale trata os dados pessoais usados no site, no formulário de contato e nos serviços externos incorporados.",
  },
};

export function RootLayout() {
  const { pathname } = useLocation();
  const english = window.location.pathname === "/en" || window.location.pathname.startsWith("/en/");
  const { projects, loading: projectsLoading } = useEmpreendimentos(english || pathname.startsWith("/empreendimentos/"));
  useEffect(() => {
    document.documentElement.lang = english ? "en" : "pt-BR";
    if (!english || projectsLoading) return;
    return translatePage([
      "Tecvale", "Tecvale Construtora e Incorporadora Ltda.", "CNPJ", "WhatsApp",
      office.address, office.city, office.email,
      "São José dos Campos", "Jacareí", "Taubaté", "Vale do Paraíba",
      ...projects.flatMap((project) => [project.name, project.neighborhood, project.city, project.address ?? ""]),
    ]);
  }, [english, projects, projectsLoading]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    const project = pathname.startsWith("/empreendimentos/")
      ? projects.find((item) => item.slug === pathname.split("/").filter(Boolean).at(-1))
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
    const socialImageUrl = new URL(project?.cover.src ?? "/images/concreto.jpg", siteUrl).href;
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

    const canonicalUrl = new URL(`${english ? "/en" : ""}${pathname}`, siteUrl).href;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    for (const [language, prefix] of [["pt-BR", ""], ["en", "/en"]]) {
      const alternate = document.createElement("link");
      alternate.rel = "alternate";
      alternate.hreflang = language;
      alternate.href = new URL(`${prefix}${pathname}`, siteUrl).href;
      document.head.append(alternate);
    }

    const schemaId = "page-structured-data";
    const schemaScript = document.querySelector<HTMLScriptElement>(`#${schemaId}`) ?? document.createElement("script");
    if (pathname === "/sobre") {
      schemaScript.id = schemaId;
      schemaScript.type = "application/ld+json";
      schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: metadata.title,
        description: metadata.description,
        url: canonicalUrl,
        inLanguage: english ? "en" : "pt-BR",
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
  }, [pathname, projects, english]);
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
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
