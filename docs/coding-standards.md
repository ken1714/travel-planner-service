# コーディング規約

このドキュメントでは、travel-planner-serviceプロジェクトにおけるコーディング規約について説明します。

## アーキテクチャ原則

### 1. レイヤードアーキテクチャ

プロジェクトではレイヤードアーキテクチャに則った設計を採用します。

```
src/
├── presentation/     # プレゼンテーション層（Controller）
├── usecase/         # ユースケース層（Usecase）
├── domain/          # ドメイン層（Entity, Repository Interface）
│   └── entity/      # Entities
└── infrastructure/  # インフラストラクチャ層（Repository Implementation, External API）
    └── config/      # 設定ファイル
```

**層の責務:**
- **プレゼンテーション層**: HTTPリクエスト/レスポンス、バリデーション、認証・認可
- **ユースケース層**: ビジネスロジックの組み合わせ、トランザクション管理
- **ドメイン層**: 核となるビジネスルール、エンティティ、値オブジェクト
- **インフラストラクチャ層**: データベースアクセス、外部API連携、技術的実装

**依存関係の方向:**
```
プレゼンテーション層 → ユースケース層 → ドメイン層 ← インフラストラクチャ層
```

### 2. ドメイン駆動設計（DDD）

#### ドメインルールの配置
- **ドメインロジックは必ずドメイン層に配置**
- エンティティや値オブジェクト内でビジネスルールを表現
- アプリケーション層はドメインオブジェクトの組み合わせのみ

#### ディレクトリ構造とファイル配置
```
src/
├── presentation/       # プレゼンテーション層
│   └── *.ts            # Controllers
├── usecase/            # ユースケース層
│   └── *.ts            # Usecases (Serviceではない)
├── domain/             # ドメイン層
│   └── entity/         # Entities
│       └── *.ts        # Entity files (`.entity.ts`サフィックス不要)
└── infrastructure/     # インフラストラクチャ層
    └── config/         # 設定ファイル
```

#### 重要な命名規則
- **Entity**: `user.ts` (not `user.entity.ts`)
- **Usecase**: `user.ts` (not `user.service.ts`)
- **Controller**: `user.ts`

#### 実装例
```typescript
// ❌ ユースケース層にビジネスロジック
export class UserUsecase {
  createUser(userData: CreateUserDto) {
    // ビジネスルールをユースケースに記述（NG）
    if (userData.age < 18) {
      throw new Error('18歳未満は登録できません');
    }
  }
}

// ✅ ドメイン層にビジネスロジック
export class User {
  private constructor(
    private readonly id: UserId,
    private readonly age: Age,
    private readonly email: Email
  ) {}

  public static create(userData: CreateUserData): User {
    // ビジネスルールをエンティティに記述（OK）
    if (userData.age < 18) {
      throw new DomainError('18歳未満は登録できません');
    }
    return new User(
      UserId.generate(),
      new Age(userData.age),
      new Email(userData.email)
    );
  }
}
```

## 命名規則

### 基本方針
- **変数・関数**: camelCase
- **クラス・インターフェース・型**: UpperCamelCase (PascalCase)
- **定数**: UPPER_SNAKE_CASE
- **ファイル名**: kebab-case

### 具体例
```typescript
// 変数・関数
const userName = 'john';
const getUserById = (id: string) => {};

// クラス・インターフェース・型
class UserService {}
interface UserRepository {}
type CreateUserDto = {};

// 定数
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// ファイル名
user-service.ts
create-user.dto.ts
user-repository.interface.ts
```

### 命名の意図を明確にする
```typescript
// ❌ 意味が不明確
const d = new Date();
const u = users.filter(x => x.active);

// ✅ 意味が明確
const createdAt = new Date();
const activeUsers = users.filter(user => user.isActive);
```

## テスト戦略

### 1. APIテスト中心のアプローチ

基本的にユースケース全体をAPIテスト（E2Eテスト）でカバーします。

```typescript
// ✅ APIテストでユースケース全体をテスト
describe('POST /users', () => {
  it('有効なユーザーデータで新規ユーザーを作成できる', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 25
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    expect(response.body.user.name).toBe(userData.name);
    
    // データベースの状態も検証
    const savedUser = await userRepository.findById(response.body.user.id);
    expect(savedUser).toBeDefined();
  });
});
```

### 2. 古典学派のテスト原則

モックを多用するユニットテストは書かず、実装の詳細ではなく**動作を検証**します。

