import React, { useState } from "react";
import {
  useDoctors,
  useCreateDoctor,
  useUpdateDoctor,
  useDeleteDoctor,
} from "../../doctors/hooks/useDoctors";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Upload,
  Save,
  CheckCircle,
  Star,
} from "lucide-react";

const DoctorsManager: React.FC = () => {
  const { data: doctors, isLoading } = useDoctors();
  const createMutation = useCreateDoctor();
  const updateMutation = useUpdateDoctor();
  const deleteMutation = useDeleteDoctor();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    description: "",
    biography: "",
    education: "",
    experience: "",
    workingHours: "",
    specialization: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOpenModal = (doctor?: any) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData({
        name: doctor.name,
        expertise: doctor.expertise,
        description: doctor.description,
        biography: doctor.biography || "",
        education: Array.isArray(doctor.education)
          ? doctor.education.join(", ")
          : doctor.education || "",
        experience: Array.isArray(doctor.experience)
          ? doctor.experience.join(", ")
          : doctor.experience || "",
        workingHours: doctor.workingHours || "",
        specialization: Array.isArray(doctor.specialization)
          ? doctor.specialization.join(", ")
          : doctor.specialization || "",
      });
    } else {
      setEditingDoctor(null);
      setFormData({
        name: "",
        expertise: "",
        description: "",
        biography: "",
        education: "",
        experience: "",
        workingHours: "",
        specialization: "",
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (["education", "experience", "specialization"].includes(key)) {
        const arr = (value as string)
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i !== "");
        data.append(key, JSON.stringify(arr));
      } else {
        data.append(key, String(value));
      }
    });
    if (imageFile) data.append("image", imageFile);

    if (editingDoctor) {
      updateMutation.mutate(
        { id: editingDoctor._id, data },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingDoctor(null);
          },
        }
      );
    } else {
      if (!imageFile) return alert("Please select an image");
      createMutation.mutate(data, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-12 text-center">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 font-semibold">Loading doctors...</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-100">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A]">Manage Doctors</h3>
          <p className="text-xs sm:text-sm text-gray-400 font-semibold mt-1">
            {doctors?.length || 0} doctors
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#00A78E] hover:bg-[#008F7A] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center transition-all duration-300 shadow-lg shadow-[#00A78E]/20 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="mr-2" size={18} />
          Add Doctor
        </button>
      </div>

      {/* Error Message */}
      {(createMutation.error || updateMutation.error || deleteMutation.error) && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-500 text-sm">
          <p className="font-semibold">Error:</p>
          <p className="font-semibold">{(createMutation.error as any)?.message || (updateMutation.error as any)?.message || (deleteMutation.error as any)?.message || 'Something went wrong'}</p>
        </div>
      )}

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative">
        {doctors?.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl col-span-full">
            <p className="text-gray-400 font-semibold">No doctors yet. Add your first doctor!</p>
          </div>
        )}
        {doctors?.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 flex items-center space-x-4 sm:space-x-6 group hover:shadow-lg transition-all duration-300 relative"
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <span className="text-xs font-semibold text-[#00A78E] uppercase tracking-widest flex items-center">
                <Star size={12} className="mr-1 fill-[#00A78E]" />
                {doctor.expertise}
              </span>
              <h4 className="text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors">
                {doctor.name}
              </h4>
              <p className="text-gray-400 text-sm font-semibold line-clamp-2">
                {doctor.description}
              </p>
            </div>
            <div className="absolute top-6 right-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all z-10">
              <button
                onClick={() => handleOpenModal(doctor)}
                className="p-3 bg-white/90 backdrop-blur-sm text-[#00A78E] rounded-xl shadow-md hover:scale-110 transition-all"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Remove doctor?"))
                    deleteMutation.mutate(doctor._id);
                }}
                className="p-3 bg-white/90 backdrop-blur-sm text-red-400 hover:text-red-500 rounded-xl shadow-md hover:scale-110 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
            
            {/* Header */}
            <div className="p-8 flex justify-between items-center border-b border-gray-100 flex-shrink-0">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A]">
                {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-gray-100 rounded-full transition-all text-gray-400"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-8 space-y-6 overflow-y-auto flex-1 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      placeholder="Dr. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Expertise
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.expertise}
                      onChange={(e) =>
                        setFormData({ ...formData, expertise: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      placeholder="e.g. Cardiologist"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Short Bio (for Grid)
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all resize-none"
                    placeholder="Brief intro for the listing page"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Full Biography (for Detail Page)
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.biography}
                    onChange={(e) =>
                      setFormData({ ...formData, biography: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-gray-50 rounded-[24px] border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all resize-none"
                    placeholder="Enter full professional biography"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Education (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.education}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      placeholder="e.g. MD from Harvard, MBBS"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Experience (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      placeholder="e.g. 10 years at City Hospital"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={formData.workingHours}
                      onChange={(e) =>
                        setFormData({ ...formData, workingHours: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      placeholder="e.g. Mon-Fri, 9AM-5PM"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Specializations (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) =>
                        setFormData({ ...formData, specialization: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      placeholder="e.g. Surgery, Therapy"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Profile Photo
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                      id="doctor-image"
                    />
                    <label
                      htmlFor="doctor-image"
                      className="flex flex-col items-center justify-center w-full h-36 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[24px] cursor-pointer hover:border-[#00A78E] transition-all duration-300 group"
                    >
                      {imageFile ? (
                        <div className="flex flex-col items-center text-[#00A78E] space-y-1">
                          <CheckCircle size={32} />
                          <p className="font-semibold text-sm">{imageFile.name}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-400 group-hover:text-[#00A78E] space-y-1">
                          <Upload size={32} />
                          <p className="font-semibold text-sm">
                            {editingDoctor ? "Change Photo (Optional)" : "Upload Doctor Photo"}
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
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
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 px-6 py-4 bg-[#00A78E] text-white rounded-full font-semibold hover:bg-[#1A1A1A] transition-all shadow-xl shadow-[#00A78E]/20 flex items-center justify-center disabled:opacity-50 text-sm sm:text-base"
                >
                  <Save className="mr-2" size={18} />
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingDoctor
                      ? "Update Doctor"
                      : "Save Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsManager;