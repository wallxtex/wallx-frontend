import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getRoleFromToken, getCurrentToken, storeToken, clearToken } from "../utils/common/tokenUtils";
import { tokenStorage } from "../utils/helpers/handlers/tokenStorage";

const AuthContext = createContext(null);
/**
 * Initialize auth state from localStorage
 * This runs synchronously to prevent flicker on page load
*/
const initializeAuth = () => {
  const token = getCurrentToken();
  if (!token) {
    return {
      token: null,
      role: null,
      isAuthenticated: false,
    };
  }
  // Token exists and structure is valid
  // Extract role (even if token is expired - getApiToken will refresh it)
  const role = getRoleFromToken(token);

  if (!role) {
    // Token has no valid role - clear it
    clearToken();
    return {
      token: null,
      role: null,
      isAuthenticated: false,
    };
  }

  return {
    token,
    role,
    isAuthenticated: true, // Keep user authenticated, token will auto-refresh
  };
};

/**
 * AuthProvider Component
 * Wraps the app and provides authentication context
 */
export const AuthProvider = ({ children }) => {
  // Lazy initialization - runs only once on mount, synchronously
  const [authState, setAuthState] = useState(() => ({
    ...initializeAuth(),
    isLoading: false,
  }));

  /**
   * Check and refresh token if expired on mount
   */
  useEffect(() => {
    const refreshTokenIfNeeded = async () => {
      const token = tokenStorage.getToken();
      
      if (!token) return;

      const { valid, expired, payload } = tokenStorage.getPayload(token);

      if (!valid || !payload) {
        console.warn('[AuthContext] Invalid token on mount, logging out');
        logout();
        return;
      }

      // If token is expired, refresh it
      if (expired) {
        console.log('[AuthContext] Token expired on mount, refreshing...');
        
        try {
          const role = payload.role || payload.userRole || payload.type;
          const refreshToken = localStorage.getItem('refreshToken');
          
          if (!refreshToken || !role) {
            console.error('[AuthContext] Missing refresh token or role');
            logout();
            return;
          }

          // Import refresh endpoints
          const refreshEndpoints = {
            dealer: "/auth/dealer/refresh-token",
            painter: "/auth/painter/refresh-token",
            admin: "/auth/admin/refresh-token",
          };

          const endpoint = refreshEndpoints[role];
          
          if (!endpoint) {
            console.error('[AuthContext] Invalid role for refresh');
            logout();
            return;
          }

          // Make refresh request (using fetch to avoid axios circular dependency)
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (!response.ok) {
            console.error('[AuthContext] Refresh failed:', response.status);
            logout();
            return;
          }

          const data = await response.json();
          const newToken = data?.data?.accessToken;
          const newRefreshToken = data?.data?.refreshToken;

          if (!newToken) {
            console.error('[AuthContext] No access token in refresh response');
            logout();
            return;
          }

          // Store new tokens
          tokenStorage.setToken(newToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          console.log('[AuthContext] Token refreshed successfully on mount');
          
          // Update state
          setAuthState({
            token: newToken,
            role,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('[AuthContext] Error refreshing token:', error);
          logout();
        }
      }
    };

    refreshTokenIfNeeded();
  }, []);

  /**
   * Login function - stores token and updates auth state
   * @param {string} token - JWT token from backend
   */
  const login = useCallback((token) => {
    if (!token || typeof token !== "string") {
      console.error("Invalid token provided to login");
      return;
    }

    // Validate and store token
    if (!storeToken(token)) {
      console.error("Failed to store invalid/expired token");
      return;
    }

    const role = getRoleFromToken(token);

    if (!role) {
      console.error("Token has no valid role claim");
      clearToken();
      return;
    }

    // Update state
    setAuthState({
      token,
      role,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  /**
   * Logout function - clears token and resets state
   */
  const logout = useCallback(() => {
    // Clear storage using tokenUtils
    clearToken();

    // Reset state
    setAuthState({
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  /**
   * Listen for storage events to sync auth state across tabs
   */
  useEffect(() => {
    const handleStorageChange = (event) => {
      // Only respond to changes to our token key
      if (event.key !== "token") {
        return;
      }

      const newToken = event.newValue;

      // Token was removed (logout in another tab)
      if (!newToken) {
        setAuthState({
          token: null,
          role: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      // Token was added/changed (login in another tab)
      // Check structure validity only (not expiry)
      const { valid, payload } = tokenStorage.getPayload(newToken);
      
      if (valid && payload) {
        const role = getRoleFromToken(newToken);
        if (role) {
          setAuthState({
            token: newToken,
            role,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          // Invalid role - clear tokens
          clearToken();
          setAuthState({
            token: null,
            role: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        // Invalid token was stored - clear it
        clearToken();
        setAuthState({
          token: null,
          role: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value = {
    token: authState.token,
    role: authState.role,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth hook - Access authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "useAuth must be used within an AuthProvider. " +
        "Make sure your component is wrapped with <AuthProvider>.",
    );
  }

  return context;
};
