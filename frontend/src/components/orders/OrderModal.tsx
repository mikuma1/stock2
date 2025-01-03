import { useState, useEffect } from 'react';
import Modal from '../Modal';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
  productName?: string;
  quantity?: number;
  unit?: string;
  requester?: string;
  department?: string;
  url?: string;
}

const OrderModal = ({
  isOpen,
  onClose,
  orderNumber,
  productName,
  quantity,
  unit,
  requester,
  department,
  url
}: OrderModalProps) => {
  const [orderQuantity, setOrderQuantity] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen && quantity) {
      setOrderQuantity(quantity.toString());
    }
  }, [isOpen, quantity]);

  const handleOrder = () => {
    // TODO: 発注の処理
    console.log('発注:', {
      orderNumber,
      quantity: parseInt(orderQuantity, 10),
      note,
      action: 'order'
    });
    setNote('');
    setOrderQuantity('');
    onClose();
  };

  const handleOpenUrl = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="発注"
      hideDefaultFooter
    >
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
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            発注数
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              id="quantity"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(e.target.value)}
              min="1"
              className="block w-32 rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
            />
            <span className="text-sm text-gray-700">{unit}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">申請数: {quantity} {unit}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            申請者
          </label>
          <p className="mt-1 text-sm text-gray-900">{requester ?? '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            申請部署
          </label>
          <p className="mt-1 text-sm text-gray-900">{department ?? '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            商品URL
          </label>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm text-gray-900 truncate flex-1">
              {url ?? '-'}
            </p>
            {url && (
              <button
                type="button"
                onClick={handleOpenUrl}
                className="inline-flex items-center justify-center rounded bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                発注画面へ
              </button>
            )}
          </div>
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
            placeholder="発注に関する備考を入力"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleOrder}
            className="inline-flex justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            発注
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
