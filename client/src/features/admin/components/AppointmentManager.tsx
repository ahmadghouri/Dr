import React, { useState } from "react";
import { useAppointments, useCancelAppointment } from "../hooks/useAdmin";
import { useDoctors } from "../../doctors/hooks/useDoctors";
import {
  Calendar,
  Phone,
  Mail,
  User,
  XCircle,
  CheckCircle,
  Filter,
  X,
} from "lucide-react";

const AppointmentManager: React.FC = () => {
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const [filters, setFilters] = useState({
    doctorId: "",
    status: "",
    startDate: "",
    endDate: "",
    visitType: "",
  });
  const { data: appointments, isLoading } = useAppointments({
    doctorId: filters.doctorId || undefined,
    status: filters.status || undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
    visitType: filters.visitType || undefined,
  });
  const cancelMutation = useCancelAppointment();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading)
    return (
      <div className="p-12 text-center">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 font-semibold">Loading appointments...</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-100">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A]">
            Manage Appointments
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-semibold mt-1">
            {appointments?.length || 0} total appointments
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <Filter size={20} className="text-[#00A78E]" />
          <h4 className="font-semibold text-[#1A1A1A]">Filters</h4>
          {(filters.doctorId ||
            filters.status ||
            filters.startDate ||
            filters.endDate ||
            filters.visitType) && (
            <button
              onClick={() =>
                setFilters({
                  doctorId: "",
                  status: "",
                  startDate: "",
                  endDate: "",
                  visitType: "",
                })
              }
              className="ml-auto flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#00A78E]"
            >
              <X size={16} />
              Clear Filters
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Doctor Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Doctor
            </label>
            <select
              value={filters.doctorId}
              onChange={(e) =>
                setFilters({ ...filters, doctorId: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-sm outline-none"
              disabled={doctorsLoading}
            >
              <option value="">All Doctors</option>
              {doctors?.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-sm outline-none"
            >
              <option value="">All Status</option>
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Visit Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Visit Type
            </label>
            <select
              value={filters.visitType}
              onChange={(e) =>
                setFilters({ ...filters, visitType: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-sm outline-none"
            >
              <option value="">All Types</option>
              <option value="online">Online</option>
              <option value="physical">Physical</option>
            </select>
          </div>

          {/* Start Date Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-sm outline-none"
            />
          </div>

          {/* End Date Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {cancelMutation.error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-500 text-sm">
          <p className="font-semibold">Error:</p>
          <p className="font-semibold">
            {(cancelMutation.error as any)?.message || "Something went wrong"}
          </p>
        </div>
      )}

      {/* Appointments Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Patient
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Doctor
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Date & Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Visit Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <p className="text-gray-400 font-semibold">
                    No appointments yet.
                  </p>
                </td>
              </tr>
            )}
            {appointments?.map((appointment) => (
              <tr
                key={appointment._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#C1FF72]/30 flex items-center justify-center">
                      <User className="text-[#00A78E]" size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1A1A1A]">
                        {appointment.patientName}
                      </div>
                      <div className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                        <Mail size={12} /> {appointment.patientEmail}
                      </div>
                      <div className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                        <Phone size={12} /> {appointment.patientPhone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-[#1A1A1A]">
                    {!appointment.doctorId
                      ? "Doctor"
                      : typeof appointment.doctorId === "string"
                        ? "Doctor"
                        : appointment.doctorId.name}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold">
                    {appointment.serviceRequired}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1">
                    <Calendar size={14} className="text-[#00A78E]" />
                    {formatDate(appointment.startAt)}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold">
                    {formatTime(appointment.startAt)} -{" "}
                    {formatTime(appointment.endAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      appointment.visitType === "online"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-purple-50 text-purple-600"
                    }`}
                  >
                    {appointment.visitType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.status === "booked" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                      <CheckCircle size={12} className="mr-1" />
                      Booked
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-500">
                      <XCircle size={12} className="mr-1" />
                      Cancelled
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.status === "booked" && (
                    <button
                      onClick={() => {
                        if (window.confirm("Cancel this appointment?"))
                          cancelMutation.mutate(appointment._id);
                      }}
                      className="text-red-400 hover:text-red-500 font-semibold text-sm flex items-center gap-1"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManager;
