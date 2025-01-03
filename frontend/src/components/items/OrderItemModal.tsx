import { useState } from 'react';
import Modal from '../Modal';

interface OrderItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: number | null;
  unit: string;
}

const OrderItemModal = ({ isOpen, onClose, itemId, unit }: OrderItemModalProps) => {
  const [quantity, setQuantity] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 発注依頼の処理
    console.log('発注依頼:', {
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
    <Modal isOpen={isOpen} onClose={onClose} title="発注依頼">
      <form id="modal-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                発注数
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                required
                min="1"
              />
              <span className="ml-2 text-sm text-gray-500">{unit}</span>
            </div>
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
              placeholder="発注理由や備考を入力"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default OrderItemModal;