```typescript
// ❌ モックを多用したユニットテスト
describe('UserService', () => {
  it('createUser calls repository.save', async () => {
    const mockRepository = {
      save: jest.fn().mockResolvedValue(mockUser)
    };
    const userService = new UserService(mockRepository);
    
    await userService.createUser(userData);
    
    expect(mockRepository.save).toHaveBeenCalledWith(expect.any(User));
  });
});

// ✅ 動作を検証するAPIテスト
describe('User Registration', () => {
  it('ユーザー登録が完了するとウェルカムメールが送信される', async () => {
    await request(app)
      .post('/users')
      .send(validUserData)
      .expect(201);

    // メール送信の結果を実際の動作で検証
    const sentEmails = await getTestEmailQueue();
    expect(sentEmails).toHaveLength(1);
    expect(sentEmails[0].to).toBe(validUserData.email);
  });
});
```

### 3. テストの分類と方針

#### APIテスト（メイン）
- **目的**: ユースケース全体の動作検証
- **範囲**: HTTPリクエスト → データベース保存まで
- **実装**: Supertest + テストデータベース

#### 統合テスト（必要に応じて）
- **目的**: 複数コンポーネントの連携検証
- **範囲**: 外部API、データベース、ファイルシステム等
- **実装**: 実際のリソースを使用

#### 単体テスト（最小限）
- **目的**: 複雑なビジネスロジックの詳細検証
- **範囲**: ドメインオブジェクト内のロジックのみ
- **実装**: モックなしの純粋関数テスト

```typescript
// ✅ 単体テストが適用される例（複雑なドメインロジック）
describe('TravelPlan', () => {
  it('宿泊日数が上限を超えた場合はエラーが発生する', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-02-01'); // 31日間

    expect(() => {
      TravelPlan.create({
        startDate,
        endDate,
        maxDays: 30
      });
    }).toThrow('宿泊日数が上限を超えています');
  });
});
```

## コード品質ガイドライン

### 1. 可読性を重視
```typescript
// ❌ 複雑な条件式
if (user.age >= 18 && user.hasValidEmail() && user.subscription.isActive() && !user.isBanned()) {
  // 処理
}

// ✅ 意図を明確にした条件式
const canAccessPremiumFeatures = 
  user.isAdult() && 
  user.hasValidEmail() && 
  user.hasActiveSubscription() && 
  user.isNotBanned();

if (canAccessPremiumFeatures) {
  // 処理
}
```

### 2. 早期リターンの活用
```typescript
// ❌ ネストが深い
function processUser(user: User) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission('read')) {
        // メイン処理
        return user.getData();
      } else {
        throw new Error('Permission denied');
      }
    } else {
      throw new Error('User is not active');
    }
  } else {
    throw new Error('User not found');
  }
}

// ✅ 早期リターンでネストを減らす
function processUser(user: User) {
  if (!user) {
    throw new Error('User not found');
  }
  
  if (!user.isActive) {
    throw new Error('User is not active');
  }
  
  if (!user.hasPermission('read')) {
    throw new Error('Permission denied');
  }
  
  return user.getData();
}
```

### 3. 型安全性の確保
```typescript
// ❌ any型の使用
function processData(data: any) {
  return data.someProperty;
}

// ✅ 適切な型定義
interface ProcessableData {
  someProperty: string;
  otherProperty?: number;
}

function processData(data: ProcessableData): string {
  return data.someProperty;
}
```

## パフォーマンス考慮事項

### 1. データベースアクセスの最適化
- N+1クエリの回避
- 適切なインデックスの使用
- 必要なデータのみ取得

### 2. メモリ効率
- 大量データ処理時はストリーミング処理を活用
- 不要なオブジェクトの生成を避ける

## セキュリティ考慮事項

### 1. 入力検証
- 全てのユーザー入力はバリデーションを実施
- SQLインジェクション対策
- XSS対策

### 2. 認証・認可
- JWTトークンの適切な管理
- ロールベースアクセス制御（RBAC）の実装

## エラーハンドリング

### 1. 例外の分類と処理
```typescript
// ドメイン例外
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

// アプリケーション例外
export class ApplicationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'ApplicationError';
  }
}

// インフラ例外
export class InfrastructureError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = 'InfrastructureError';
  }
}
```

### 2. グローバル例外ハンドラー
```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    if (exception instanceof DomainError) {
      response.status(400).json({
        statusCode: 400,
        message: exception.message,
        error: 'Bad Request'
      });
    } else if (exception instanceof ApplicationError) {
      response.status(422).json({
        statusCode: 422,
        message: exception.message,
        code: exception.code
      });
    } else {
      // 予期しないエラーは詳細を隠す
      response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error'
      });
    }
  }
}
```

