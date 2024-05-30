import axios from "axios";
import { toast } from "react-hot-toast";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    // "content-type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
    config.headers.authorization = accessToken;
    return config;
  },
  (error) => {
    return error;
  }
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;

    if (data.notify) toast.success(data?.message ?? "success");
    return response;
  },
  (error) => {
    const { response } = error;

    if (response.status === 401 && response.data.notify) {
      toast.error(`${response?.data?.message}`);
    }
    else
    if (response.data.notify) {
      toast.error(response?.data?.message);
    }

    if (response.status === 401) {
      const user = localStorage.getItem("user");
      if (user) {
        localStorage.clear();
        setTimeout(() => {
          window.location.replace(`${window.location.origin}/`);
        }, 1500);
      }
    }
    return error;
  }
);

export default instance;
