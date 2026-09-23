import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ROLE_HOME_ROUTES } from '../utils/common/roles';

/**
 * Unauthorized Page
 * Shown when an authenticated user tries to access a route
 * they don't have permission for
 */
const Unauthorized = () => {
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const handleGoHome = () => {
    // Navigate to the appropriate home route for user's role
    const homeRoute = role ? ROLE_HOME_ROUTES[role] : '/';
    navigate(homeRoute, { replace: true });
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          You don't have permission to access this section. This area is restricted to users with different access levels.
        </p>

        {/* Role Info */}
        {role && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              You are currently logged in as: <span className="font-semibold capitalize">{role}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to My Dashboard
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Go Back
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 text-red-600 font-medium hover:text-red-700 transition-colors focus:outline-none"
          >
            Logout
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          If you believe you should have access to this area, please contact your administrator.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
