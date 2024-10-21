import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const AnonymousLayout = () => {
  return (
    <div className="px-4 sm:container">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default AnonymousLayout;
