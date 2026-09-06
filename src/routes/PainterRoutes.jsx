import { Route, Routes } from "react-router-dom";
import PainterLayout from "../layout/PainterLayout";
import PainterDashboard from "../dashboard/painters/PaintersDashboard";

const PainterRoutes = () => {
  return (
    <Routes>
      {/* if the layout not created then it directly access the db */}
      <Route element={<PainterLayout/>}>
        <Route path="/dashboard" element={<PainterDashboard />} />
      </Route>
    </Routes>
  );
};

export default PainterRoutes;
