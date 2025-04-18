import { useState, useEffect } from 'react';
import UseItemModal from '../components/items/UseItemModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import OrderItemModal from '../components/items/OrderItemModal';
import ItemFormModal from '../components/items/ItemFormModal';
import { Item } from '../types/api';
import { itemService } from '../services/itemService';

const Items = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [useItemId, setUseItemId] = useState<number | null>(null);
  const [orderItemId, setOrderItemId] = useState<number | null>(null);

  // サンプルデータ
  const items: Omit<Item, 'createdAt' | 'updatedAt'>[] = [
    { id: 1, name: 'コピー用紙 A4', category: '文具', stock: 25000, orderPoint: 10000, consumptionUnit: '枚', unitsPerOrder: 500, location: '1F 文具棚A' },
    { id: 2, name: 'ボールペン', category: '文具', stock: 48, orderPoint: 24, consumptionUnit: '本', unitsPerOrder: 12, location: '1F 文具棚B' },
    { id: 3, name: 'ホチキス', category: 'オフィス用品', stock: 30, orderPoint: 10, consumptionUnit: '個', unitsPerOrder: 10, location: '2F 収納庫' },
    { id: 4, name: 'クリアファイル', category: '文具', stock: 100, orderPoint: 30, consumptionUnit: '枚', unitsPerOrder: 10, location: '3F 大会議室横 備品保管庫 A列 2段目' },
    { id: 5, name: '付箋', category: '文具', stock: 50, orderPoint: 15, consumptionUnit: '個', unitsPerOrder: 5, location: '1F 総務部エリア 文具保管庫 B-5' },
    { id: 6, name: 'マスク', category: '衛生用品', stock: 300, orderPoint: 100, consumptionUnit: '枚', unitsPerOrder: 50, location: '2F 防災倉庫 衛生用品コーナー 棚番号C-12' },
  ];

  // APIテスト用の関数
  const testApi = async () => {
    try {
      const response = await itemService.getItems();
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // 開発用：コンポーネントマウント時にAPIをテスト
  useEffect(() => {
    testApi();
  }, []);

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

  // 選択されたアイテムを取得
  const selectedItem = items.find(item => item.id === selectedId);

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[160px] w-1/5">保管場所</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.stock}{item.consumptionUnit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.orderPoint}{item.consumptionUnit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}>
                      {status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="whitespace-pre-wrap break-words line-clamp-3 min-w-[160px]" title={item.location}>
                      {item.location ?? '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => setUseItemId(item.id)}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                        >
                          使用
                        </button>
                        <button
                          onClick={() => setOrderItemId(item.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          発注依頼
                        </button>
                      </div>
                      <div className="flex justify-end gap-4">
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
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-900 break-words">{item.name}</h3>
                  <p className="text-xs text-gray-500 break-words">{item.category}</p>
                  <div className="text-sm text-gray-500">
                    <div>在庫数: {item.stock}{item.consumptionUnit}</div>
                    <div>発注点: {item.orderPoint}{item.consumptionUnit}</div>
                    <div className="whitespace-pre-wrap break-words line-clamp-3" title={item.location}>
                      保管場所: {item.location ?? '-'}
                    </div>
                  </div>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}>
                  {status.text}
                </span>
              </div>

              {/* 操作ボタン */}
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setUseItemId(item.id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                  >
                    使用
                  </button>
                  <button
                    onClick={() => setOrderItemId(item.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    発注依頼
                  </button>
                </div>
                <div className="flex justify-end gap-4">
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
              </div>
            </div>
          );
        })}
      </div>

      {/* 編集モーダル */}
      <ItemFormModal
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
        mode="edit"
        initialValues={selectedItem}
      />

      {/* 新規作成モーダル */}
      <ItemFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode="create"
      />

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
        unit={items.find(item => item.id === useItemId)?.consumptionUnit ?? ''}
      />

      <OrderItemModal
        isOpen={orderItemId !== null}
        onClose={() => setOrderItemId(null)}
        itemId={orderItemId}
        unit={items.find(item => item.id === orderItemId)?.unitsPerOrder.toString() ?? ''}
      />
    </div>
  );
};

export default Items;
