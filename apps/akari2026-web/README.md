# akari2026-web

TanStack Start (React + Vite) アプリ。Cloudflare Workers にデプロイする。

```sh
pnpm --filter akari2026-web dev         # http://localhost:3002（Workers ランタイムで動く）
pnpm --filter akari2026-web build
pnpm --filter akari2026-web preview     # ビルド成果物を Workers ランタイムで確認
pnpm --filter akari2026-web deploy      # build して wrangler deploy
pnpm --filter akari2026-web cf-typegen  # wrangler.jsonc 変更後に型を再生成
```

- ルートは `src/routes/` に置く。`src/routeTree.gen.ts` は dev / build 時に自動生成される。
- Workers の設定は `wrangler.jsonc`。バインディング（KV、D1、R2 など）を追加したら `cf-typegen` を実行する。
- 初回デプロイ前に `npx wrangler login`（CI では `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID`）が必要。
