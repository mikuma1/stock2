import { useState } from 'react';
import Modal from '../components/Modal';
import CreateItemModal from '../components/items/CreateItemModal';
import UseItemModal from '../components/items/UseItemModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

interface Item {
  id: number;
  name: string;
  category: string;
  stock: number;
  orderPoint: number;
  unit: string;
}

const Items = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [useItemId, setUseItemId] = useState<number | null>(null);

  // サンプルデータ
  const items: Item[] = [
    { id: 1, name: 'コピー用紙 A4', category: '文具', stock: 50, orderPoint: 20, unit: '箱' },
    { id: 2, name: 'ボールペン', category: '文具', stock: 100, orderPoint: 30, unit: '本' },
    { id: 3, name: 'ホチキス', category: 'オフィス用品', stock: 20, orderPoint: 5, unit: '個' },
  ];

  const handleDelete = () => {
    // TODO: 削除処理
    console.log('削除:', deleteId);
    setDeleteId(null);
  };

  // 状態を判定する関数
  const getStatus = (stock: number, orderPoint: number) => {
    if (stock <= orderPoint) {
      return { text: '発注必要', className: 'bg-red-100 text-red-800' };
    }
    return { text: '適正', className: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">消耗品管理</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          新規作成
        </button>
      </div>

      {/* PC用テーブル */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">商品名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">カテゴリ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-24">在庫数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-24">発注点</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">状態</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => {
              const status = getStatus(item.stock, item.orderPoint);
              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="truncate" title={item.name}>{item.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="truncate" title={item.category}>{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.stock}{item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.orderPoint}{item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}>
                      {status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setUseItemId(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        使用
                      </button>
                      <button
                        onClick={() => setSelectedId(item.id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* モバイル用カードビュー */}
      <div className="md:hidden space-y-4">
        {items.map((item) => {
          const status = getStatus(item.stock, item.orderPoint);
          return (
            <div key={item.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1 flex-1 mr-2">
                  <h3 className="text-sm font-medium text-gray-900 break-words">{item.name}</h3>
                  <p className="text-xs text-gray-500 break-words">{item.category}</p>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full shrink-0 ${status.className}`}>
                  {status.text}
                </span>
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setUseItemId(item.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  使用
                </button>
                <button
                  onClick={() => setSelectedId(item.id)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  編集
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  削除
                </button>
              </div>
              <div className="text-sm text-gray-500">
                <div>カテゴリ: {item.category}</div>
                <div>在庫数: {item.stock}{item.unit}</div>
                <div>発注点: {item.orderPoint}{item.unit}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 編集モーダル */}
      <Modal
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
        title="消耗品編集"
      >
        <form id="modal-form">
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
                name="name"
                required
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                defaultValue="コピー用紙 A4"
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
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                defaultValue="文具"
              >
                <option value="文具">文具</option>
                <option value="オフィス用品">オフィス用品</option>
                <option value="衛生用品">衛生用品</option>
                <option value="キッチン用品">キッチン用品</option>
                <option value="その他">その他</option>
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
                name="unit"
                required
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                defaultValue="箱"
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
                name="stock"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                defaultValue="50"
              />
            </div>

            <div>
              <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-1">
                  発注点
                  <span className="text-red-500 text-xs">*必須</span>
                </span>
              </label>
              <input
                type="number"
                id="threshold"
                name="threshold"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                defaultValue="20"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL
              </label>
              <input
                type="url"
                id="url"
                name="url"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                defaultValue="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="memo" className="block text-sm font-medium text-gray-700">
                メモ
              </label>
              <textarea
                id="memo"
                name="memo"
                rows={3}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
                defaultValue="メモを入力"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* 削除確認モーダル */}
      <DeleteConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
        title="消耗品の削除"
        message="削除してもよろしいですか？"
        targetName="コピー用紙 A4"
        hideDefaultFooter
      />

      {/* 使用モーダル */}
      <UseItemModal
        isOpen={useItemId !== null}
        onClose={() => setUseItemId(null)}
        itemId={useItemId}
      />

      {/* モーダル群 */}
      <CreateItemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Items;
