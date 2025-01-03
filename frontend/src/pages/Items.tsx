import { useState } from 'react';
import Modal from '../components/Modal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const Items = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    // TODO: 削除処理
    console.log('削除:', deleteId);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">消耗品管理</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          新規登録
        </button>
      </div>

      {/* PC用テーブル */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                カテゴリ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                在庫数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                発注点
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状態
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  コピー用紙 A4
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  文具
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  50
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  20
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    適正
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedId(item)}
                    className="text-primary hover:text-primary/70 mr-4"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => setDeleteId(item)}
                    className="text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* モバイル用カードビュー */}
      <div className="md:hidden space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-medium text-gray-900">コピー用紙 A4</h3>
                <p className="text-xs text-gray-500">文具</p>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                適正
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">在庫数</p>
                <p className="text-sm font-medium text-gray-900">50</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">発注点</p>
                <p className="text-sm font-medium text-gray-900">20</p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedId(item)}
                className="text-primary hover:text-primary/70 text-sm"
              >
                編集
              </button>
              <button
                onClick={() => setDeleteId(item)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                削除
              </button>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default Items;
