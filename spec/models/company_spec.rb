require 'rails_helper'

RSpec.describe Company, type: :model do
  describe 'バリデーション' do
    it '会社名が必須であること' do
      company = described_class.new(company_name: nil)
      company.valid?
      expect(company.errors[:company_name]).to include('を入力してください')
    end

    it '電話番号が必須であること' do
      company = described_class.new(phone_number: nil)
      company.valid?
      expect(company.errors[:phone_number]).to include('を入力してください')
    end

    it 'サブドメインが必須であること' do
      company = described_class.new(subdomain: nil)
      company.valid?
      expect(company.errors[:subdomain]).to include('を入力してください')
    end

    it 'サブドメインが一意であること' do
      create(:company, subdomain: 'test')
      company = described_class.new(subdomain: 'test')
      company.valid?
      expect(company.errors[:subdomain]).to include('はすでに存在します')
    end
  end

  describe '関連付け' do
    it 'ユーザーを複数持つこと' do
      company = described_class.new
      expect(company).to respond_to(:users)
      expect(company.users).to be_a(ActiveRecord::Associations::CollectionProxy)
    end
  end
end
