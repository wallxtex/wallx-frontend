import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayouts from "../layout/PublicLayout";

// Lazy Loaded Public Page Components
const HomePage = lazy(() => import("../components/pages/HomePage"));
const PainterPage = lazy(() => import("../pages/painter/PainterPage"));
const DealersPage = lazy(() => import("../pages/dealers/DealersPage"));
const ServicesPage = lazy(() => import("../pages/services/ServicesPage"));
// const NotFound = lazy(() => import("../pages"));

// Lazy Loaded Auth Components
const PainterSignup = lazy(() => import("../pages/auth/PainterSignup"));
const PainterVerification = lazy(
  () => import("../pages/auth/PainterVerification"),
);
const DealerSignup = lazy(() => import("../pages/auth/DealerSignup"));
const DealerVerification = lazy(
  () => import("../pages/auth/DealerVerification"),
);
const PublicRoute = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* ================= SECTION 1: PUBLIC LANDING PAGES ================= */}
        <Route element={<PublicLayouts />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/painters" element={<PainterPage />} />
          <Route path="/dealers" element={<DealersPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Route>
        {/* ================= SECTION 2: AUTHENTICATION PAGES ================= */}
        <Route path="/painter-signup" element={<PainterSignup />} />
        <Route path="/painter-verification" element={<PainterVerification />} />
        <Route path="/dealer-signup" element={<DealerSignup />} />
        <Route path="/dealer-verification" element={<DealerVerification />} />

        {/* ================= SECTION 3: 404 NOT FOUND ROUTE ================= */}
      </Routes>
    </Suspense>
  );
};

export default PublicRoute;
