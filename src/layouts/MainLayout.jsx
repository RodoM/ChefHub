import { Outlet } from 'react-router-dom';
import Header from '@/components/header/Header';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="px-4 sm:container">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
