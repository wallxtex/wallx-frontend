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
    console.error(
      `[AUTH] Invalid role: ${role}. Cannot determine refresh endpoint.`,
    );
    toast.error(`Invalid role: ${role}. Cannot determine refresh endpoint.`);
    throw new Error(`Invalid role: ${role}`);
  }

  console.log(
    `[AUTH] Attempting to refresh token for role: ${role} at endpoint: ${endpoint}`,
  );

  try {
    // Get current refresh token from localStorage as fallback
    const storedRefreshToken = localStorage.getItem("refreshToken");

    // Send refresh token in both cookie (withCredentials) AND body for reliability
    const response = await API.post(
      endpoint,
      storedRefreshToken ? { refreshToken: storedRefreshToken } : null,
      {
        withCredentials: true, // Send cookies
        toast: false, // Disable automatic toast for refresh requests
      },
    );

    const newToken = response.data?.data?.accessToken;
    const newRefreshToken = response.data?.data?.refreshToken;

    if (!newToken) {
      console.error(
        "[AUTH] Refresh response missing accessToken:",
        response.data,
      );
      throw new Error("Failed to refresh token - no accessToken in response");
    }

    // Store new refresh token if provided
    if (newRefreshToken) {
      localStorage.setItem("refreshToken", newRefreshToken);
      console.log("[AUTH] New refresh token stored");
    }

    console.log("[AUTH] Token refresh successful");
    return newToken;
  } catch (error) {
    console.error("[AUTH] Token refresh failed:", error.message);
    throw error;
  }
}

export async function getApiToken() {
  try {
    const token = tokenStorage.getToken();

    // No token found
    if (!token) {
      console.warn("[AUTH] No token found in storage");
      return ApiResponseMessage.err({
        status: 401,
        message: "No token found",
        response: { data: { code: "NO_TOKEN" } },
      });
    }

    const { valid, expired, payload } = tokenStorage.getPayload(token);

    if (!valid) {
      console.warn("[AUTH] Invalid token detected, removing from storage");
      tokenStorage.removeToken();
      localStorage.removeItem("refreshToken");
      return ApiResponseMessage.err({
        status: 401,
        message: "Invalid token",
        response: { data: { code: "INVALID_TOKEN" } },
      });
    }

    // Token is valid and not expired - return it
    if (!expired) {
      console.log("[AUTH] Token is valid and not expired");
      return ApiResponseMessage.success({ token });
    }

    console.log("[AUTH] Token expired, initiating refresh...");

    // Token expired - need to refresh
    // Extract role from expired token (still valid for reading payload)
    const role = getRoleFromTokenPayload(token);

    if (!role) {
      console.error(
        "[AUTH] Cannot determine user role from token payload:",
        payload,
      );
      tokenStorage.removeToken();
      localStorage.removeItem("refreshToken");
      return ApiResponseMessage.err({
        status: 401,
        message: "Cannot determine user role from token",
        response: { data: { code: "NO_ROLE" } },
      });
    }

    // Check if a refresh is already in progress
    if (refreshPromise) {
      console.log("[AUTH] Refresh already in progress, waiting...");
      // Wait for the existing refresh to complete
      try {
        const newToken = await refreshPromise;
        console.log("[AUTH] Received token from in-flight refresh");
        return ApiResponseMessage.success({ token: newToken });
      } catch (error) {
        console.error("[AUTH] In-flight refresh failed:", error.message);
        // Refresh failed, return error
        return ApiResponseMessage.err({
          status: 401,
          message: "Session expired. Please login again.",
          response: { data: { code: "SESSION_EXPIRED" } },
        });
      }
    }

    // Start a new refresh (first request to detect expiry)
    console.log(`[AUTH] Starting new refresh for role: ${role}`);
    refreshPromise = (async () => {
      try {
        const newToken = await refreshAccessToken(role);

        // Store new token
        tokenStorage.setToken(newToken);
        console.log("[AUTH] New access token stored successfully");

        return newToken;
      } catch (refreshError) {
        console.error(
          "[AUTH] Refresh failed, clearing tokens:",
          refreshError.message,
        );
        // Refresh failed - clear token
        tokenStorage.removeToken();
        localStorage.removeItem("refreshToken");
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
      console.error("[AUTH] Token refresh failed, user needs to re-login");
      return ApiResponseMessage.err({
        status: 401,
        message: "Session expired. Please login again.",
        response: { data: { code: "SESSION_EXPIRED" } },
      });
    }
  } catch (err) {
    console.error("[AUTH] Unexpected error in getApiToken:", err);
    // Clear refresh promise on unexpected error
    refreshPromise = null;
    return ApiResponseMessage.err(err);
  }
}
