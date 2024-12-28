require 'rails_helper'

RSpec.describe CompanySerializer, type: :serializer do
  let(:company) { create(:company) }
  let(:serializer) { described_class.new(company) }
  let(:serialization) { JSON.parse(serializer.to_json) }

  it '期待する属性がシリアライズされること' do
    expect(serialization.keys).to match_array(
      %w[
        id
        company_name
        created_at
        updated_at
      ]
    )
  end

  it '属性が正しくシリアライズされること' do
    expect(serialization['company_name']).to eq(company.company_name)
  end
end
