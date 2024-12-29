require 'rails_helper'

RSpec.describe UserSerializer, type: :serializer do
  let(:user) { create(:user) }
  let(:serializer) { described_class.new(user) }
  let(:serialization) { JSON.parse(serializer.to_json) }

  it '基本的な属性がシリアライズされること' do
    expect(serialization.keys).to include(
      'id', 'email', 'name', 'role'
    )
  end

  it '関連モデルのIDとタイムスタンプがシリアライズされること' do
    expect(serialization.keys).to include(
      'company_id', 'created_at', 'updated_at', 'company'
    )
  end

  it '属性が正しくシリアライズされること' do
    expect(serialization['email']).to eq(user.email)
    expect(serialization['name']).to eq(user.name)
    expect(serialization['role']).to eq(user.role)
  end
end
