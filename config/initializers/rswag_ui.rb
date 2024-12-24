Rswag::Ui.configure do |c|
  c.swagger_endpoint '/api-docs/v1/swagger.yaml', 'API V1 Docs'

  c.config_object[:defaultModelsExpandDepth] = 0
  c.config_object[:displayRequestDuration] = true
  c.config_object[:docExpansion] = 'list'
  c.config_object[:persistAuthorization] = true
end
