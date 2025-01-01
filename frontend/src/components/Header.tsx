const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        {/* ハンバーガーメニュー（モバイル用） */}
        <button className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* ロゴ */}
        <div className="text-xl font-bold text-gray-900">STOCK!</div>

        {/* ユーザー情報 */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <span className="text-sm text-gray-700 hidden sm:inline">ユーザー名</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
