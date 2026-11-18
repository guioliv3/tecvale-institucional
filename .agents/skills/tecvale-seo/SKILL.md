---
name: tecvale-seo
description: Audite e melhore o SEO do site TecVale após a conclusão de páginas ou do projeto, cobrindo indexação, arquitetura, dados estruturados e clareza para mecanismos de busca com IA.
---

# SEO do site TecVale

Use este fluxo quando o usuário pedir a auditoria final de SEO do site ou melhorias coordenadas nas páginas já concluídas. Trabalhe sobre o código do projeto e compare-o com as páginas publicadas quando estiverem acessíveis. Preserve o design; mudanças visuais só entram se forem solicitadas.

## Fluxo

Execute as quatro etapas nesta ordem. Corrija problemas comprovados que estejam no escopo e registre limitações que dependam de publicação, acesso ou informação da empresa.

### 1. Auditoria técnica e on-page

- Inspecione as rotas, o HTML inicial, a forma de renderização, títulos, descrições, canonical, robots, sitemap, Open Graph, headings, links e imagens.
- Acesse as páginas públicas correspondentes e compare o HTML/metadados publicados com o código. Verifique indexabilidade e sinais de desempenho com ferramentas disponíveis; diferencie medição real de inferência.
- Identifique metadados ausentes, duplicados, conflitantes ou que só aparecem depois de JavaScript quando isso afetar indexadores ou prévias sociais.
- Corrija o que puder ser resolvido com segurança no projeto e sem redesenhar as páginas.

**Concluído quando:** cada rota pública relevante foi inventariada, os metadados principais e a indexabilidade foram verificados, e cada problema encontrado foi corrigido ou anotado com evidência e bloqueio específico.

### 2. Arquitetura do site

- Confira se URLs são estáveis, legíveis e coerentes com as páginas existentes, incluindo empreendimentos e páginas de detalhe.
- Valide navegação e links internos: páginas importantes devem ser encontráveis por links rastreáveis, sem destinos quebrados ou caminhos inconsistentes.
- Compare rotas do projeto com sitemap e URLs publicados. Não crie páginas ou altere slugs sem necessidade; preserve URLs existentes ou proponha redirecionamento quando uma mudança for indispensável.

**Concluído quando:** as rotas relevantes estão mapeadas e inconsistências de URL, descoberta ou ligação interna foram corrigidas ou listadas com recomendação concreta.

### 3. Dados estruturados

- Escolha o tipo Schema.org adequado a cada página com base no conteúdo que ela realmente apresenta (por exemplo, `Organization`, `AboutPage`, `WebSite`, `BreadcrumbList` ou tipos de empreendimento apenas se os requisitos forem atendidos).
- Use JSON-LD válido, ligado à entidade TecVale de modo consistente entre páginas. Mantenha os dados estruturados alinhados ao conteúdo visível e aos metadados.
- Use somente fatos confirmados no código, em fontes oficiais ou pelo usuário. Não invente avaliações, preços, datas, áreas, endereço, identificadores, prêmios, números ou relações. Omita propriedades sem evidência.
- Valide sintaxe e, quando possível, resultados em ferramenta oficial de teste. Anote tipos elegíveis e erros que dependam de validação externa.

**Concluído quando:** cada marcação adicionada corresponde ao conteúdo visível e a fatos verificáveis, a sintaxe foi validada e nenhuma propriedade sem fonte foi publicada.

### 4. Clareza para busca com IA

- Revise as páginas para identificar entidade, serviços, localização atendida, empreendimentos, diferenciais e responsabilidade da empresa de forma explícita e consistente.
- Melhore títulos, subtítulos, texto institucional, rótulos e perguntas/respostas quando isso reduzir ambiguidade ou tornar fatos importantes mais fáceis de localizar e citar.
- Preserve o tom de voz TecVale e a intenção editorial. Prefira afirmações específicas apoiadas por fontes a superlativos, texto promocional vago ou conteúdo criado apenas para mecanismos de IA.
- Considere páginas públicas e consultas de busca quando a avaliação depender de informação atual; cite fontes externas usadas no relatório.

**Concluído quando:** afirmações importantes têm sujeito e contexto claros, inconsistências foram resolvidas ou sinalizadas e as melhorias mantêm o tom e os fatos aprovados pela TecVale.

## Entrega

Apresente um resumo curto com:

1. O que foi auditado (rotas, código e páginas públicas acessadas).
2. Problemas encontrados e alterações implementadas, agrupados pelas quatro etapas.
3. Verificações realizadas e seus resultados, separando medição de inferência.
4. Pendências que dependem de publicação, acesso externo ou confirmação factual.

Não declare uma auditoria pública completa se o site publicado não pôde ser acessado. Não prometa ranking, indexação ou citações por mecanismos de IA; descreva as condições observadas e as ações executadas.
