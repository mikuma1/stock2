import { useState } from 'react';
import Modal from '../components/Modal';
import DeliveryConfirmModal from '../components/orders/DeliveryConfirmModal';

const Orders = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    id: number;
    productName: string;
    orderedQuantity: number;
    unit: string;
  } | null>(null);

  // 仮のデータ構造（後でAPIから取得するデータ）
  const orders = [
    {
      id: 1,
      orderDate: '2024/01/15',
      productName: 'コピー用紙 A4',
      quantity: 100,
      unit: '箱',
      deliveryDate: '2024/01/20',
      status: '発注中',
      department: '総務部',
      requester: '鈴木 一郎',
    },
    {
      id: 2,
      orderDate: '2024/01/14',
      productName: 'ボールペン（黒）',
      quantity: 50,
      unit: '本',
      deliveryDate: '2024/01/19',
      status: '納品済',
      department: '営業部',
      requester: '田中 花子',
    },
    {
      id: 3,
      orderDate: '2024/01/13',
      productName: 'クリアファイル',
      quantity: 200,
      unit: '枚',
      deliveryDate: '2024/01/18',
      status: '承認待ち',
      department: '人事部',
      requester: '山田 太郎',
    },
    {
      id: 4,
      orderDate: '2024/01/12',
      productName: 'ホチキス針',
      quantity: 30,
      unit: '箱',
      deliveryDate: '2024/01/17',
      status: '却下',
      department: '経理部',
      requester: '佐藤 次郎',
    },
    {
      id: 5,
      orderDate: '2024/01/11',
      productName: 'シャープペンシル',
      quantity: 80,
      unit: '本',
      deliveryDate: '2024/01/16',
      status: '発注中',
      department: '開発部',
      requester: '高橋 三郎',
    }
  ];

  const handleDeliveryConfirm = (item: number) => {
    setSelectedOrder({
      id: item,
      productName: 'コピー用紙 A4',
      orderedQuantity: 100,
      unit: '箱'
    });
    setIsDeliveryModalOpen(true);
  };

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
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.quantity} {order.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.deliveryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  {order.status === '発注中' && (
                    <button
                      onClick={() => handleDeliveryConfirm(order.id)}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                    >
                      納品
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedId(order.id)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    詳細
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* モバイル用カードビュー */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{order.productName}</h3>
                <p className="text-xs text-gray-500">{order.department}</p>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                {order.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">申請数量</p>
                <p className="text-sm font-medium text-gray-900">{order.quantity} {order.unit}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">申請日</p>
                <p className="text-sm font-medium text-gray-900">{order.orderDate}</p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              {order.status === '発注中' && (
                <button
                  onClick={() => handleDeliveryConfirm(order.id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                >
                  納品
                </button>
              )}
              <button
                onClick={() => setSelectedId(order.id)}
                className="text-gray-600 hover:text-gray-900"
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
                <p className="mt-1 text-sm">100 箱</p>
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

      {/* 納品確認モーダル */}
      <DeliveryConfirmModal
        isOpen={isDeliveryModalOpen}
        onClose={() => {
          setIsDeliveryModalOpen(false);
          setSelectedOrder(null);
        }}
        orderNumber={selectedOrder?.id.toString()}
        productName={selectedOrder?.productName}
        orderedQuantity={selectedOrder?.orderedQuantity}
        unit={selectedOrder?.unit}
      />
    </div>
  );
};

export default Orders;
