import { lazy } from "react";
import { ROLES } from "../auth/roles";

// ==================== LAYOUTS ====================
import PublicLayouts from "../layout/PublicLayout";
import AdminLayout from "../layout/AdminLayout";
import DealersLayout from "../layout/DealersLayout";
import PainterLayout from "../layout/PainterLayout";

// ==================== LAZY LOADED PAGES ====================

// Public Pages
const HomePage = lazy(() => import("../components/pages/HomePage"));
const PainterPage = lazy(() => import("../pages/painter/PainterPage"));
const DealersPage = lazy(() => import("../pages/dealers/DealersPage"));
const ServicesPage = lazy(() => import("../pages/services/ServicesPage"));
const ProductsPage = lazy(() => import("../pages/products/ProductsPage"));

// Auth Pages
const PainterSignup = lazy(() => import("../pages/auth/PainterSignup"));
const PainterVerification = lazy(
  () => import("../pages/auth/PainterVerification"),
);
const PainterLogin = lazy(() => import("../pages/auth/PainterLogin"));
const DealerSignup = lazy(() => import("../pages/auth/DealerSignup"));
const DealerVerification = lazy(
  () => import("../pages/auth/DealerVerification"),
);
const DealerLogin = lazy(() => import("../pages/auth/DealerLogin"));

// Admin Pages
const AdminDashboard = lazy(
  () => import("../dashboard/admin/components/Dashboard"),
);
const AdminDealersDashboard = lazy(
  () => import("../dashboard/dealers/DealersDashboard"),
);
const AdminPainterDashboard = lazy(
  () => import("../dashboard/painters/PaintersDashboard"),
);
const GenerateCoupon = lazy(
  () => import("../dashboard/admin/ui/GenerateCoupon"),
);
const VisitEnquiry = lazy(
  () => import("../dashboard/admin/ui/Visit-Enquiry"),
);

// Dealer Pages
const DealersDashboard = lazy(
  () => import("../dashboard/dealers/DealersDashboard"),
);
const DealersOrders = lazy(() => import("../dashboard/dealers/DealersOrders"));

// Painter Pages
const PainterDashboard = lazy(
  () => import("../dashboard/painters/PaintersDashboard"),
);
const QRScanner = lazy(
  () => import("../dashboard/painters/components/QRScanner"),
);
const RedeemPage = lazy(
  () => import("../dashboard/painters/components/RedeemPage"),
);

// Special Pages
const Unauthorized = lazy(() => import("../pages/Unauthorized"));
const NotFound = lazy(() => import("../pages/NotFound"));

/**
 * Route Configuration
 * {
 *   path: string,              // Route path
 *   element: Component,        // Component to render
 *   protected: boolean,        // Requires authentication
 *   allowedRoles: Array,       // Array of ROLES (optional - if omitted, any authenticated user can access)
 *   layout: Component,         // Layout wrapper (optional)
 *   children: Array            // Nested routes (optional)
 * }
 */
export const routeConfig = [
  // ==================== PUBLIC ROUTES ====================
  {
    path: "/",
    layout: PublicLayouts,
    children: [
      { path: "/", element: HomePage },
      { path: "/painters", element: PainterPage },
      { path: "/dealers", element: DealersPage },
      { path: "/services", element: ServicesPage },
      { path: "/products", element: ProductsPage },
    ],
  },

  // ==================== AUTH ROUTES (PUBLIC) ====================
  { path: "/painter-login", element: PainterLogin, protected: false },
  { path: "/painter-signup", element: PainterSignup, protected: false },
  {
    path: "/painter-verification",
    element: PainterVerification,
    protected: false,
  },
  { path: "/dealer-login", element: DealerLogin, protected: false },
  { path: "/dealer-signup", element: DealerSignup, protected: false },
  {
    path: "/dealer-verification",
    element: DealerVerification,
    protected: false,
  },

  // Generic login route (can redirect based on context)
  { path: "/login", element: PainterLogin, protected: false },

  // ==================== ADMIN PROTECTED ROUTES ====================
  {
    path: "/admin",
    protected: false,
    allowedRoles: [ROLES.ADMIN],
    layout: AdminLayout,
    children: [
      { path: "/admin/dashboard", element: AdminDashboard },
      { path: "/admin/dealer-page", element: AdminDealersDashboard },
      { path: "/admin/painter-page", element: AdminPainterDashboard },
      { path: "/admin/generate-coupon", element: GenerateCoupon },
      { path: "/admin/visit-enquiry", element: VisitEnquiry },
    ],
  },

  // ==================== DEALER PROTECTED ROUTES ====================
  {
    path: "/dealer",
    protected: false,
    allowedRoles: [ROLES.DEALER],
    layout: DealersLayout,
    children: [
      { path: "/dealer/dashboard", element: DealersDashboard },
      { path: "/dealer/orders", element: DealersOrders },
    ],
  },

  // ==================== PAINTER PROTECTED ROUTES ====================
  {
    path: "/painter",
    protected: false,
    allowedRoles: [ROLES.PAINTER],
    children: [
      {
        path: "/painter",
        layout: PainterLayout,
        children: [{ path: "/painter/dashboard", element: PainterDashboard }],
      },
      // These routes don't use the layout
      { path: "/painter/scan", element: QRScanner },
      { path: "/painter/redeem", element: RedeemPage },
    ],
  },

  // ==================== SPECIAL ROUTES ====================
  { path: "/unauthorized", element: Unauthorized, protected: false },
  { path: "*", element: NotFound, protected: false },
];

/**
 * Helper function to get all route paths for a specific role
 * Useful for navigation menus and role-based UI
 */
export const getRoutesByRole = (role) => {
  return routeConfig.filter((route) => {
    if (!route.protected) return false;
    if (!route.allowedRoles) return true; // Any authenticated user
    return route.allowedRoles.includes(role);
  });
};
