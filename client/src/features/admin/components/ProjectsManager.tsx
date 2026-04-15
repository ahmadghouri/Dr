import React, { useState } from "react";
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../../projects/hooks/useProjects";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Upload,
  Save,
  CheckCircle,
} from "lucide-react";

const ProjectsManager: React.FC = () => {
  const { data: projects, isLoading } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    client: "",
    website: "",
    fullContent: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOpenModal = (project?: any) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        category: project.category,
        title: project.title,
        description: project.description || "",
        location: project.location || "",
        client: project.client || "",
        website: project.website || "",
        fullContent: project.fullContent || "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        category: "",
        title: "",
        description: "",
        location: "",
        client: "",
        website: "",
        fullContent: "",
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });
    if (imageFile) data.append("image", imageFile);

    if (editingProject) {
      updateMutation.mutate(
        { id: editingProject._id, data },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingProject(null);
            setFormData({ category: "", title: "", description: "", location: "", client: "", website: "", fullContent: "" });
            setImageFile(null);
          },
        },
      );
    } else {
      if (!imageFile) return alert("Please select an image");
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsModalOpen(false);
          setFormData({ category: "", title: "", description: "", location: "", client: "", website: "", fullContent: "" });
          setImageFile(null);
        },
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-12 text-center">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 font-medium">Loading projects...</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-100">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#1A1A1A]">Manage Projects</h3>
          <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
            {projects?.length || 0} projects
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#00A78E] hover:bg-[#008F7A] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold flex items-center transition-all duration-300 shadow-lg shadow-[#00A78E]/20 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="mr-2" size={18} />
          Add Project
        </button>
      </div>

      {/* Error Message */}
      {(createMutation.error || updateMutation.error || deleteMutation.error) && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-500 text-sm">
          <p className="font-bold">Error:</p>
          <p>{(createMutation.error as any)?.message || (updateMutation.error as any)?.message || (deleteMutation.error as any)?.message || 'Something went wrong'}</p>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {projects?.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl col-span-full">
            <p className="text-gray-400 font-medium">No projects yet. Create your first project!</p>
          </div>
        )}
        {projects?.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="p-2.5 bg-white text-[#00A78E] rounded-lg shadow-lg hover:scale-110 transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this project?"))
                      deleteMutation.mutate(project._id);
                  }}
                  className="p-2.5 bg-white text-red-500 rounded-lg shadow-lg hover:scale-110 transition-all"
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2 block">
                {project.category}
              </span>
              <h4 className="text-2xl font-black text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors">
                {project.title}
              </h4>
            </div>
            <button
              onClick={() => {
                if (window.confirm("Delete project?"))
                  deleteMutation.mutate(project._id);
              }}
              className="absolute top-6 right-6 p-4 bg-white/90 backdrop-blur-sm text-red-500 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-10 flex justify-between items-center border-b border-gray-100">
              <h3 className="text-3xl font-black text-[#1A1A1A]">
                Add New Project
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-gray-100 rounded-full transition-all text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">
                    Project Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all"
                    placeholder="e.g., Medical Care"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all"
                    placeholder="Enter project title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest px-1">
                    Short Description (for Grid)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all resize-none"
                    placeholder="Enter short description"
                  ></textarea>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-500 uppercase tracking-widest px-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-base outline-none transition-all"
                      placeholder="e.g. Dhaka"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-500 uppercase tracking-widest px-1">
                      Client
                    </label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-base outline-none transition-all"
                      placeholder="e.g. Jenny Wilson"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-500 uppercase tracking-widest px-1">
                      Website
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-base outline-none transition-all"
                      placeholder="e.g. www.Medizen.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest px-1">
                    Full Content (for Detail Page)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.fullContent}
                    onChange={(e) =>
                      setFormData({ ...formData, fullContent: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-gray-50 rounded-[32px] border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all resize-none"
                    placeholder="Enter full project details"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest px-1">
                    Project Image
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                      id="project-image"
                    />
                    <label
                      htmlFor="project-image"
                      className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] cursor-pointer hover:border-[#00A78E] transition-all duration-300 group"
                    >
                      {imageFile ? (
                        <div className="flex flex-col items-center text-[#00A78E] space-y-2">
                          <CheckCircle size={40} />
                          <p className="font-bold text-lg">{imageFile.name}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-400 group-hover:text-[#00A78E] space-y-2">
                          <Upload size={40} />
                          <p className="font-bold text-lg">
                            {editingProject
                              ? "Change Image (Optional)"
                              : "Upload Project Image"}
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-8 py-5 bg-gray-100 text-gray-500 rounded-full font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="flex-1 px-8 py-5 bg-[#00A78E] text-white rounded-full font-bold hover:bg-[#1A1A1A] transition-all shadow-xl shadow-[#00A78E]/20 flex items-center justify-center disabled:opacity-50"
                >
                  <Save className="mr-2" size={20} />
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
