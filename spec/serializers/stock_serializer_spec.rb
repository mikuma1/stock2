require 'rails_helper'

RSpec.describe StockSerializer, type: :serializer do
  let(:stock) { create(:stock) }
  let(:serializer) { described_class.new(stock) }
  let(:serialization) { JSON.parse(serializer.to_json) }

  it '基本的な属性がシリアライズされること' do
    expect(serialization.keys).to include(
      'id', 'quantity', 'operation_type', 'note', 'operated_at'
    )
  end

  it '関連するモデルのIDがシリアライズされること' do
    expect(serialization.keys).to include(
      'item_id', 'company_id', 'user_id'
    )
  end

  it 'タイムスタンプがシリアライズされること' do
    expect(serialization.keys).to include(
      'created_at', 'updated_at'
    )
  end

  it '関連するモデルがシリアライズされること' do
    expect(serialization.keys).to include(
      'item', 'company', 'user'
    )
  end
end
