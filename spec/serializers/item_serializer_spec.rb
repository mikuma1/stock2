require 'rails_helper'

RSpec.describe ItemSerializer, type: :serializer do
  let(:item) { create(:item) }
  let(:serializer) { described_class.new(item) }
  let(:serialization) { JSON.parse(serializer.to_json) }

  it '基本的な属性がシリアライズされること' do
    expect(serialization.keys).to include(
      'id', 'name', 'description', 'minimum_quantity', 'current_stock'
    )
  end

  it '追加の属性がシリアライズされること' do
    expect(serialization.keys).to include(
      'unit', 'url', 'purchase_notes'
    )
  end

  it '関連モデルのIDとタイムスタンプがシリアライズされること' do
    expect(serialization.keys).to include(
      'category_id', 'company_id', 'created_at', 'updated_at'
    )
  end

  it '関連モデルがシリアライズされること' do
    expect(serialization.keys).to include(
      'category', 'company', 'stocks'
    )
  end
end
