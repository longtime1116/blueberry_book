# setup

- `asdf local nodejs 18.16.0`
- `npm init --yes`
  - package.json の "main" の下に "type": "module" を追加
- `npm install --save-dev typescript @types/node`
- `npx tsc --init`
  - tsconfig.json が作成される。ちょこちょこ変更する(1.3.4)
- src/index.ts を用意し、何か書く。
- `npx tsc` でコンパイル実行。dist ディレクトリにトランスパイルされたものが出力される。
  - `npx tsc --watch` が便利
- `node ./dist/index.js` で実行。


# メモ
- 4.3 の部分型の部分、理解はできたが直感的にサクサク脳内操作ができるほどではない気がする。要復習。
