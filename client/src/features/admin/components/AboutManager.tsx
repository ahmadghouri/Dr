import React, { useState, useEffect } from 'react';
import { useAbout, useUpdateAbout } from '../../about/hooks/useAbout';
import { Save, Upload, CheckCircle, Info, TrendingUp, Zap } from 'lucide-react';

const AboutManager: React.FC = () => {
  const { data: about, isLoading } = useAbout();
  const updateMutation = useUpdateAbout();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stats: [{ label: '', value: '' }],
    features: [{ title: '', description: '' }]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (about) {
      setFormData({
        title: about.title || '',
        description: about.description || '',
        stats: about.stats || [{ label: '', value: '' }],
        features: about.features || [{ title: '', description: '' }]
      });
    }
  }, [about]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('stats', JSON.stringify(formData.stats));
    data.append('features', JSON.stringify(formData.features));
    if (imageFile) data.append('image', imageFile);

    updateMutation.mutate(data);
  };

  // FIXED: Avoid direct state mutation by properly spreading nested objects
  const updateStat = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newStats = prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      );
      return { ...prev, stats: newStats };
    });
  };

  // FIXED: Avoid direct state mutation by properly spreading nested objects
  const updateFeature = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newFeatures = prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      );
      return { ...prev, features: newFeatures };
    });
  };

  if (isLoading) return <div className="p-12 text-center text-gray-500 font-semibold">Loading about content...</div>;

  return (
    <div className="p-8 lg:p-12">
      {/* Error / Success Feedback placeholder if needed */}
      {updateMutation.error && (
        <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 text-red-500 text-sm font-semibold">
          Error: {(updateMutation.error as any)?.message || 'Failed to update content'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[#00A78E] mb-2">
                <Info size={24} />
                <h3 className="text-2xl font-semibold uppercase tracking-tight">Main Content</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest px-1">About Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest px-1">Description</label>
                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-8 py-5 bg-gray-50 rounded-[32px] border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[#00A78E] mb-2">
                <TrendingUp size={24} />
                <h3 className="text-2xl font-semibold uppercase tracking-tight">Statistics</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {formData.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col space-y-2">
                    <input
                      placeholder="Label (e.g. Happy Patients)"
                      value={stat.label}
                      onChange={(e) => updateStat(i, 'label', e.target.value)}
                      className="px-6 py-4 bg-gray-50 rounded-xl border-none text-sm font-semibold outline-none text-[#1A1A1A]"
                    />
                    <input
                      placeholder="Value (e.g. 10k+)"
                      value={stat.value}
                      onChange={(e) => updateStat(i, 'value', e.target.value)}
                      className="px-6 py-4 bg-gray-50 rounded-xl border-none text-sm font-semibold outline-none text-[#1A1A1A]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[#00A78E] mb-2">
                <Zap size={24} />
                <h3 className="text-2xl font-semibold uppercase tracking-tight">Key Features</h3>
              </div>
              {formData.features.map((feature, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-[32px] space-y-4">
                  <input
                    placeholder="Feature Title"
                    value={feature.title}
                    onChange={(e) => updateFeature(i, 'title', e.target.value)}
                    className="w-full px-6 py-4 bg-white rounded-xl border-none text-sm font-semibold outline-none text-[#1A1A1A]"
                  />
                  <textarea
                    placeholder="Feature Description"
                    rows={3}
                    value={feature.description}
                    onChange={(e) => updateFeature(i, 'description', e.target.value)}
                    className="w-full px-6 py-4 bg-white rounded-xl border-none text-sm font-semibold outline-none resize-none text-[#1A1A1A]"
                  ></textarea>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest px-1 block">About Image</label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="about-image"
                />
                <label
                  htmlFor="about-image"
                  className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] cursor-pointer hover:border-[#00A78E] transition-all duration-300 group"
                >
                  {imageFile ? (
                    <div className="flex flex-col items-center text-[#00A78E] space-y-2">
                      <CheckCircle size={40} />
                      <p className="font-semibold text-lg">{imageFile.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 group-hover:text-[#00A78E] space-y-2">
                      <Upload size={40} />
                      <p className="font-semibold text-lg">Update About Image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-gray-100">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="bg-[#00A78E] hover:bg-[#1A1A1A] text-white px-12 py-5 rounded-full font-semibold text-lg flex items-center transition-all duration-500 shadow-2xl shadow-[#00A78E]/20 disabled:opacity-50"
          >
            <Save className="mr-3" size={24} />
            {updateMutation.isPending ? 'Updating...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManager;