import AdminHeader from "./AdminHeader";
import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminNav />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;