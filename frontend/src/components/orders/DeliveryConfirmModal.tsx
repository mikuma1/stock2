import { useState, useEffect } from 'react';
import Modal from '../Modal';

interface DeliveryConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
  productName?: string;
  orderedQuantity?: number;
  unit?: string;
}

const DeliveryConfirmModal = ({
  isOpen,
  onClose,
  orderNumber,
  productName,
  orderedQuantity = 0,
  unit = '個'
}: DeliveryConfirmModalProps) => {
  const [deliveredQuantity, setDeliveredQuantity] = useState(orderedQuantity.toString());
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDeliveredQuantity(orderedQuantity.toString());
    }
  }, [isOpen, orderedQuantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 納品確認の処理
    console.log('納品確認:', {
      orderNumber,
      orderedQuantity,
      deliveredQuantity: Number(deliveredQuantity),
      note
    });
    // フォームをリセット
    setDeliveredQuantity(orderedQuantity.toString());
    setNote('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="納品">
      <form id="modal-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              発注番号
            </label>
            <p className="mt-1 text-sm text-gray-900">{orderNumber ?? '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              商品名
            </label>
            <p className="mt-1 text-sm text-gray-900">{productName ?? '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              発注数
            </label>
            <p className="mt-1 text-sm text-gray-900">{orderedQuantity} {unit}</p>
          </div>

          <div>
            <label htmlFor="deliveredQuantity" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                納品数
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                id="deliveredQuantity"
                value={deliveredQuantity}
                onChange={(e) => setDeliveredQuantity(e.target.value)}
                min="0"
                className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                required
              />
              <span className="text-sm text-gray-500">{unit}</span>
            </div>
            {Number(deliveredQuantity) !== orderedQuantity && (
              <p className="mt-1 text-xs text-yellow-600">
                ※ 発注数と納品数が異なります
              </p>
            )}
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
              備考
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              placeholder="納品に関する備考を入力"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default DeliveryConfirmModal;
