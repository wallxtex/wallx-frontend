import { ROLES } from "./roles";
import { tokenStorage } from "../helpers/handlers/tokenStorage";

export const getRoleFromToken = (token) => {
  if (!token) return null;
  const { valid, payload } = tokenStorage.getPayload(token);
  if (!valid || !payload) {
    return null;
  }
  const role = payload.role || payload.userRole || payload.type;
  if (!role || typeof role !== "string") {
    return null;
  }
  return role;
};

export const isValidSession = (token) => {
  if (!token || typeof token !== "string") {
    return false;
  }

  const { valid, payload } = tokenStorage.getPayload(token);
  if (!valid || !payload) {
    return false;
  }
  const role = payload.role || payload.userRole || payload.type;
  if (!role) {
    return false;
  }
  const validRoles = Object.values(ROLES);
  return validRoles.includes(role);
};
export const getTokenExpiry = (token) => {
  if (!token) return null;
  const { valid, payload } = tokenStorage.getPayload(token);
  if (!valid || !payload || !payload.exp) {
    return null;
  }
  return new Date(payload.exp * 1000);
};

export const getCurrentToken = () => {
  const token = tokenStorage.getToken();
  if (!token) {
    return null;
  }
  // Check if token structure is valid (not checking expiry)
  const { valid, payload } = tokenStorage.getPayload(token);
  if (!valid || !payload) {
    console.warn('[TokenUtils] Invalid token structure, clearing');
    tokenStorage.removeToken();
    localStorage.removeItem('refreshToken');
    return null;
  }
  return token;
};

export const storeToken = (token) => {
  if (!token) {
    console.error("Attempted to store null/undefined token");
    return false;
  }
  const { valid, payload } = tokenStorage.getPayload(token);
  
  if (!valid || !payload) {
    console.error("Attempted to store invalid/corrupted token");
    return false;
  }

  tokenStorage.setToken(token);
  return tokenStorage.hasToken(); // Verify it was stored
};

export const clearToken = () => {
  tokenStorage.removeToken();
  localStorage.removeItem('refreshToken');
};
