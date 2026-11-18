const partners = [
  {
    src: "/images/responsabilidade/asilo-franciscano.gif",
    name: "Asilo Franciscano Santo Antônio",
    className: "social-partner-logo--asilo",
  },
  {
    src: "/images/responsabilidade/gacc-vale.jpg",
    name: "GACC Vale do Paraíba",
  },
  {
    src: "/images/responsabilidade/guri-na-roca.png",
    name: "Guri na Roça",
  },
  {
    src: "/images/responsabilidade/shh-sao-jose.png",
    name: "Serviço de Hematologia e Hemoterapia de São José dos Campos",
  },
  {
    src: "/images/responsabilidade/acemt.png",
    name: "Associação Cultural e Educacional Madre Teresa (ACEMT)",
  },
];

export function SocialResponsibilityLogos() {
  return (
    <ul className="social-partners" aria-label="Instituições apoiadas pela Tecvale">
      {partners.map(({ src, name }) => (
        <li key={name} className="social-partner">
          <img className="social-partner-logo" src={src} alt={name} />
        </li>
      ))}
    </ul>
  );
}
