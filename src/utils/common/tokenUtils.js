import { ROLES } from "./roles";
import { tokenStorage } from "../helpers/handlers/tokenStorage";

export const getRoleFromToken = (token) => {
  if (!token) return null;

  const { valid, expired, payload } = tokenStorage.getPayload(token);

  if (!valid || expired || !payload) {
    return null;
  }

  // Check for role claim (adjust property name if your JWT uses different claim)
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

  const { valid, expired, payload } = tokenStorage.getPayload(token);

  if (!valid || expired || !payload) {
    return false;
  }

  const role = payload.role || payload.userRole || payload.type;

  if (!role) {
    return false;
  }

  // Verify role is one of our recognized roles
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

  if (!isValidSession(token)) {
    // Token is invalid/expired - clear it
    tokenStorage.removeToken();
    return null;
  }

  return token;
};

export const storeToken = (token) => {
  if (!token || !isValidSession(token)) {
    console.error("Attempted to store invalid token");
    return false;
  }

  tokenStorage.setToken(token);
  return tokenStorage.hasToken(); // Verify it was stored
};

export const clearToken = () => {
  tokenStorage.removeToken();
};
