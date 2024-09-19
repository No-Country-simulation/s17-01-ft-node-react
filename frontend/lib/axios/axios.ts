import axios from "axios";
import { isAxiosError } from "axios";
import { useUserStore } from "@/store/userStore"; // Importa tu store o método de almacenamiento del token

export type errorResponseType = {
  status: string;
  message: string;
};

export const errorHandler = (error: any): errorResponseType => {
  console.log(error);
  if (isAxiosError(error) && error.response) {
    return { status: "error", message: error.response.data.payload };
  } else if (error instanceof Error) {
    return { status: "error", message: error.message };
  } else {
    return { status: "error", message: String(error) };
  }
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BASE_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const { token } = useUserStore.getState(); 
    console.log("Token:--->", token); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
