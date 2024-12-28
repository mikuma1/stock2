require 'rails_helper'

RSpec.describe Category, type: :model do
  describe 'アソシエーション' do
    it { is_expected.to belong_to(:company) }
  end

  describe 'バリデーション' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(50) }
    it { is_expected.to validate_length_of(:description).is_at_most(500) }

    describe '企業内でのカテゴリ名の一意性' do
      let(:company) { create(:company) }
      let!(:category) { create(:category, company: company, name: 'テスト') }

      it '同じ企業内で同じ名前は無効であること' do
        new_category = build(:category, company: company, name: 'テスト')
        expect(new_category).not_to be_valid
      end

      it '異なる企業では同じ名前が有効であること' do
        other_company = create(:company)
        new_category = build(:category, company: other_company, name: 'テスト')
        expect(new_category).to be_valid
      end
    end
  end

  describe 'ファクトリ' do
    it '有効なファクトリを持つこと' do
      expect(build(:category)).to be_valid
    end
  end

  describe '基本的な操作' do
    let(:company) { create(:company) }
    let(:category) { create(:category, company: company) }

    context '有効な属性の場合' do
      it 'カテゴリーを作成できること' do
        expect(category).to be_valid
      end

      it '説明がなくても有効であること' do
        category.description = nil
        expect(category).to be_valid
      end
    end

    context '無効な属性の場合' do
      it '名前がない場合は無効であること' do
        category.name = nil
        expect(category).not_to be_valid
      end

      it '名前が50文字を超える場合は無効であること' do
        category.name = 'a' * 51
        expect(category).not_to be_valid
      end

      it '説明が500文字を超える場合は無効であること' do
        category.description = 'a' * 501
        expect(category).not_to be_valid
      end

      it '会社に属していない場合は無効であること' do
        category.company = nil
        expect(category).not_to be_valid
      end
    end
  end
end