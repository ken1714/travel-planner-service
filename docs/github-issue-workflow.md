# Github Issue対応ワークフロー

このドキュメントでは、Github Issueを読み込んでタスクを遂行する際の開発フローについて説明します。

## 基本的な開発フロー

### 1. ブランチの作成

新しいタスクを開始する際は、必ず最新のmainブランチから新しいブランチを作成してください。

```bash
# 最新のmainブランチに切り替え
git checkout main
git pull origin main

# 新しいブランチを作成（ブランチ名はissue番号を含めることを推奨）
git checkout -b feature/issue-123-add-user-authentication
```

**ブランチ命名規則:**
- `feature/issue-{番号}-{簡潔な説明}` - 新機能の追加
- `fix/issue-{番号}-{簡潔な説明}` - バグ修正
- `docs/issue-{番号}-{簡潔な説明}` - ドキュメント更新
- `refactor/issue-{番号}-{簡潔な説明}` - リファクタリング

### 2. コミット戦略

#### 2.1. コミット粒度の基本原則

**重要**: コミットは**分解可能な最小単位**で行うこと。一つのコミットで複数の異なる変更を含めることは避けてください。

#### 2.2. 適切なコミット粒度の判断基準

**✅ 良いコミット粒度（OK例）:**
- 一つの機能追加または修正に対して一つのコミット
- レビュー時に変更内容が一目で理解できる
- 必要に応じて個別にrevertできる
- ビルドが通る状態を保持している

**❌ 悪いコミット粒度（NG例）:**
- 複数の機能追加を一度にコミット
- 関連のない変更を混在させる
- あまりにも細かすぎて意味をなさない変更
- ビルドが通らない中間状態のコミット

#### 2.3. 具体的なNG例とOK例

**❌ NG例: 多くの変更をひとまとめにコミット**
```bash
# 複数の異なる変更を一つのコミットに含めている（NG）
git commit -m "[feat] ユーザー管理機能の実装"
# 含まれる変更:
# - User Entityの追加
# - UserController、UserUsecaseの実装  
# - バリデーション機能の追加
# - 認証ミドルウェアの実装
# - データベースマイグレーション
# - テストケースの追加
# - API仕様書の更新
```

**✅ OK例: 分解可能な最小単位でコミット**
```bash
# 各変更を独立したコミットに分解（OK）
git commit -m "[feat] User Entityクラスを追加"
git commit -m "[feat] UserControllerにCRUD APIエンドポイントを実装"  
git commit -m "[feat] UserUsecaseにビジネスロジックを実装"
git commit -m "[feat] ユーザー入力バリデーション機能を追加"
git commit -m "[feat] JWT認証ミドルウェアを実装"
git commit -m "[feat] ユーザー管理用データベースマイグレーションを追加"
git commit -m "[test] User機能の単体テストを追加"
git commit -m "[test] User APIのE2Eテストを追加"
git commit -m "[docs] User API仕様をREADMEに追記"
```

#### 2.4. コミット分解の実践例

**シナリオ**: ユーザープロフィール機能の実装

**❌ NG例（まとめてコミット）:**
```bash
git add .
git commit -m "[feat] ユーザープロフィール機能を実装"
# 20ファイルの変更、300行の追加・削除が含まれる
```

**✅ OK例（段階的コミット）:**
```bash
# 1. Entityの追加
git add src/domain/entity/profile.ts
git commit -m "[feat] UserProfile Entityを追加"

# 2. DTOの定義
git add src/presentation/dto/profile.dto.ts  
git commit -m "[feat] プロフィール操作用DTOを定義"

# 3. Repository interfaceの追加
git add src/domain/repositories/profile-repository.ts
git commit -m "[feat] ProfileRepositoryインターフェースを定義"

# 4. Repository implementationの実装
git add src/infrastructure/repositories/profile.repository.ts
git commit -m "[feat] ProfileRepositoryの実装を追加"

# 5. Usecaseの実装
git add src/usecase/profile.usecase.ts
git commit -m "[feat] プロフィール操作のUsecaseを実装"

# 6. Controllerの実装
git add src/presentation/profile.controller.ts
git commit -m "[feat] プロフィールAPIのControllerを実装"

# 7. バリデーションルールの追加
git add src/presentation/validators/profile.validator.ts
git commit -m "[feat] プロフィール入力バリデーションを追加"

# 8. 単体テストの追加
git add src/usecase/profile.usecase.spec.ts
git commit -m "[test] プロフィールUsecase単体テストを追加"

# 9. E2Eテストの追加  
git add test/profile.e2e-spec.ts
git commit -m "[test] プロフィールAPIのE2Eテストを追加"
```

#### 2.5. コミット前のセルフチェック

コミット前に以下を確認してください:

- [ ] このコミットは**一つの明確な目的**を持っているか？
- [ ] このコミットは**他の変更と独立して理解**できるか？
- [ ] このコミットは**必要に応じて個別にrevert**できるか？
- [ ] このコミットの状態で**ビルドが通る**か？
- [ ] コミットメッセージで**変更内容が明確に説明**されているか？

#### 2.6. コミットメッセージ規則

- `[feat]` - 新機能の追加
- `[fix]` - バグ修正
- `[docs]` - ドキュメントの更新
- `[style]` - コードフォーマットの変更
- `[refactor]` - リファクタリング
- `[test]` - テストの追加・修正
- `[chore]` - ビルド関連やその他の変更

