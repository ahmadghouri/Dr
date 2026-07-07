import { useMutation, useQuery } from "@tanstack/react-query";
import { bookAppointment, getDoctorSlots } from "../api/appointmentApi";
import type { BookAppointmentRequest } from "../api/appointmentApi";
import { toast } from "react-hot-toast";


import type { Slot } from "../api/appointmentApi";

export const useDoctorSlots = (doctorId: string, date: string) => {
  return useQuery<Slot[]>({
    queryKey: ["doctorSlots", doctorId, date],
    queryFn: () => getDoctorSlots(doctorId, date),
    enabled: Boolean(doctorId) && Boolean(date), 
    refetchInterval: 5000, 
    refetchIntervalInBackground: true,
  });
};


export const useBookAppointment = () => {
  return useMutation({
    mutationFn: (data: BookAppointmentRequest) => bookAppointment(data),
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to book appointment",
      );
    },
  });
};



// export const useDoctorSlots = (doctorId: string, date: string) => {
//   return useQuery({
//     queryKey: ["doctor-slots", doctorId, date],
//     queryFn: () => getDoctorSlots(doctorId, date),
//     enabled: !!doctorId && !!date,
//   });
// };
