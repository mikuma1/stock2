import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './contexts/SidebarContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import Stocks from './pages/Stocks';
import Orders from './pages/Orders';
import Master from './pages/Master';

const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/master" element={<Master />} />
          </Routes>
        </MainLayout>
      </SidebarProvider>
    </BrowserRouter>
  );
};

export default App;
