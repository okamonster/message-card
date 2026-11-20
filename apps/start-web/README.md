# start-web

TanStack Start (React + Vite) アプリ。

```sh
pnpm --filter start-web dev    # http://localhost:3002
pnpm --filter start-web build
pnpm --filter start-web start  # ビルド成果物をプレビュー
```

ルートは `src/routes/` に置く。`src/routeTree.gen.ts` は dev / build 時に自動生成される。
