import GlobalNavbar from "../common/global-components/GlobalNavbar";
import GlobalSidebar from "../common/global-components/GlobalSidebar";
import { Outlet } from "react-router-dom";
import { adminMenu } from "../common/global-components/data/AdminSidebarMenu";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <GlobalNavbar />
      <div className="flex flex-1 w-full overflow-hidden">
        <GlobalSidebar Menu={adminMenu} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
