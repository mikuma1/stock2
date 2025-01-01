import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <div>コンテンツ</div>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
