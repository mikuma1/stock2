import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './contexts/SidebarContext';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <MainLayout>
          <div>コンテンツ</div>
        </MainLayout>
      </SidebarProvider>
    </BrowserRouter>
  );
};

export default App;
