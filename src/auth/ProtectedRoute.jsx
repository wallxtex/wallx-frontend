import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * Loading spinner component shown while auth state is resolving
 */
const AuthLoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Verifying authentication...</p>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  // Priority 1: Still loading auth state
  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  // Priority 2: Not authenticated at all
  if (!isAuthenticated) {
    // Redirect to login, preserving the attempted location
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  // Priority 3: Authenticated but wrong role
  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!role || !allowedRoles.includes(role)) {
      // User is logged in but doesn't have the required role
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Priority 4: All checks passed - render children
  return children;
};

export default ProtectedRoute;
