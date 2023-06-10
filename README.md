# setup
- `asdf local nodejs 18.16.0`
- `npm init --yes`
  - package.json の "main" の下に "type": "module" を追加
- `npm install --save-dev typescript @types/node`
- `npx tsc --init`
  - tsconfig.jsonが作成される。ちょこちょこ変更する(1.3.4)
- src/index.ts を用意し、何か書く。
- `npx tsc` でコンパイル実行。distディレクトリにトランスパイルされたものが出力される。
- `node ./dist/index.js` で実行。


