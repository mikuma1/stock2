require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    let(:company) { create(:company) }
    let(:department) { create(:department, company: company) }

    it 'メールアドレスが必須であること' do
      user = described_class.new(email: nil)
      user.valid?
      expect(user.errors[:email]).to include('を入力してください')
    end

    it 'パスワードが必須であること' do
      user = described_class.new(password: nil)
      user.valid?
      expect(user.errors[:password]).to include('を入力してください')
    end

    it 'ロールが必須であること' do
      user = described_class.new(role: nil)
      user.valid?
      expect(user.errors[:role]).to include('を入力してください')
    end

    it 'ロールが適切な値であること' do
      expect(described_class.roles).to eq({ 'admin' => 0, 'user' => 1 })
    end

    context '一般ユーザーの場合' do
      it '部署が必須であること' do
        user = build(:user, role: :user, department: nil, company: company)
        user.valid?
        expect(user.errors[:department]).to include('を入力してください')
      end
    end

    context '管理者の場合' do
      it '部署が任意であること' do
        user = build(:user, :admin, department: nil, company: company)
        expect(user).to be_valid
      end
    end
  end

  describe '関連付け' do
    context '一般ユーザーの場合' do
      subject { build(:user, company: create(:company), department: create(:department)) }

      it { is_expected.to belong_to(:company) }
      it { is_expected.to belong_to(:department) }
    end

    context '管理者の場合' do
      subject { build(:user, :admin, company: create(:company), department: nil) }

      it { is_expected.to belong_to(:company) }
      it { is_expected.to belong_to(:department).optional }
    end
  end
end
