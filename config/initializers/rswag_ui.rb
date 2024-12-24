Rswag::Ui.configure do |c|
  c.openapi_endpoint 'api-docs/v1/swagger.yaml', 'API V1 Docs'

  # UIのカスタマイズ
  c.basic_auth_enabled = false

  # 設定オブジェクト
  c.config_object = {
    url: '/api-docs/v1/swagger.yaml',
    docExpansion: 'list',
    deepLinking: true,
    defaultModelsExpandDepth: 3,
    defaultModelExpandDepth: 3,
    displayOperationId: false,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    language: 'ja'
  }
end
