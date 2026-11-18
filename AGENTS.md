# Tecvale

React 19, TypeScript, Vite 8 e Tailwind CSS v4.

## Desenvolvimento

- O servidor Vite costuma estar disponível no ambiente de preview em `$PORT` (padrão `8443`), com hot reload. Confira antes de iniciar outro servidor.
- Use `pnpm` para os comandos do projeto. Os scripts disponíveis estão em `package.json`.

## Estrutura do projeto

- `index.html` - shell HTML do Vite, com o elemento `#root` e entrada da aplicação.
- `src/main.tsx` - monta `src/app/App.tsx` e importa `src/styles/index.css`.
- `src/app/App.tsx` e `src/app/routes.ts` - inicialização e rotas da aplicação.
- `src/pages/` - componentes de página associados às rotas.
- `src/features/` - componentes e conteúdo específicos de cada área do produto.
- `src/components/layout/` e `src/components/ui/` - componentes compartilhados de layout e interface.
- `src/content/` - conteúdo estruturado do site, incluindo empreendimentos.
- `src/styles/index.css` - estilos globais e tema Tailwind.
- `package.json`, `vite.config.ts` e `.mise.toml` - dependências, configuração de build e versões das ferramentas.

Siga a organização existente: mantenha lógica específica junto à feature correspondente e promova componentes para `components/ui` quando forem realmente compartilhados.

## Estilos

- O Tailwind CSS v4 é integrado pelo plugin `@tailwindcss/vite`; não há necessidade de criar configuração Tailwind ou PostCSS sem um requisito concreto.
- `src/styles/index.css` importa Tailwind com `@import "tailwindcss";`. Mantenha imports CSS no início do arquivo e coloque customizações de tema nesse arquivo.
- Use classes utilitárias no JSX. Regras globais de elementos devem ficar dentro de `@layer base` para que utilitários possam sobrescrevê-las.
- Tailwind Preflight já define `box-sizing`, remove margens padrão e aplica `font: inherit` aos controles de formulário; não duplique esses resets.
