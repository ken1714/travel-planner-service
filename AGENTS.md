# AGENT.md

このリポジトリでChatGPT系エージェントが作業する際のガイドラインです。

## コミュニケーション
- すべて日本語でやり取り・記述（コメント、ドキュメント、コミットメッセージを含む）。

## プロジェクト概要
- NestJS + TypeScript + TypeORM + PostgreSQL の旅行プランナーAPI（ポート3000）。GraphQL利用（`schema.gql`）。
- エントリーポイント: `src/main.ts`。ビルド成果物は`dist/`。

## よく使うコマンド
- `npm run start:dev` 開発起動（ホットリロード）
- `npm run start:prod` 本番モード起動（`npm run build`後）
- `npm run lint` / `npm run format` スタイル・整形
- `npm run build` 型チェック付きビルド
- `npm run test` / `npm run test:e2e` テスト
- `npm run migration:run|revert|generate|create` / `npm run db:reset` マイグレーション関連

## 開発ルール（必読）
- `docs/coding-standards.md` と `docs/github-issue-workflow.md` を遵守。
- レイヤー依存方向: プレゼンテーション → ユースケース → ドメイン ← インフラ。ビジネスルールは必ずドメイン層に置く。
- ファイル命名は機能名のみ（`user.ts` 等、`.controller.ts`や`.entity.ts`サフィックス禁止）。ディレクトリは規約の構造に従う。
- 環境変数にデフォルト値を埋め込まない（`.env`で明示管理）。`ConfigService.get`にデフォルト値を渡さない。
- マジックナンバー禁止、構造化ログ推奨、ドメイン／アプリケーション／インフラ例外を使い分ける。

## Git運用
- ブランチ命名: `feature|fix|docs|refactor/issue-{番号}-{説明}`。
- コミットは最小単位で分割し、メッセージは `[feat]` `[fix]` `[docs]` `[refactor]` `[test]` `[chore]` などの接頭辞を使用。
- PR作成時はテンプレート遵守・Issue紐付け（`Closes #123`）・WIPはDraftまたは`[WIP]`。

## テスト・品質チェック
- 原則API/E2Eテストでユースケースを検証し、複雑なドメインロジックのみ最小限のユニットテストを追加。
- 作業後は `npm run lint` `npm run build` `npm run test` `npm run test:e2e` を実行してからPR。
