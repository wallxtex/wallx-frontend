import { Outlet } from "react-router-dom";
import PublicNavbar from "../common/Navbar";
import FooterSection from "../components/landing-pages/FooterSection";

export default function PublicLayouts() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="grow pt-0 bg-[#F5F9FD]">
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
