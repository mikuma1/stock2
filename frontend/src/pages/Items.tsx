const Items = () => {
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
                  <button className="text-primary hover:text-primary/70 mr-4">
                    編集
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
              <button className="text-primary hover:text-primary/70 text-sm">
                編集
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm">
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
