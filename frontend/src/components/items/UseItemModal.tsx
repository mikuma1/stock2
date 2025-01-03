import { useState } from 'react';
import Modal from '../Modal';

interface UseItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: number | null;
}

const UseItemModal = ({ isOpen, onClose, itemId }: UseItemModalProps) => {
  const [quantity, setQuantity] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 消耗品使用の処理
    console.log('消耗品使用:', {
      itemId,
      quantity: Number(quantity),
      memo,
    });
    // フォームをリセット
    setQuantity('');
    setMemo('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="消耗品使用">
      <form id="modal-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                使用数
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
              min="1"
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
              placeholder="使用目的や備考を入力"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default UseItemModal;
