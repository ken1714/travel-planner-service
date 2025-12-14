# AGENTS.md

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


## AI-DLC and Spec-Driven Development

Kiro-style Spec Driven Development implementation on AI-DLC (AI Development Life Cycle)

### Project Memory
Project memory keeps persistent guidance (steering, specs notes, component docs) so Codex honors your standards each run. Treat it as the long-lived source of truth for patterns, conventions, and decisions.

- Use `.kiro/steering/` for project-wide policies: architecture principles, naming schemes, security constraints, tech stack decisions, api standards, etc.
- Use local `AGENTS.md` files for feature or library context (e.g. `src/lib/payments/AGENTS.md`): describe domain assumptions, API contracts, or testing conventions specific to that folder. Codex auto-loads these when working in the matching path.
- Specs notes stay with each spec (under `.kiro/specs/`) to guide specification-level workflows.

### Project Context

#### Paths
- Steering: `.kiro/steering/`
- Specs: `.kiro/specs/`

#### Steering vs Specification

**Steering** (`.kiro/steering/`) - Guide AI with project-wide rules and context
**Specs** (`.kiro/specs/`) - Formalize development process for individual features

#### Active Specifications
- Check `.kiro/specs/` for active specifications
- Use `/prompts:kiro-spec-status [feature-name]` to check progress

### Development Guidelines
- Think in English, generate responses in Japanese. All Markdown content written to project files (e.g., requirements.md, design.md, tasks.md, research.md, validation reports) MUST be written in the target language configured for this specification (see spec.json.language).

### Minimal Workflow
- Phase 0 (optional): `/prompts:kiro-steering`, `/prompts:kiro-steering-custom`
- Phase 1 (Specification):
  - `/prompts:kiro-spec-init "description"`
  - `/prompts:kiro-spec-requirements {feature}`
  - `/prompts:kiro-validate-gap {feature}` (optional: for existing codebase)
  - `/prompts:kiro-spec-design {feature} [-y]`
  - `/prompts:kiro-validate-design {feature}` (optional: design review)
  - `/prompts:kiro-spec-tasks {feature} [-y]`
- Phase 2 (Implementation): `/prompts:kiro-spec-impl {feature} [tasks]`
  - `/prompts:kiro-validate-impl {feature}` (optional: after implementation)
- Progress check: `/prompts:kiro-spec-status {feature}` (use anytime)

### Development Rules
- 3-phase approval workflow: Requirements → Design → Tasks → Implementation
- Human review required each phase; use `-y` only for intentional fast-track
- Keep steering current and verify alignment with `/prompts:kiro-spec-status`
- Follow the user's instructions precisely, and within that scope act autonomously: gather the necessary context and complete the requested work end-to-end in this run, asking questions only when essential information is missing or the instructions are critically ambiguous.

### Steering Configuration
- Load entire `.kiro/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Custom files are supported (managed via `/prompts:kiro-steering-custom`)
