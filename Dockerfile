# ベースイメージの指定
FROM ruby:3.2.2

# 必要なシステムパッケージのインストール
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# 作業ディレクトリの設定
WORKDIR /app

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# RubyGemsを最新バージョンに更新
RUN gem update --system
RUN gem install bundler
RUN bundle install

# アプリケーションのコピー
COPY . .

# エントリーポイントスクリプトの追加
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Railsサーバー起動
CMD ["rails", "server", "-b", "0.0.0.0"]
