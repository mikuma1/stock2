require 'rails_helper'

RSpec.describe ItemSerializer, type: :serializer do
  let(:company) { create(:company) }
  let(:category) { create(:category, company: company) }
  let(:item) { create(:item, company: company, category: category) }
  let(:serializer) { described_class.new(item) }
  let(:serialization) { JSON.parse(serializer.to_json) }

  it '基本的な属性がシリアライズされること' do
    expect(serialization.keys).to include(
      'id', 'name', 'description', 'minimum_quantity', 'stock_quantity'
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

  describe '属性の値' do
    it '基本情報が正しくシリアライズされること' do
      expect(serialization['name']).to eq(item.name)
      expect(serialization['stock_quantity']).to eq(item.stock_quantity)
    end

    it '関連IDが正しくシリアライズされること' do
      expect(serialization['category_id']).to eq(item.category_id)
      expect(serialization['company_id']).to eq(item.company_id)
    end
  end

  it '関連モデルが正しくシリアライズされること' do
    expect(serialization['category']).to be_present
    expect(serialization['company']).to be_present
    expect(serialization['stocks']).to eq([])
  end
end
