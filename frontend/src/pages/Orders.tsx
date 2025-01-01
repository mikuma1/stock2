const Orders = () => {
  return (
    <div className="space-y-6">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">発注管理</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          新規発注
        </button>
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
                  <button className="text-gray-600 hover:text-gray-900">
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
                <p className="text-xs text-gray-500">2024/01/15</p>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                発注中
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">発注数</p>
                <p className="text-sm font-medium text-gray-900">100</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">納品予定日</p>
                <p className="text-sm font-medium text-gray-500">2024/01/20</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="text-gray-600 hover:text-gray-900 text-sm">
                詳細
              </button>
              <button className="text-primary hover:text-primary/70 text-sm">
                納品確認
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
