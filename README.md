<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

旅行プランナーサービスのバックエンドAPI。NestJS + TypeORM + PostgreSQLで構築されています。

## 技術スタック

- **Framework**: NestJS v10
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Container**: Docker & Docker Compose

## Prerequisites

- Node.js (v18以上)
- Docker & Docker Compose
- npm

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
```

必要に応じて`.env`ファイルの内容を編集してください。

### 3. データベースの起動

```bash
docker compose up -d postgres
```

### 4. マイグレーション実行

```bash
npm run migration:run
```

## アプリケーションの起動

```bash
# 開発モード（ホットリロード有効）
npm run start:dev

# 本番モード
npm run start:prod

# デバッグモード
npm run start:debug
```

アプリケーションは http://localhost:3000 で起動します。

## API エンドポイント

### 基本API
- `GET /` - ヘルスチェック

### User API
- `GET /users` - ユーザー一覧取得
- `GET /users/:id` - ユーザー詳細取得  
- `POST /users` - ユーザー作成
- `PATCH /users/:id` - ユーザー更新
- `DELETE /users/:id` - ユーザー削除

## データベース操作

```bash
# マイグレーション実行
npm run migration:run

# マイグレーション取り消し
npm run migration:revert

# マイグレーション生成
npm run migration:generate

# データベースリセット
npm run db:reset
```

## テスト

```bash
# 単体テスト
npm run test

# E2Eテスト
npm run test:e2e

# テストカバレッジ
npm run test:cov

# テスト（ウォッチモード）
npm run test:watch
```

## コード品質

```bash
# リンター実行
npm run lint

# フォーマッター実行
npm run format

# ビルド
npm run build
```

## 開発用ツール

### pgAdmin
データベース管理用のpgAdminが利用できます：
- URL: http://localhost:8080
- Email: admin@example.com  
- Password: admin

PostgreSQL接続情報：
- Host: postgres
- Port: 5432
- Database: travel_planner_db
- Username: travel_planner
- Password: password

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
