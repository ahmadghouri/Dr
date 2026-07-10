import axiosInstance from "../../../api/axiosInstance";

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  iconBg?: string;
  image?: string;
  buttonBg?: string;
  buttonText?: string;
}

export const getServices = async (): Promise<Service[]> => {
  const response = await axiosInstance.get("/v1/content/services");
  return response.data;
};

export const getServiceById = async (id: string): Promise<Service> => {
  const response = await axiosInstance.get(`/v1/content/services/${id}`);
  return response.data;
};

export const createService = async (data: FormData): Promise<Service> => {
  const response = await axiosInstance.post("/v1/content/services", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateService = async (
  id: string,
  data: FormData,
): Promise<Service> => {
  const response = await axiosInstance.put(`/v1/content/services/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteService = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/content/services/${id}`);
};
