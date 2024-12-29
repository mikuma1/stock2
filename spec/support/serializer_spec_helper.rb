RSpec.shared_context 'serializer spec' do
  let(:serialization) { JSON.parse(serializer.to_json) }
end

RSpec.configure do |config|
  config.include_context 'serializer spec', type: :serializer
end
