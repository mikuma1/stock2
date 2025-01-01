const Dashboard = () => {
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
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">コピー用紙の在庫が追加されました</p>
                    <p className="text-xs text-gray-400">2時間前</p>
                  </div>
                  <div className="text-sm text-primary">詳細</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
