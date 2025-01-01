import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64">
        <div className="p-6 max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
