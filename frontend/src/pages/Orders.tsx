import { useState } from 'react';
import Modal from '../components/Modal';

const Orders = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">発注管理</h1>
      </div>

      {/* PC用テーブル */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                発注日
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                発注数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                納品予定日
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024/01/15
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  コピー用紙 A4
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  100
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024/01/20
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    発注中
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <button
                    onClick={() => setSelectedId(item)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    詳細
                  </button>
                  <button className="text-primary hover:text-primary/70">
                    納品確認
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
                <p className="text-xs text-gray-500">総務部</p>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                承認待ち
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">申請数量</p>
                <p className="text-sm font-medium text-gray-900">100</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">申請日</p>
                <p className="text-sm font-medium text-gray-900">2024/01/15</p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedId(item)}
                className="text-primary hover:text-primary/70 text-sm"
              >
                詳細
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細モーダル */}
      <Modal
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
        title="発注詳細"
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
                <label className="block text-xs text-gray-500">申請部署</label>
                <p className="mt-1 text-sm">総務部</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">申請者</label>
                <p className="mt-1 text-sm">鈴木 一郎</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">申請数量</label>
                <p className="mt-1 text-sm">100</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">申請日</label>
                <p className="mt-1 text-sm">2024/01/15</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">状態</label>
                <p className="mt-1">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    承認待ち
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* 承認詳細 */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">承認詳細</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">承認者</label>
                <p className="mt-1 text-sm">山田 太郎</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">承認日</label>
                <p className="mt-1 text-sm">2024/01/16</p>
              </div>
            </div>
          </div>

          {/* 発注詳細 */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">発注詳細</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500">発注者</label>
                <p className="mt-1 text-sm">佐藤 花子</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">発注日</label>
                <p className="mt-1 text-sm">2024/01/17</p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">入庫予定日</label>
                <p className="mt-1 text-sm">2024/01/20</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-gray-500">備考</label>
              <p className="mt-1 text-sm">至急対応お願いします。</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
