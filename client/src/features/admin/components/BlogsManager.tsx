import React, { useState } from "react";
import {
  useBlogs,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
} from "../../blogs/hooks/useBlogs";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Upload,
  Save,
  CheckCircle,
  Calendar,
} from "lucide-react";

const BlogsManager: React.FC = () => {
  const { data: blogs, isLoading } = useBlogs();
  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();
  const deleteMutation = useDeleteBlog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    fullContent: "",
    category: "Health",
    tags: "",
    isFeatured: false,
    quote: "",
    quoteAuthor: "",
    quoteAuthorRole: "",
    points: "",
    holisticTitle: "",
    holisticContent: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOpenModal = (blog?: any) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        summary: blog.summary || "",
        fullContent: blog.fullContent || "",
        category: blog.category || "Health",
        tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
        isFeatured: blog.isFeatured || false,
        quote: blog.quote || "",
        quoteAuthor: blog.quoteAuthor || "",
        quoteAuthorRole: blog.quoteAuthorRole || "",
        points: Array.isArray(blog.points)
          ? blog.points.join(", ")
          : blog.points || "",
        holisticTitle: blog.holisticTitle || "",
        holisticContent: blog.holisticContent || "",
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        summary: "",
        fullContent: "",
        category: "Health",
        tags: "",
        isFeatured: false,
        quote: "",
        quoteAuthor: "",
        quoteAuthorRole: "",
        points: "",
        holisticTitle: "",
        holisticContent: "",
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "tags" || key === "points") {
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

    if (editingBlog) {
      updateMutation.mutate(
        { id: editingBlog._id, data },
        {
          onSuccess: () => setIsModalOpen(false),
        },
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
        <p className="text-gray-400 font-semibold">Loading blogs...</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-100">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A]">Manage Blogs</h3>
          <p className="text-xs sm:text-sm text-gray-400 font-semibold mt-1">
            {blogs?.length || 0} blog posts
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#00A78E] hover:bg-[#008F7A] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold flex items-center transition-all duration-300 shadow-lg shadow-[#00A78E]/20 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="mr-2" size={18} />
          Add Blog
        </button>
      </div>

      {/* Error Message */}
      {(createMutation.error || updateMutation.error || deleteMutation.error) && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-500 text-sm">
          <p className="font-bold">Error:</p>
          <p>{(createMutation.error as any)?.message || (updateMutation.error as any)?.message || (deleteMutation.error as any)?.message || 'Something went wrong'}</p>
        </div>
      )}

      {/* Blogs List */}
      <div className="space-y-3 sm:space-y-4">
        {blogs?.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-400 font-semibold">No blogs yet. Create your first blog!</p>
          </div>
        )}
        {blogs?.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 flex items-center space-x-4 sm:space-x-6 group hover:shadow-lg transition-all duration-300"
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-1">
                <span className="text-[10px] sm:text-xs font-semibold text-[#00A78E] uppercase tracking-wider flex items-center">
                  <Calendar size={10} className="mr-1" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                {blog.isFeatured && (
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#C1FF72] text-[#1A1A1A] text-[10px] font-semibold rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
              <h4 className="text-sm sm:text-xl font-semibold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors line-clamp-1">
                {blog.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1 line-clamp-1 hidden sm:block">
                {blog.summary || blog.content?.substring(0, 100) + '...'}
              </p>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => handleOpenModal(blog)}
                className="p-2 sm:p-4 text-[#00A78E] hover:bg-[#00A78E]/5 rounded-xl transition-all"
                disabled={updateMutation.isPending}
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this blog?"))
                    deleteMutation.mutate(blog._id);
                }}
                className="p-2 sm:p-4 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                disabled={deleteMutation.isPending}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500 flex flex-col">
            <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A]">
                  {editingBlog ? "Edit Blog" : "Add New Blog"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-semibold mt-1">
                  {editingBlog ? "Update blog details" : "Create a new blog post"}
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
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                    placeholder="Enter blog title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Category
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      placeholder="e.g. Health, Lifestyle"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                      placeholder="e.g. Medical, News"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Summary (for Grid)
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.summary}
                    onChange={(e) =>
                      setFormData({ ...formData, summary: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all resize-none"
                    placeholder="Enter short blog summary"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Full Content (for Detail Page)
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.fullContent}
                    onChange={(e) =>
                      setFormData({ ...formData, fullContent: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-gray-50 rounded-[32px] border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all resize-none"
                    placeholder="Enter full blog post content"
                  ></textarea>
                </div>

                <div className="bg-gray-50 rounded-[32px] p-8 space-y-6">
                  <h4 className="text-lg font-semibold text-[#1A1A1A] border-b border-gray-100 pb-4">
                    Quote Section
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                        Quote Text
                      </label>
                      <textarea
                        rows={3}
                        value={formData.quote}
                        onChange={(e) =>
                          setFormData({ ...formData, quote: e.target.value })
                        }
                        className="w-full px-8 py-5 bg-white rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all resize-none"
                        placeholder="Enter quote text"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                          Quote Author
                        </label>
                        <input
                          type="text"
                          value={formData.quoteAuthor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quoteAuthor: e.target.value,
                            })
                          }
                          className="w-full px-6 py-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                          placeholder="e.g. David Bekham"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                          Author Role
                        </label>
                        <input
                          type="text"
                          value={formData.quoteAuthorRole}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quoteAuthorRole: e.target.value,
                            })
                          }
                          className="w-full px-6 py-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                          placeholder="e.g. Brand Manager"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Key Points (comma separated)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.points}
                    onChange={(e) =>
                      setFormData({ ...formData, points: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all resize-none"
                    placeholder="e.g. Dental operations, Medical services, Expert Care"
                  ></textarea>
                </div>

                <div className="bg-gray-50 rounded-[32px] p-8 space-y-6">
                  <h4 className="text-lg font-semibold text-[#1A1A1A] border-b border-gray-100 pb-4">
                    Holistic Section
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                        Holistic Section Title
                      </label>
                      <input
                        type="text"
                        value={formData.holisticTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            holisticTitle: e.target.value,
                          })
                        }
                        className="w-full px-8 py-5 bg-white rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all"
                        placeholder="e.g. Holistic Health Consultations"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                        Holistic Section Content
                      </label>
                      <textarea
                        rows={4}
                        value={formData.holisticContent}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            holisticContent: e.target.value,
                          })
                        }
                        className="w-full px-8 py-5 bg-white rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-base outline-none transition-all resize-none"
                        placeholder="Enter holistic section details"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-5 h-5 accent-[#00A78E] rounded cursor-pointer"
                  />
                  <label
                    htmlFor="isFeatured"
                    className="text-sm font-semibold text-gray-600 cursor-pointer"
                  >
                    Mark as Featured Post
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-1">
                    Blog Image
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                      id="blog-image"
                    />
                    <label
                      htmlFor="blog-image"
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
                          <p className="font-semibold text-lg">Upload Blog Image</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-semibold hover:bg-gray-200 transition-all text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 px-6 py-3 bg-[#00A78E] text-white rounded-xl font-semibold hover:bg-[#008F7A] transition-all shadow-lg shadow-[#00A78E]/20 flex items-center justify-center disabled:opacity-50 text-sm sm:text-base"
                >
                  <Save className="mr-2" size={18} />
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingBlog
                      ? "Update Blog"
                      : "Save Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsManager;
