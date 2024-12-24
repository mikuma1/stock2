require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
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
      user = described_class.new
      expect(user).to define_enum_for(:role).with_values(%i[admin user])
    end
  end

  describe '関連付け' do
    it '企業に所属すること' do
      user = described_class.new
      expect(user).to belong_to(:company)
    end
  end
end
