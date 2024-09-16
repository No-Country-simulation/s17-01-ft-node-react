import { LoginResponse } from "@/lib/types/api/auth";
import api from "../axios"

export const login = async(data: {email: string, password: string}): Promise<LoginResponse>=> {
  const response = await api.post<LoginResponse>("auth/login", data)
  return response.data;
}