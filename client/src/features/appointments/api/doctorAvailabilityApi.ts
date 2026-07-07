import axiosInstance from "../../../api/axiosInstance";

export interface DoctorAvailability {
  _id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getDoctorAvailabilities = async (
  doctorId: string,
): Promise<DoctorAvailability[]> => {
  const response = await axiosInstance.get(
    `/doctors/${doctorId}/availabilities`,
  );
  return response.data;
};
