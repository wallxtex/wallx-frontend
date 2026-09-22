import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getRoleFromToken, isValidSession, getCurrentToken, storeToken, clearToken } from "../utils/common/tokenUtils";

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

  // Token is valid - extract role
  const role = getRoleFromToken(token);

  return {
    token,
    role,
    isAuthenticated: true,
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
      if (isValidSession(newToken)) {
        const role = getRoleFromToken(newToken);
        setAuthState({
          token: newToken,
          role,
          isAuthenticated: true,
          isLoading: false,
        });
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