### 3. 開発前のチェック項目

タスクを開始する前に以下を確認してください:

- [ ] Issue内容を正確に理解している
- [ ] 実装方針が決まっている
- [ ] 必要な技術調査が完了している
- [ ] 影響範囲を把握している

### 4. 開発中の品質管理

開発中は以下のコマンドを定期的に実行し、コードの品質を保ってください:

```bash
# リンターでコードスタイルをチェック・自動修正
npm run lint

# TypeScriptの型チェック
npm run build

# 単体テストの実行
npm run test
```

### 4.1. アーキテクチャ規約の遵守

開発時は必ずコーディング規約（`docs/coding-standards.md`）に従って実装してください:

#### ディレクトリ構造
```
src/
├── presentation/         # Controllers
│   └── *.controller.ts
├── usecase/             # Usecases（Serviceではない）
│   └── *.usecase.ts
├── domain/              # Domain entities
│   └── entity/
│       └── *.ts         # Entity files（.entity.tsサフィックス不要）
└── infrastructure/      # Infrastructure layer
    └── config/          # Configuration files
```

#### ファイル命名規則
- **Entity**: `user.ts` (not `user.entity.ts`)
- **Usecase**: `user.usecase.ts` (not `user.service.ts`)
- **Controller**: `user.controller.ts`

#### 環境変数のデフォルト値設定
- **禁止**: 設定ファイルやDocker Composeでデフォルト値を設定
- **必須**: すべての環境変数は.envファイルで明示的に管理

```typescript
// ❌ NG例
configService.get<string>('DB_HOST', 'localhost')

// ✅ OK例
configService.get<string>('DB_HOST')
```

### 5. プルリクエスト（PR）の作成

実装完了後は以下の手順でPRを作成してください:

#### 事前チェック
```bash
# 最終的な品質チェック
npm run lint
npm run build
npm run test
npm run test:e2e
```

#### PR作成時の要件

1. **PRタイトル**: Issue番号と簡潔な説明を含める
   - 例: `[#123] ユーザー認証機能の実装`

2. **PRテンプレートの活用**: `.github/PULL_REQUEST_TEMPLATE.md`のフォーマットに従って記載

3. **Issue参照の必須記載**: PRの「関連Issue」セクションに以下の形式で記載
   ```markdown
   ## 関連Issue
   Closes #123
   ```

4. **動作確認の実施**: 以下の項目を確認し、チェックボックスにチェック
   - [ ] ローカル環境での動作確認
   - [ ] 単体テストの実行
   - [ ] E2Eテストの実行
   - [ ] Lintエラーなし
   - [ ] TypeScriptエラーなし

#### PR作成例
```bash
# リモートブランチにプッシュ
git push origin feature/issue-123-add-user-authentication

# GitHub上でPRを作成し、テンプレートに従って内容を記載
```

### 6. コードレビューと対応

1. **レビュー依頼**: 適切なレビュアーを指定
2. **フィードバック対応**: 指摘事項に対して迅速に対応
3. **追加コミット**: レビュー対応も同様に小さなコミット単位で実施
4. **最終確認**: マージ前に再度動作確認とテスト実行

### 7. マージ後の後処理

```bash
# mainブランチに戻る
git checkout main

# 最新の状態を取得
git pull origin main

# 作業ブランチを削除（任意）
git branch -d feature/issue-123-add-user-authentication
```

## 注意事項

- **破壊的変更**: APIの仕様変更など破壊的な変更を含む場合は、PR説明に明記すること
- **依存関係**: 新しいパッケージを追加する場合は、必要性と選定理由を説明すること
- **セキュリティ**: 認証・認可に関わる変更は特に慎重にレビューを受けること
- **パフォーマンス**: 大きなデータ処理やクエリを追加する場合は、パフォーマンステストを実施すること

## トラブルシューティング

### コンフリクトが発生した場合
```bash
# 最新のmainブランチをマージ
git checkout main
git pull origin main
git checkout feature/your-branch
git merge main

# コンフリクトを解決後
git add .
git commit -m "fix: mainブランチとのコンフリクトを解決"
```

### テストが失敗する場合
1. ローカル環境で該当のテストを個別実行
2. エラーメッセージを確認
3. 必要に応じてテストケースを修正
4. 実装コードの修正

### WIP（Work In Progress）の活用
開発中のPRは下書きまたはタイトルに`[WIP]`を付けて作成し、レビューの準備ができてから正式なレビュー依頼を行う。

```bash
# WIPでPRを作成する場合のタイトル例
[WIP][#123] ユーザー認証機能の実装
```

## ベストプラクティス

### Issue分析のポイント
1. **受け入れ条件の確認**: Issueの受け入れ条件（Acceptance Criteria）を明確にする
2. **技術的制約の洗い出し**: 既存システムとの整合性を確認
3. **工数見積り**: タスクの複雑さを考慮した適切な見積りを行う

### コード品質向上のコツ
1. **早期のフィードバック**: 実装方針に迷った場合は早めに相談
2. **テスト駆動開発（TDD）**: 先にテストを書いてから実装を進める
3. **リファクタリング**: 機能実装後にコードの可読性・保守性を向上させる

### コミュニケーション
1. **進捗の共有**: 大きなタスクの場合は定期的に進捗を報告
2. **ブロッカーの早期報告**: 作業が止まる要因が発生した場合は速やかに共有
3. **ナレッジの蓄積**: 調査結果や設計判断をドキュメントに残す