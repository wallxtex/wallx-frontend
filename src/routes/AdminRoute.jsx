import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../dashboard/admin/components/Dashboard";
import DealersDashboard from "../dashboard/dealers/DealersDashboard";
import PainterDashboard from "../dashboard/painters/PaintersDashboard";
import GenerateCoupon from "../dashboard/admin/ui/GenerateCoupon";
import VisitEnquiry from "../dashboard/admin/ui/Visit-Enquiry";
import AdminLogin from "../dashboard/admin/components/AdminLogin";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public route - Login page without layout */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected routes - With AdminLayout */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dealer-page" element={<DealersDashboard />} />
        <Route path="/painter-page" element={<PainterDashboard />}></Route>
        <Route path="/generate-coupon" element={<GenerateCoupon/>}></Route>
        <Route path="/visit-enquiry" element={<VisitEnquiry/>}></Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
