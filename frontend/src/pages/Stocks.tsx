import { useState } from 'react';
import Modal from '../components/Modal';

const Stocks = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">在庫管理</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          入出庫登録
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
                入出庫数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                在庫数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                更新日時
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-green-600">+10</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  50
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024/01/15 15:30
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedId(item)}
                    className="text-primary hover:text-primary/70 mr-4"
                  >
                    詳細
                  </button>
                  <button className="text-red-600 hover:text-red-800">
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
              <span className="text-sm text-green-600">+10</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">在庫数</p>
                <p className="text-sm font-medium text-gray-900">50</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">更新日時</p>
                <p className="text-sm font-medium text-gray-500">2024/01/15 15:30</p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedId(item)}
                className="text-primary hover:text-primary/70 text-sm"
              >
                詳細
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm">
                削除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細モーダル */}
      <Modal
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
        title="在庫詳細"
        hideDefaultFooter
      >
        <div className="space-y-8">
          {/* 基本情報 */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">基本情報</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">商品名</label>
                <p className="mt-1 text-sm">コピー用紙 A4</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">カテゴリ</label>
                <p className="mt-1 text-sm">文具</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">在庫数</label>
                <p className="mt-1 text-sm">50</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">発注点</label>
                <p className="mt-1 text-sm">20</p>
              </div>
            </div>
          </div>

          {/* 在庫履歴 */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">在庫履歴</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">最終入庫日</label>
                  <p className="mt-1 text-sm">2024/01/15</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">最終消費日</label>
                  <p className="mt-1 text-sm">2024/01/20</p>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">入出庫履歴</label>
                <div className="max-h-40 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">日付</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">種別</th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">数量</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { date: '2024/01/20', type: '消費', quantity: -10 },
                        { date: '2024/01/15', type: '入庫', quantity: 100 },
                        { date: '2024/01/10', type: '消費', quantity: -20 },
                      ].map((record, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-xs">{record.date}</td>
                          <td className="px-3 py-2 text-xs">{record.type}</td>
                          <td className="px-3 py-2 text-xs text-right">{record.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 発注情報 */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">発注情報</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">発注中の数量</label>
                <p className="mt-1 text-sm">100</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">最終発注日</label>
                <p className="mt-1 text-sm">2024/01/05</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Stocks;
