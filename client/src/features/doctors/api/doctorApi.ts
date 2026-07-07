import axiosInstance from "../../../api/axiosInstance";

export interface Doctor {
  _id: string;
  name: string;
  expertise: string;
  description: string;
  image: string;
  biography?: string;
  education?: string[];
  experience?: string[];
  workingHours?: string;
  specialization?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await axiosInstance.get('/content/doctors');
  return response.data;
};

export const getDoctorById = async (id: string): Promise<Doctor> => {
  const response = await axiosInstance.get(`/content/doctors/${id}`);
  return response.data;
};

export const createDoctor = async (data: FormData): Promise<Doctor> => {
  const response = await axiosInstance.post("/content/doctors", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateDoctor = async (id: string, data: FormData): Promise<Doctor> => {
  const response = await axiosInstance.put(`/content/doctors/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteDoctor = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/content/doctors/${id}`);
};
