# Stock2

## 環境
- Ruby 3.2.2
- Rails 7.0
- PostgreSQL 14

## セットアップ
### 開発環境のセットアップ（Docker）

1. リポジトリのクローン
```bash
git clone git@github.com:yourusername/stock2.git
cd stock2
```
2. 開発環境の構築
```bash
./bin/setup-docker
```
3. Git hooksの設定
```bash
./bin/setup-hooks
```
4. アプリケーションの起動
```bash
docker-compose up
```
アプリケーションは http://localhost:3000 でアクセスできます。

### テストの実行
```bash
# RSpecテストの実行
./bin/docker-test
# Rubocopの実行
./bin/docker-rubocop
```

## GitHub Actions

以下のチェックが自動的に実行されます：

- PRとpush時：
  - RSpecテスト
  - Rubocopによるコードチェック

## 開発フロー

1. 新機能の開発
```bash
# 新しいブランチを作成
git checkout -b feature/new-feature
# 開発とテスト
./bin/docker-test
./bin/docker-rubocop
# 変更をコミット
git add .
git commit -m "feat: 新機能を追加"
# プルリクエストを作成
git push origin feature/new-feature
```

## Git Hooks

コミット時に自動的に以下のチェックが実行されます：
- Rubocopによるコードチェック
- RSpecテストの実行

## APIドキュメント
APIドキュメントはSwagger UIで確認できます。

### 確認方法
1. 開発サーバーを起動
```bash
docker-compose up
```

2. ブラウザでSwagger UIにアクセス
```
http://localhost:3000/api-docs
```

### 認証について
すべてのAPIエンドポイントはJWTトークンによる認証が必要です。
トークンは`Authorization`ヘッダーに`Bearer <token>`の形式で指定してください。

## 本番環境

### 環境構築

1. 本番環境の起動

```bash
docker-compose -f docker-compose.production.yml up -d
```

2. データベースのセットアップ

```bash
docker-compose -f docker-compose.production.yml exec web rails db:create db:migrate
```

### 本番環境の特徴

- 開発/テスト用のgemを除外
- アセットのプリコンパイル
- ヘルスチェックの実装
- 静的ファイルの配信設定

### 環境変数

本番環境では以下の環境変数を設定する必要があります：

- `RAILS_MASTER_KEY`: Rails暗号化キー
- `DATABASE_URL`: データベース接続情報
- `RAILS_ENV`: production
- `RAILS_SERVE_STATIC_FILES`: true
- `RAILS_LOG_TO_STDOUT`: true

### デプロイ時の注意点

1. セキュリティ
   - 本番環境では必ず`RAILS_MASTER_KEY`を設定
   - データベースのパスワードは環境変数で管理

2. パフォーマンス
   - アセットのプリコンパイルは事前に実行
   - 必要に応じてNginxなどのリバースプロキシを設定

3. 監視
   - ヘルスチェックエンドポイントでアプリケーションの状態を監視
   - ログは標準出力に出力され、コンテナログとして収集可能

### エラーレスポンス
すべてのAPIは以下の形式でエラーを返します：
```json
{
  "error": "エラーメッセージ",
  "errors": ["詳細なエラーメッセージ1", "詳細なエラーメッセージ2"]
}
```

### ステータスコード
- 200: 成功
- 201: 作成成功
- 204: 削除成功
- 401: 認証エラー
- 403: 権限エラー
- 404: リソースが見つからない
- 422: バリデーションエラー
- 500: サーバーエラー
