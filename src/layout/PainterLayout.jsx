import { Outlet } from "react-router-dom";
import GlobalNavbar from "../common/global-components/GlobalNavbar";
import GlobalSidebar from "../common/global-components/GlobalSidebar";
import { painterMenu } from "../common/global-components/data/PainterSidebarMenus";

const PainterLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <GlobalNavbar />
      <div className="flex flex-1 w-full overflow-hidden">
        <GlobalSidebar Menu={painterMenu} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PainterLayout;
