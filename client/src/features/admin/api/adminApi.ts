import axiosInstance from "../../../api/axiosInstance";
import type { User } from "../../auth/api/authApi";
import type { Doctor } from "../../doctors/api/doctorApi";

// --- Appointment Types & API ---
export interface Appointment {
  _id: string;
  doctorId: Doctor | string;
  visitType: "online" | "physical";
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceRequired: string;
  startAt: string;
  endAt: string;
  status: "booked" | "cancelled";
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getAppointments = async (filters?: {
  doctorId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  visitType?: string;
}): Promise<Appointment[]> => {
  const params = new URLSearchParams();
  if (filters?.doctorId) params.append("doctorId", filters.doctorId);
  if (filters?.status) params.append("status", filters.status);
  if (filters?.visitType) params.append("visitType", filters.visitType);
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);
  const response = await axiosInstance.get("/appointments", { params });
  return response.data;
};

export const getDoctorAppointments = async (
  doctorId: string,
  date?: string,
): Promise<Appointment[]> => {
  const params = date ? { date } : {};
  const response = await axiosInstance.get(
    `/doctors/${doctorId}/appointments`,
    { params },
  );
  return response.data;
};

export const cancelAppointment = async (id: string): Promise<void> => {
  await axiosInstance.patch(`/appointments/${id}/cancel`);
};

// --- Doctor Availability Types & API ---
export interface DoctorAvailability {
  _id: string;
  doctorId: Doctor | string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const addAvailability = async (data: {
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration?: number;
}): Promise<DoctorAvailability> => {
  const response = await axiosInstance.post("/doctors/availability", data);
  return response.data.availability;
};

export const getAllAvailabilities = async (): Promise<DoctorAvailability[]> => {
  const response = await axiosInstance.get("/doctors/availabilities");
  return response.data;
};

export const getDoctorAvailabilities = async (
  doctorId: string,
): Promise<DoctorAvailability[]> => {
  const response = await axiosInstance.get(
    `/doctors/${doctorId}/availabilities`,
  );
  return response.data;
};

export const deleteAvailability = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/doctors/availability/${id}`);
};

// --- Existing User API ---
export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/admin/users/${id}`);
};