## ログ出力規約

### 1. ログレベルの使い分け
- **ERROR**: システムエラー、予期しない例外
- **WARN**: 警告、リトライ可能なエラー
- **INFO**: 重要な処理の開始・終了、ビジネス上の重要なイベント
- **DEBUG**: 開発時のデバッグ情報

### 2. 構造化ログの実装
```typescript
// ✅ 構造化されたログ
logger.info('User created', {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString(),
  action: 'CREATE_USER'
});

// ❌ 非構造化ログ
logger.info(`User ${user.email} created with ID ${user.id}`);
```

## コメント規約

### 1. コメントを書くべき場面
- **なぜ（Why）**: 実装の意図や背景
- **複雑なアルゴリズム**: ビジネスロジックの説明
- **外部仕様との関連**: API仕様書の参照等

### 2. コメントを書かない場面
```typescript
// ❌ 自明な内容のコメント
// ユーザーIDを取得する
const userId = user.id;

// ❌ 実装の詳細をコメント
// forループでユーザーを検索
for (const user of users) {
  // ...
}

// ✅ 意図や背景を説明
// 料金計算において、土日は平日の1.5倍料金となる仕様のため
// 週末判定を行い料金係数を調整する
const weekendMultiplier = isWeekend(date) ? 1.5 : 1.0;
```

## インポート規約

### 1. インポートの順序
```typescript
// 1. Node.js標準モジュール
import * as path from 'path';
import * as fs from 'fs';

// 2. 外部ライブラリ
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// 3. プロジェクト内のモジュール（絶対パス）
import { User } from '@/domain/entities/user';
import { UserRepository } from '@/domain/repositories/user-repository';

// 4. 相対インポート
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';
```

### 2. 型のみのインポート
```typescript
// ✅ 型のみインポートする場合
import type { User } from '@/domain/entities/user';
import type { Repository } from 'typeorm';

// ✅ 値と型を混在してインポートする場合
import { Injectable, type Logger } from '@nestjs/common';
```

## ファイル・ディレクトリ構造規約

### 1. ファイル命名
- **機能名のみ**: `user.ts`
- **Entity**: `user.ts` (`.entity.ts`サフィックス不要)
- **DTO**: `create-user.dto.ts`, `update-user.dto.ts`
- **テスト**: `user.spec.ts`, `user.e2e-spec.ts`

### 2. ディレクトリ構造
```
src/
├── presentation/
│   └── *.ts              # Controllers
├── usecase/
│   └── *.ts              # Usecases
├── domain/
│   ├── entity/           # Entities
│   ├── value-objects/    # Value Objects
│   └── repositories/     # Repository Interfaces
└── infrastructure/
    ├── repositories/     # Repository Implementations
    ├── external/         # External API clients
    └── config/           # Configuration files
```

## 定数管理

### 1. 設定値の外部化

#### 環境変数のデフォルト値設定ポリシー
**重要**: 環境変数にはデフォルト値を設定しない。すべての設定値は明示的に.envファイルで管理する。

```typescript
// ❌ 設定ファイルでデフォルト値を設定
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),      // NG
  port: configService.get<number>('DB_PORT', 5432),           // NG
  username: configService.get<string>('DB_USERNAME', 'user'), // NG
  password: configService.get<string>('DB_PASSWORD', 'pass'), // NG
});

// ✅ デフォルト値なしで環境変数を取得
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
});
```

#### Docker Composeでの環境変数設定
```yaml
# ❌ docker-compose.ymlでデフォルト値を設定
environment:
  POSTGRES_DB: ${DB_DATABASE:-travel_db}        # NG
  POSTGRES_USER: ${DB_USERNAME:-travel_user}   # NG

# ✅ .envファイルから環境変数を読み込み
environment:
  POSTGRES_DB: ${DB_DATABASE}
  POSTGRES_USER: ${DB_USERNAME}
  POSTGRES_PASSWORD: ${DB_PASSWORD}
```

#### .envファイルでの設定値管理
```bash
# .env.development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=travel_planner
DB_PASSWORD=password
DB_DATABASE=travel_planner_db

# pgAdmin設定
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin
```

### 2. マジックナンバーの排除
```typescript
// ❌ マジックナンバー
if (user.age < 18) {
  throw new Error('未成年は利用できません');
}

// ✅ 意味のある定数名
const ADULT_AGE_THRESHOLD = 18;

if (user.age < ADULT_AGE_THRESHOLD) {
  throw new Error('未成年は利用できません');
}