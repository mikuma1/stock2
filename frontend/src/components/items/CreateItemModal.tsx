import { useState } from 'react';
import Modal from '../Modal';

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateItemModal = ({ isOpen, onClose }: CreateItemModalProps) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [unit, setUnit] = useState('');
  const [stock, setStock] = useState('');
  const [orderPoint, setOrderPoint] = useState('');
  const [url, setUrl] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 消耗品作成の処理
    console.log('消耗品作成:', {
      name,
      categoryId,
      unit,
      stock: Number(stock),
      orderPoint: Number(orderPoint),
      url,
      memo,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="消耗品登録">
      <form id="modal-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                商品名
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                カテゴリ
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
            >
              <option value="">選択してください</option>
              <option value="1">文具</option>
              <option value="2">オフィス用品</option>
              <option value="3">備品</option>
            </select>
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                単位
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <input
              type="text"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
              placeholder="個、冊、箱など"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                在庫数
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
              min="0"
            />
          </div>

          <div>
            <label htmlFor="orderPoint" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                発注点
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <input
              type="number"
              id="orderPoint"
              value={orderPoint}
              onChange={(e) => setOrderPoint(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
              min="0"
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="memo" className="block text-sm font-medium text-gray-700">
              メモ
            </label>
            <textarea
              id="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateItemModal;
