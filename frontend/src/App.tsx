import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './contexts/SidebarContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </SidebarProvider>
    </BrowserRouter>
  );
};

export default App;
