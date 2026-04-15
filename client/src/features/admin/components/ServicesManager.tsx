import React, { useState } from "react";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "../../services/hooks/useServices";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Save,
  CheckCircle,
} from "lucide-react";

const ServicesManager: React.FC = () => {
  const { data: services, isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    features: "",
    benefits: "",
    icon: "Stethoscope",
    iconBg: "bg-[#C1FF72]",
    buttonBg: "bg-[#00A78E]",
    buttonText: "text-white",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOpenModal = (service?: any) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        detailedDescription: service.detailedDescription || "",
        features: Array.isArray(service.features)
          ? service.features.join(", ")
          : service.features || "",
        benefits: Array.isArray(service.benefits)
          ? service.benefits.join(", ")
          : service.benefits || "",
        icon: service.icon || "Stethoscope",
        iconBg: service.iconBg || "bg-[#C1FF72]",
        buttonBg: service.buttonBg || "bg-[#00A78E]",
        buttonText: service.buttonText || "text-white",
      });
    } else {
      setEditingService(null);
      setFormData({
        title: "",
        description: "",
        detailedDescription: "",
        features: "",
        benefits: "",
        icon: "Stethoscope",
        iconBg: "bg-[#C1FF72]",
        buttonBg: "bg-[#00A78E]",
        buttonText: "text-white",
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (["features", "benefits"].includes(key)) {
        const arr = (value as string)
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i !== "");
        data.append(key, JSON.stringify(arr));
      } else {
        data.append(key, value as string);
      }
    });
    if (imageFile) data.append("image", imageFile);

    if (editingService) {
      updateMutation.mutate(
        { id: editingService._id, data },
        {
          onSuccess: () => setIsModalOpen(false),
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-12 text-center text-gray-500 font-bold">
        Loading services...
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-100">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#1A1A1A]">All Services</h3>
          <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">Manage and organize your healthcare services</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#00A78E] hover:bg-[#008F7A] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold flex items-center transition-all duration-300 shadow-lg shadow-[#00A78E]/20 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="mr-2" size={18} />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services?.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-lg transition-all duration-300"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={() => handleOpenModal(service)}
                  className="p-2.5 bg-white text-[#00A78E] rounded-lg shadow-lg hover:scale-110 transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete service?"))
                      deleteMutation.mutate(service._id);
                  }}
                  className="p-2.5 bg-white text-red-500 rounded-lg shadow-lg hover:scale-110 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <h4 className="text-lg font-black text-[#1A1A1A] mb-2">
                {service.title}
              </h4>
              <p className="text-gray-400 font-medium text-sm line-clamp-2">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500 flex flex-col">
            <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#1A1A1A]">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
                  {editingService ? "Update service details" : "Create a new healthcare service"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-xl transition-all text-gray-400 hover:text-[#1A1A1A] flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-5 overflow-y-auto"
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00A78E] focus:ring-2 focus:ring-[#00A78E]/20 text-[#1A1A1A] font-bold text-sm outline-none transition-all"
                    placeholder="Enter service title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    Short Description
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00A78E] focus:ring-2 focus:ring-[#00A78E]/20 text-[#1A1A1A] font-bold text-sm outline-none transition-all resize-none"
                    placeholder="Enter short description"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        detailedDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00A78E] focus:ring-2 focus:ring-[#00A78E]/20 text-[#1A1A1A] font-bold text-sm outline-none transition-all resize-none"
                    placeholder="Enter full detailed description"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                      Key Features
                    </label>
                    <input
                      type="text"
                      value={formData.features}
                      onChange={(e) =>
                        setFormData({ ...formData, features: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00A78E] focus:ring-2 focus:ring-[#00A78E]/20 text-[#1A1A1A] font-bold text-sm outline-none transition-all"
                      placeholder="Comma separated"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                      Benefits
                    </label>
                    <input
                      type="text"
                      value={formData.benefits}
                      onChange={(e) =>
                        setFormData({ ...formData, benefits: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00A78E] focus:ring-2 focus:ring-[#00A78E]/20 text-[#1A1A1A] font-bold text-sm outline-none transition-all"
                      placeholder="Comma separated"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    Service Image
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                      id="service-image"
                    />
                    <label
                      htmlFor="service-image"
                      className="flex flex-col items-center justify-center w-full h-36 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#00A78E] hover:bg-[#00A78E]/5 transition-all duration-300 group"
                    >
                      {imageFile ? (
                        <div className="flex flex-col items-center text-[#00A78E] space-y-2">
                          <CheckCircle size={32} />
                          <p className="font-bold text-sm">{imageFile.name}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-400 group-hover:text-[#00A78E] space-y-2">
                          <Upload size={32} />
                          <p className="font-bold text-sm">
                            {editingService
                              ? "Change Image"
                              : "Upload Image"}
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                      Icon Name
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00A78E] focus:ring-2 focus:ring-[#00A78E]/20 text-[#1A1A1A] font-bold text-sm outline-none transition-all"
                      placeholder="e.g. Stethoscope"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                      Icon Color
                    </label>
                    <input
                      type="text"
                      value={formData.iconBg}
                      onChange={(e) =>
                        setFormData({ ...formData, iconBg: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00A78E] focus:ring-2 focus:ring-[#00A78E]/20 text-[#1A1A1A] font-bold text-sm outline-none transition-all"
                      placeholder="e.g. bg-[#C1FF72]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="flex-1 px-6 py-3 bg-[#00A78E] text-white rounded-xl font-bold hover:bg-[#008F7A] transition-all shadow-lg shadow-[#00A78E]/20 flex items-center justify-center disabled:opacity-50"
                >
                  <Save className="mr-2" size={18} />
                  {editingService ? "Update Service" : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
