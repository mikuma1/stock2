require 'rails_helper'

RSpec.describe Company, type: :model do
  describe 'アソシエーション' do
    it { is_expected.to have_many(:users).dependent(:destroy) }
    it { is_expected.to have_many(:departments).dependent(:destroy) }
    it { is_expected.to have_many(:categories).dependent(:destroy) }
    it { is_expected.to have_many(:items).dependent(:destroy) }
  end

  describe 'バリデーション' do
    subject { build(:company) }

    it { is_expected.to validate_presence_of(:company_name) }
    it { is_expected.to validate_presence_of(:subdomain) }
    it { is_expected.to validate_uniqueness_of(:subdomain).case_insensitive }

    context 'サブドメインのフォーマット' do
      it '半角英数字とハイフンを許可すること' do
        valid_subdomains = %w[test test-company test123 test-123]
        valid_subdomains.each do |subdomain|
          company = build(:company, subdomain: subdomain)
          expect(company).to be_valid
        end
      end

      it '無効なフォーマットを許可しないこと' do
        invalid_subdomains = %w[test_company TEST テスト test.company -test test-]
        invalid_subdomains.each do |subdomain|
          company = build(:company, subdomain: subdomain)
          expect(company).not_to be_valid
          expect(company.errors[:subdomain]).to include(I18n.t('errors.messages.invalid_subdomain_format'))
        end
      end
    end
  end

  describe 'dependent: :destroy' do
    let(:company) { create(:company) }
    let!(:user) { create(:user, company: company) }
    let!(:department) { create(:department, company: company) }
    let!(:category) { create(:category, company: company) }
    let!(:item) { create(:item, company: company, category: category) }

    it '関連するレコードが削除されること' do
      expect do
        company.destroy!
      end.to change(User, :count).by(-1)
         .and change(Department, :count).by(-1)
         .and change(Category, :count).by(-1)
         .and change(Item, :count).by(-1)
    end
  end
end
