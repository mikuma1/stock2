const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">Stock2</div>
        </div>
      </header>

      <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200">
        <nav className="p-4">
          <div className="space-y-1">
            {/* サイドバーの内容は後で追加 */}
          </div>
        </nav>
      </aside>

      <main className="pt-16 pl-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
