require 'rails_helper'

RSpec.describe CategorySerializer, type: :serializer do
  let(:category) { create(:category) }
  let(:serializer) { described_class.new(category) }
  let(:serialization) { JSON.parse(serializer.to_json) }

  it '基本的な属性がシリアライズされること' do
    expect(serialization.keys).to include(
      'id', 'name', 'description', 'company_id'
    )
  end

  it 'タイムスタンプと関連モデルがシリアライズされること' do
    expect(serialization.keys).to include(
      'created_at', 'updated_at', 'company', 'items'
    )
  end
end
