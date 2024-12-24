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
3. アプリケーションの起動
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

## APIドキュメント
※ 別途作成予定
