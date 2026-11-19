# Feed do Instagram no Cloudflare Worker

## Fluxo atual de demonstração

```text
Home → GET /api/instagram/posts → Worker → provedor mock → quatro cards demonstrativos
```

A Home consulta a rota do Worker e começa exibindo os mesmos quatro dados locais enquanto a resposta carrega. Assim, a prévia também funciona no servidor Vite sem Wrangler. No Worker, a rota devolve o mock explicitamente marcado como `mode: "mock"`.

## Etapa de conexão real

```text
Tecvale autoriza a conta profissional pela Meta
        ↓
Worker recebe o retorno OAuth e guarda o token como segredo
        ↓
Provedor Meta busca as publicações e normaliza os quatro itens recentes
        ↓
GET /api/instagram/posts entrega os dados à Home
        ↓
Interface exibe cada publicação
```

A autorização precisa ser feita por alguém com acesso à conta profissional da Tecvale. O token fica no Cloudflare Worker como segredo e não é enviado ao navegador. A implementação OAuth e a consulta real à Meta ficam para a etapa de conexão; `INSTAGRAM_FEED_MODE` permanece em `mock` até lá.

## Rodar e publicar

Instale o Wrangler quando o acesso ao registry estiver disponível:

```sh
pnpm add -D wrangler
```

Depois:

```sh
pnpm worker:dev
pnpm worker:deploy
```

O `wrangler.jsonc` publica o build de `dist`, mantém o fallback de rotas da SPA e encaminha `/api/*` ao Worker. A rota de feed é `GET /api/instagram/posts`.

## Próxima etapa técnica

1. Criar o app da Tecvale no Meta for Developers e configurar Instagram Login, a permissão `instagram_business_basic` e a URL de retorno.
2. Implementar OAuth no Worker, validando `state` e trocando o código por token no servidor.
3. Guardar o token com `wrangler secret put INSTAGRAM_ACCESS_TOKEN` e definir `INSTAGRAM_FEED_MODE` como `meta` somente quando o provedor real estiver pronto.
4. Implementar o provedor Meta, normalizar as quatro publicações mais recentes e manter a mesma resposta usada pelos cards.
5. Se a apresentação precisar reproduzir o embed nativo do Instagram, retornar os permalinks e renderizar um iframe por publicação.

Nunca coloque tokens em `src/`, no bundle do navegador ou em variáveis `VITE_*`.
