import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../dashboard/admin/components/Dashboard";
import DealerManagement from "../dashboard/admin/components/Dealer";
import PainterDashboard from "../dashboard/painters/PaintersDashboard";
import GenerateCoupon from "../dashboard/admin/ui/GenerateCoupon";
import VisitEnquiry from "../dashboard/admin/ui/Visit-Enquiry";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dealer-page" element={<DealerManagement />} />
        <Route path="/painter-page" element={<PainterDashboard />}></Route>
        <Route path="/generate-coupon" element={<GenerateCoupon/>}></Route>
        <Route path="/visit-enquiry" element={<VisitEnquiry/>}></Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
