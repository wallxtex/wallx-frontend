import axios from "axios";
import getTokenForPrivateApi from "./helpers/getTokenForPrivateApi";

const PrivateApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // Automatically send cookies including refresh token
});

export default PrivateApi;