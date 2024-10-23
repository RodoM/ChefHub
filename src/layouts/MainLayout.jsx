import { Outlet } from 'react-router-dom';
import Header from '@/components/header/Header';
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="px-4 sm:container">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

export default MainLayout;
