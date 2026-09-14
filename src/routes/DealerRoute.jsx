import { Route, Routes } from "react-router-dom";
import DealersLayout from "../layout/DealersLayout";
import DealersDashboard from "../dashboard/dealers/DealersDashboard";
import DealersOrders from "../dashboard/dealers/DealersOrders";

const DealerRoutes = () => {
    return (
        <Routes>
            {/* if the layout not created then it directly access the db */}
            <Route element={<DealersLayout />}>
                <Route path="/dashboard" element={<DealersDashboard />} />
                <Route path="/orders" element={<DealersOrders />} />
            </Route>
        </Routes>
    );
};

export default DealerRoutes;
