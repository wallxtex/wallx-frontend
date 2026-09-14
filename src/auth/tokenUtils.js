import { jwtDecode } from "jwt-decode";
import { ROLES } from "./roles";

/**
 * Safely decode a JWT token
 * @param {string} token - JWT token string
 * @returns {object|null} Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    // Token is malformed or invalid
    console.warn("Failed to decode token:", error.message);
    return null;
  }
};

/**
 * Check if a decoded token payload has expired
 * @param {object} decodedPayload - Decoded JWT payload
 * @returns {boolean} True if expired or exp claim missing
 */
export const isTokenExpired = (decodedPayload) => {
  if (!decodedPayload || typeof decodedPayload !== "object") {
    return true;
  }

  const { exp } = decodedPayload;

  if (!exp || typeof exp !== "number") {
    // No expiry claim = treat as expired for security
    return true;
  }

  const currentTime = Date.now() / 1000; // Convert to seconds
  return exp < currentTime;
};

/**
 * Extract and validate role from token
 * @param {string} token - JWT token string
 * @returns {string|null} Role string if valid, null otherwise
 */
export const getRoleFromToken = (token) => {
  const decoded = decodeToken(token);

  if (!decoded) {
    return null;
  }

  if (isTokenExpired(decoded)) {
    return null;
  }

  // Check for role claim (adjust property name if your JWT uses different claim)
  const role = decoded.role || decoded.userRole || decoded.type;

  if (!role || typeof role !== "string") {
    return null;
  }

  return role;
};

/**
 * Validate if token represents a valid authenticated session
 * @param {string} token - JWT token string
 * @returns {boolean} True if token is valid, not expired, and has recognized role
 */
export const isValidSession = (token) => {
  if (!token || typeof token !== "string") {
    return false;
  }

  const decoded = decodeToken(token);

  if (!decoded) {
    return false;
  }

  if (isTokenExpired(decoded)) {
    return false;
  }

  const role = decoded.role || decoded.userRole || decoded.type;

  if (!role) {
    return false;
  }

  // Verify role is one of our recognized roles
  const validRoles = Object.values(ROLES);
  return validRoles.includes(role);
};

/**
 * Get token expiry time as Date object
 * @param {string} token - JWT token string
 * @returns {Date|null} Expiry date or null if invalid
 */
export const getTokenExpiry = (token) => {
  const decoded = decodeToken(token);

  if (!decoded || !decoded.exp) {
    return null;
  }

  return new Date(decoded.exp * 1000);
};
