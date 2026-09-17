import { Route, Routes } from "react-router-dom";
import PainterLayout from "../layout/PainterLayout";
import PainterDashboard from "../dashboard/painters/PaintersDashboard";
import RedeemPage from "../dashboard/painters/components/RedeemPage";
import QRScanner from "../dashboard/painters/components/QrScanner";

const PainterRoutes = () => {
  return (
    <Routes>
      {/* if the layout not created then it directly access the db */}
      <Route element={<PainterLayout />}>
        <Route path="/dashboard" element={<PainterDashboard />} />
      </Route>
      <Route path="/scan" element={<QRScanner/>} />
      <Route path="/redeem" element={<RedeemPage />} />
    </Routes>
  );
};

export default PainterRoutes;
