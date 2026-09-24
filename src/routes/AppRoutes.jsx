import { Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { routeConfig } from "./routeConfig";

/**
 * Global loading fallback for lazy-loaded components
 */
const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-white">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#d82b2b]"></div>
  </div>
);
const LayoutWrapper = ({ layout: Layout }) => {
  if (!Layout) {
    return <Outlet />;
  }
  return <Layout />;
};

/**
 * Recursively render routes from config
 * Handles nested routes, layouts, and protection
 */
const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    const {
      path,
      element: Element,
      layout: Layout,
      protected: isProtected,
      allowedRoles,
      children,
    } = route;

    // If route has children, it's a parent route
    if (children && children.length > 0) {
      const parentElement = Layout ? (
        <LayoutWrapper layout={Layout} />
      ) : (
        <Outlet />
      );

      return (
        <Route
          key={path || index}
          path={path}
          element={
            isProtected ? (
              <ProtectedRoute allowedRoles={allowedRoles}>
                {parentElement}
              </ProtectedRoute>
            ) : (
              parentElement
            )
          }
        >
          {renderRoutes(children)}
        </Route>
      );
    }

    // Leaf route - has an element to render
    if (Element) {
      const routeElement = <Element />;

      return (
        <Route
          key={path || index}
          path={path}
          element={
            isProtected ? (
              <ProtectedRoute allowedRoles={allowedRoles}>
                {routeElement}
              </ProtectedRoute>
            ) : (
              routeElement
            )
          }
        />
      );
    }

    return null;
  });
};

/**
 * AppRoutes Component
 * Centralized routing based on routeConfig
 * Handles protection, layouts, and lazy loading automatically
 */
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>{renderRoutes(routeConfig)}</Routes>
    </Suspense>
  );
};

export default AppRoutes;
