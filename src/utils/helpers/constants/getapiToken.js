import { tokenStorage } from "../handlers/tokenStorage";
import ApiResponseMessage from "../../apis/apiresponseMessage";
import API from "../../apis/api";
import { refreshEndpoints } from "../../apis/endpoints/refreshEndPoint";
import toast from "react-hot-toast";

let refreshPromise = null;
function getRoleFromTokenPayload(token) {
  if (!token) return null;

  const { valid, payload } = tokenStorage.getPayload(token);

  if (!valid || !payload) return null;

  // Extract role from JWT payload
  const role = payload.role || payload.userRole || payload.type;

  return role || null;
}

async function refreshAccessToken(role) {
  const endpoint = refreshEndpoints[role];

  if (!endpoint) {
    toast.error(`Invalid role: ${role}. Cannot determine refresh endpoint.`)
  }

  // Use API (not PrivateApi) to prevent interceptor loop
  const response = await API.post(endpoint, null, {
    withCredentials: true,
  });

  const newToken = response.data?.data?.accessToken;

  if (!newToken) {
    throw new Error("Failed to refresh token - no accessToken in response");
  }

  return newToken;
}

export async function getApiToken() {
  try {
    const token = tokenStorage.getToken();
    // No token found
    if (!token) {
      return ApiResponseMessage.err({
        status: 401,
        message: "No token found",
        response: { data: { code: "NO_TOKEN" } },
      });
    }

    const { valid, expired } = tokenStorage.getPayload(token);
    if (!valid) {
      tokenStorage.removeToken();
      return ApiResponseMessage.err({
        status: 401,
        message: "Invalid token",
        response: { data: { code: "INVALID_TOKEN" } },
      });
    }

    // Token is valid and not expired - return it
    if (!expired) {
      return ApiResponseMessage.success({ token });
    }
    // Token expired - need to refresh
    // Extract role from expired token (still valid for reading payload)
    const role = getRoleFromTokenPayload(token);

    if (!role) {
      tokenStorage.removeToken();
      return ApiResponseMessage.err({
        status: 401,
        message: "Cannot determine user role from token",
        response: { data: { code: "NO_ROLE" } },
      });
    }

    // Check if a refresh is already in progress
    if (refreshPromise) {
      // Wait for the existing refresh to complete
      try {
        const newToken = await refreshPromise;
        return ApiResponseMessage.success({ token: newToken });
      } catch (error) {
        // Refresh failed, return error
        return ApiResponseMessage.err({
          status: 401,
          message: "Session expired. Please login again.",
          response: { data: { code: "SESSION_EXPIRED" } },
        });
      }
    }

    // Start a new refresh (first request to detect expiry)
    refreshPromise = (async () => {
      try {
        const newToken = await refreshAccessToken(role);

        // Store new token
        tokenStorage.setToken(newToken);

        return newToken;
      } catch (refreshError) {
        // Refresh failed - clear token
        tokenStorage.removeToken();
        throw refreshError;
      } finally {
        // Clear refresh promise when done
        refreshPromise = null;
      }
    })();

    try {
      const newToken = await refreshPromise;
      return ApiResponseMessage.success({ token: newToken });
    } catch (refreshError) {
      return ApiResponseMessage.err({
        status: 401,
        message: "Session expired. Please login again.",
        response: { data: { code: "SESSION_EXPIRED" } },
      });
    }
  } catch (err) {
    // Clear refresh promise on unexpected error
    refreshPromise = null;
    return ApiResponseMessage.err(err);
  }
}

