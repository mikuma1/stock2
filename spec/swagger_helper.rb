# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  config.swagger_root = Rails.root.join('swagger').to_s
  config.swagger_docs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'Stock2 API V1',
        version: 'v1',
        description: 'Stock2のAPI仕様書'
      },
      components: {
        securitySchemes: {
          Bearer: {
            description: 'JWT形式のトークン',
            type: :http,
            scheme: :bearer,
            bearerFormat: 'JWT'
          }
        },
        schemas: {
          error: {
            type: :object,
            properties: {
              error: { type: :string }
            }
          }
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: '開発環境'
        }
      ]
    }
  }
  config.swagger_format = :yaml
end
