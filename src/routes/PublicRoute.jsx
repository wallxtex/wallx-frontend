import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayouts from "../layout/PublicLayout";

// Lazy Loaded Public Page Components
const HomePage = lazy(() => import("../components/pages/HomePage"));
const PainterPage = lazy(() => import("../pages/painter/PainterPage"));
const DealersPage = lazy(() => import("../pages/dealers/DealersPage"));
const ServicesPage = lazy(() => import("../pages/services/ServicesPage"));
const ProductsPage = lazy(() => import("../pages/products/ProductsPage"));
// const NotFound = lazy(() => import("../pages"));
const PainterSignup = lazy(() => import("../pages/auth/PainterSignup"));
const PainterVerification = lazy(
  () => import("../pages/auth/PainterVerification"),
);
const DealerSignup = lazy(() => import("../pages/auth/DealerSignup"));
const DealerVerification = lazy(
  () => import("../pages/auth/DealerVerification"),
);
const PainterLogin = lazy(() => import("../pages/auth/PainterLogin"));
const DealerLogin = lazy(() => import("../pages/auth/DealerLogin"));

const PublicRoute = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#d82b2b]"></div>
      </div>
    }>
      <Routes>
        {/* ================= SECTION 1: PUBLIC LANDING PAGES ================= */}
        <Route element={<PublicLayouts />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/painters" element={<PainterPage />} />
          <Route path="/dealers" element={<DealersPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage/>} />

        </Route>
        {/* ================= SECTION 2: AUTHENTICATION PAGES ================= */}
        <Route path="/painter-login" element={<PainterLogin />} />
        <Route path="/painter-signup" element={<PainterSignup />} />
        <Route path="/painter-verification" element={<PainterVerification />} />
        <Route path="/dealer-login" element={<DealerLogin />} />
        <Route path="/dealer-signup" element={<DealerSignup />} />
        <Route path="/dealer-verification" element={<DealerVerification />} />

        {/* ================= SECTION 3: 404 NOT FOUND ROUTE missiong================= */}
      </Routes>
    </Suspense>
  );
};

export default PublicRoute;
