import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  deleteUser,
  getAppointments,
  cancelAppointment,
  getAllAvailabilities,
  addAvailability,
  deleteAvailability,
  getDoctorAvailabilities,
} from "../api/adminApi";
import { toast } from "react-hot-toast";

// --- User Hooks ---
export const useUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: getUsers,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });
};

// --- Appointment Hooks ---
export const useAppointments = (filters?: {
  doctorId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  visitType?: string;
}) => {
  return useQuery({
    queryKey: ['admin', 'appointments', filters],
    queryFn: () => getAppointments(filters),
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "appointments"] });
      toast.success("Appointment cancelled successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to cancel appointment",
      );
    },
  });
};

// --- Doctor Availability Hooks ---
export const useAvailabilities = () => {
  return useQuery({
    queryKey: ["admin", "availabilities"],
    queryFn: getAllAvailabilities,
  });
};

export const useDoctorAvailabilities = (doctorId: string) => {
  return useQuery({
    queryKey: ["admin", "availabilities", doctorId],
    queryFn: () => getDoctorAvailabilities(doctorId),
    enabled: !!doctorId,
  });
};

export const useAddAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "availabilities"] });
      toast.success("Doctor availability added successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to add availability",
      );
    },
  });
};

export const useDeleteAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "availabilities"] });
      toast.success("Doctor availability deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to delete availability",
      );
    },
  });
};
