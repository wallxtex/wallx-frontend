import { isValidToken } from "../../common/TokenFromat";
import { jwtDecode } from "jwt-decode";

const tokenStorage = {
  setToken: (token) => {
    if (token && isValidToken(token)) {
      try {
        localStorage.setItem("token", token);
      } catch (err) {
        console.error("Failed to store token:", err);
      }
    } else if (token) {
      console.warn("Invalid token format - not storing");
    }
  },
  getToken: () => {
    return localStorage.getItem("token");
  },
  removeToken: () => {
    try {
      localStorage.removeItem("token");
    } catch (er) {
      console.error("Failed to remove token:", err);
    }
  },
  hasToken: () => {
    return !!localStorage.getItem("token");
  },
  getPayload: (token) => {
    try {
      const payload = jwtDecode(token);
      return {
        valid: true,
        expired: Boolean(payload.exp && payload.exp * 1000 < Date.now()),
        payload,
      };
    } catch (er) {
      return {
        valid: false,
        expired: false,
        payload: null,
      };
    }
  },
};
export { tokenStorage };
