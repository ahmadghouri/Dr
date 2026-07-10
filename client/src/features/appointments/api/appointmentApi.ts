import axiosInstance from "../../../api/axiosInstance";

export interface BookAppointmentRequest {
  doctorId: string;
  visitType: "online" | "physical";
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceRequired: string;
  date: string;
  time: string;
}

export interface Appointment {
  _id: string;
  doctorId: string;
  visitType: "online" | "physical";
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceRequired: string;
  startAt: string;
  endAt: string;
  status: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Slot {
  startAt: string;
  endAt: string;
  isBooked: boolean;
}

export const bookAppointment = async (
  data: BookAppointmentRequest,
): Promise<Appointment> => {
  const response = await axiosInstance.post("/appointments/book", data);
  return response.data;
};

export const getDoctorSlots = async (
  doctorId: string,
  date: string,
): Promise<Slot[]> => {
  const response = await axiosInstance.get(`/doctors/${doctorId}/slots`, {
    params: { date },
  });
  // Server returns { success: true, slots: [...] }, so extract the slots array
  return response.data.slots || response.data;
};
