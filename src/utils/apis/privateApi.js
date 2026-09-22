import axios from "axios";
import handleApiError from "../helpers/handlers/globalHandleApiError";
import { getApiToken } from "../helpers/constants/getApiToken";

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

PrivateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Use global error handler for all API errors
    handleApiError(error, {
      showToast: true,
      logError: true,
    });

    return Promise.reject(error);
  },
);

export default PrivateApi;
