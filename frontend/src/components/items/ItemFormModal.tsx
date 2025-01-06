import { useState, useEffect } from 'react';
import Modal from '../Modal';

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialValues?: {
    name?: string;
    category?: string;
    consumptionUnit?: string;
    unitsPerOrder?: number;
    stock?: number;
    orderPoint?: number;
    location?: string;
    url?: string;
  };
}

const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  onClose,
  mode,
  initialValues = {}
}) => {
  const [consumptionUnit, setConsumptionUnit] = useState(initialValues.consumptionUnit ?? '');
  const [stock, setStock] = useState(initialValues.stock?.toLocaleString() ?? '');
  const [orderPoint, setOrderPoint] = useState(initialValues.orderPoint?.toLocaleString() ?? '');
  const [unitsPerOrder, setUnitsPerOrder] = useState(initialValues.unitsPerOrder?.toLocaleString() ?? '');

  useEffect(() => {
    setConsumptionUnit(initialValues.consumptionUnit ?? '');
    setStock(initialValues.stock?.toLocaleString() ?? '');
    setOrderPoint(initialValues.orderPoint?.toLocaleString() ?? '');
    setUnitsPerOrder(initialValues.unitsPerOrder?.toLocaleString() ?? '');
  }, [initialValues]);

  const handleNumberChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    const numericValue = value.replace(/[^\d,]/g, '');
    const plainNumber = numericValue.replace(/,/g, '');
    const formattedValue = plainNumber ? Number(plainNumber).toLocaleString() : '';
    setter(formattedValue);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? '消耗品の新規作成' : '消耗品の編集'}
    >
      <form className="space-y-6" onSubmit={(e) => {
        e.preventDefault();
        // フォーム送信時の処理
      }}>
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
            name="name"
            required
            defaultValue={initialValues.name}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
            placeholder="コピー用紙 A4"
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
            name="category"
            required
            defaultValue={initialValues.category}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
          >
            <option value="">選択してください</option>
            <option value="文具">文具</option>
            <option value="オフィス用品">オフィス用品</option>
            <option value="衛生用品">衛生用品</option>
            <option value="キッチン用品">キッチン用品</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div>
          <label htmlFor="consumptionUnit" className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-1">
              単位
              <span className="text-red-500 text-xs">*必須</span>
            </span>
          </label>
          <input
            type="text"
            id="consumptionUnit"
            name="consumptionUnit"
            required
            className="mt-1 block w-24 rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
            placeholder="枚"
            value={consumptionUnit}
            onChange={(e) => setConsumptionUnit(e.target.value)}
          />
        </div>

        {/* 発注情報 */}
        <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900">発注情報</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="unitsPerOrder" className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-1">
                  1発注単位あたりの数量
                  <span className="text-red-500 text-xs">*必須</span>
                </span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="unitsPerOrder"
                  name="unitsPerOrder"
                  required
                  value={unitsPerOrder}
                  onChange={(e) => handleNumberChange(e.target.value, setUnitsPerOrder)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2 text-right"
                  placeholder="100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 消費情報 */}
        <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900">消費情報</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-1">
                  現在の在庫数
                  <span className="text-red-500 text-xs">*必須</span>
                </span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  required
                  value={stock}
                  onChange={(e) => handleNumberChange(e.target.value, setStock)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2 text-right"
                  placeholder="1,000"
                />
              </div>
            </div>
            <div>
              <label htmlFor="orderPoint" className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-1">
                  発注点
                  <span className="text-red-500 text-xs">*必須</span>
                </span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="orderPoint"
                  name="orderPoint"
                  required
                  value={orderPoint}
                  onChange={(e) => handleNumberChange(e.target.value, setOrderPoint)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2 text-right"
                  placeholder="300"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            保管場所
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={initialValues.location}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
            placeholder="1F 文具棚A"
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            発注URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            defaultValue={initialValues.url}
            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
            placeholder="https://example.com"
          />
        </div>
      </form>
    </Modal>
  );
};

export default ItemFormModal;
