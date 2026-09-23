import axios from "axios";
import { setupInterceptors } from "../../lib/notify";
import { getApiToken } from "../helpers/constants/getapiToken";

// private-api
const PrivateApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

PrivateApi.interceptors.request.use(
  async (config) => {
    const { data, success } = await getApiToken();
    config.headers = config.headers || {};
    config.headers["x-timezone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (success) {
      config.headers.Authorization = `Bearer ${data.token}`;
    } else {
      window.location.replace("/");
      throw new Error("No authentication token found");
    }
    return config;
  },
  (error) => {
    throw error;
  },
);

// Setup automatic toast notifications
setupInterceptors(PrivateApi, {
  dedupeWindow: 3000,
  toastOnQueryError: true,
  toastOnMutationSuccess: true,
  toastOnMutationError: true,
  onUnauthorized: async (error) => {
    console.log('401 detected in PrivateApi:', error);
    window.location.replace("/");
    return false;
  },
});

export default PrivateApi;
