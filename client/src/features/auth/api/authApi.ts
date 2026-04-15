import axiosInstance from "../../../api/axiosInstance";

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
}

export type AuthResponse = User & {
  token: string;
};

export const login = async (data: any): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const register = async (data: any): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const getProfile = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};
