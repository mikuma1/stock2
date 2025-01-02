import { useState } from 'react';
import Modal from '../components/Modal';

type ActivityType = 'stock' | 'order';
type ActivityId = number;

interface SelectedActivity {
  id: ActivityId;
  type: ActivityType;
}

const Dashboard = () => {
  const [selectedActivity, setSelectedActivity] = useState<SelectedActivity | null>(null);

  // 在庫詳細モーダルの内容
  const renderStockModal = () => (
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
  );

  // 発注詳細モーダルの内容
  const renderOrderModal = () => (
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
        <div className="mt-4">
          <label className="block text-xs text-gray-500">備考</label>
          <p className="mt-1 text-sm">至急対応お願いします。</p>
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
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ページタイトル */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
      </div>

      {/* 概要カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">総消耗品数</div>
          <div className="text-2xl font-bold text-gray-900">123</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">要発注品目</div>
          <div className="text-2xl font-bold text-gray-900">12</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">本日の発注</div>
          <div className="text-2xl font-bold text-gray-900">5</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">今月の発注数</div>
          <div className="text-2xl font-bold text-gray-900">42</div>
        </div>
      </div>

      {/* 最近の活動 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900">最近の活動</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {[
              { id: 1, type: 'stock' as const },
              { id: 2, type: 'order' as const },
              // ... 他のアイテム
            ].map((item) => (
              <li key={item.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">コピー用紙の在庫が追加されました</p>
                    <p className="text-xs text-gray-400">2時間前</p>
                  </div>
                  <button
                    onClick={() => setSelectedActivity({ id: item.id, type: item.type })}
                    className="text-primary hover:text-primary/70 text-sm"
                  >
                    詳細
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 詳細モーダル */}
      <Modal
        isOpen={selectedActivity !== null}
        onClose={() => setSelectedActivity(null)}
        title={selectedActivity?.type === 'stock' ? '在庫詳細' : '発注詳細'}
        hideDefaultFooter
      >
        {selectedActivity?.type === 'stock'
          ? renderStockModal()
          : renderOrderModal()
        }
      </Modal>
    </div>
  );
};

export default Dashboard;
