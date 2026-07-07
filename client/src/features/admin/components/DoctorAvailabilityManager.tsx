import React, { useState } from "react";
import { useAvailabilities, useAddAvailability, useDeleteAvailability } from "../hooks/useAdmin";
import { useDoctors } from "../../doctors/hooks/useDoctors";
import { Plus, Trash2, X, Save, Clock } from "lucide-react";

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const DoctorAvailabilityManager: React.FC = () => {
  const { data: availabilities, isLoading: availabilitiesLoading } = useAvailabilities();
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const addMutation = useAddAvailability();
  const deleteMutation = useDeleteAvailability();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: "",
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "17:00",
    slotDuration: 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate({
      ...formData,
      dayOfWeek: Number(formData.dayOfWeek),
      slotDuration: Number(formData.slotDuration),
    }, {
      onSuccess: () => setIsModalOpen(false)
    });
  };

  const getDoctorName = (doctorId: any) => {
    if (typeof doctorId === 'string') {
      const doctor = doctors?.find(d => d._id === doctorId);
      return doctor?.name || 'Unknown Doctor';
    }
    return doctorId?.name || 'Unknown Doctor';
  };

  if (availabilitiesLoading || doctorsLoading)
    return (
      <div className="p-12 text-center">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 font-semibold">Loading...</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-100">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A]">Doctor Availability</h3>
          <p className="text-xs sm:text-sm text-gray-400 font-semibold mt-1">
            {availabilities?.length || 0} schedules
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00A78E] hover:bg-[#008F7A] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center transition-all duration-300 shadow-lg shadow-[#00A78E]/20 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="mr-2" size={18} />
          Add Schedule
        </button>
      </div>

      {/* Error Message */}
      {(addMutation.error || deleteMutation.error) && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-500 text-sm">
          <p className="font-semibold">Error:</p>
          <p className="font-semibold">{(addMutation.error as any)?.message || (deleteMutation.error as any)?.message || 'Something went wrong'}</p>
        </div>
      )}

      {/* Availability List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {availabilities?.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl col-span-full">
            <p className="text-gray-400 font-semibold">No schedules yet. Add availability for your doctors!</p>
          </div>
        )}
        {availabilities?.map((availability) => (
          <div
            key={availability._id}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-6 flex items-center justify-between group hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C1FF72]/30 flex items-center justify-center">
                <Clock className="text-[#00A78E]" size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#1A1A1A]">{getDoctorName(availability.doctorId)}</h4>
                <p className="text-sm font-semibold text-gray-400">
                  {days[availability.dayOfWeek]}, {availability.startTime} - {availability.endTime}
                </p>
                <p className="text-xs font-semibold text-gray-300">
                  Slot duration: {availability.slotDuration} mins
                </p>
              </div>
            </div>
            <button
              title="Delete Schedule"
              onClick={() => {
                if (window.confirm("Delete this schedule?"))
                  deleteMutation.mutate(availability._id);
              }}
              className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
            
            {/* Header */}
            <div className="p-8 flex justify-between items-center border-b border-gray-100 flex-shrink-0">
              <h3 className="text-2xl font-semibold text-[#1A1A1A]">
                Add Doctor Schedule
              </h3>
              <button
                title="Close Modal"
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-gray-100 rounded-full transition-all text-gray-400"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-8 space-y-6 overflow-y-auto flex-1 text-left">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Doctor
                  </label>
                  <select
                    title="Select a doctor"
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                    required
                  >
                    <option value="">Select a doctor</option>
                    {doctors?.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Day
                  </label>
                  <select
                    title="Select a day"
                    value={formData.dayOfWeek}
                    onChange={(e) => setFormData({ ...formData, dayOfWeek: Number(e.target.value) })}
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                  >
                    {days.map((day, index) => (
                      <option key={index} value={index}>{day}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Start Time
                    </label>
                    <input
                      title="Select a start time"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      End Time
                    </label>
                    <input
                      title="Select a end time"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Slot Duration (Minutes)
                  </label>
                  <input
                    title="Enter slot duration in minutes"
                    type="number"
                    min="5"
                    step="5"
                    value={formData.slotDuration}
                    onChange={(e) => setFormData({ ...formData, slotDuration: Number(e.target.value) })}
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-6 border-t border-gray-100 flex space-x-4 bg-white flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-500 rounded-full font-semibold hover:bg-gray-200 transition-all text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addMutation.isPending}
                  className="flex-1 px-6 py-4 bg-[#00A78E] text-white rounded-full font-semibold hover:bg-[#1A1A1A] transition-all shadow-xl shadow-[#00A78E]/20 flex items-center justify-center disabled:opacity-50 text-sm sm:text-base"
                >
                  <Save className="mr-2" size={18} />
                  {addMutation.isPending ? "Saving..." : "Save Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAvailabilityManager;
