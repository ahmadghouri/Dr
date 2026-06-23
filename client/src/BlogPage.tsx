import { useEffect } from "react";
import PageHero from "./components/PageHero";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Plus,
  Phone,
  ChevronsRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "./features/blogs/hooks/useBlogs";

const BlogPage = () => {
  const navigate = useNavigate();
  const { data: blogs, isLoading } = useBlogs();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] pt-20">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="flex flex-col w-full min-h-screen font-semibold bg-[#F9FAFB] overflow-x-hidden">
      {/* <PageHero title="Latest Blog" breadcrumb="Blog" /> */}

      {/* Main Container Section */}
      <section className="py-10 lg:py-16 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row gap-10 w-full">
          
          {/* Left Side: Blog List */}
          <div className="w-full lg:w-[65%] space-y-6 sm:space-y-10">
            {blogs?.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl sm:rounded-[30px] p-4 sm:p-8 shadow-sm border border-gray-50 group w-full"
              >
                {/* Responsive Image Container */}
                <div className="relative rounded-[20px] sm:rounded-[25px] overflow-hidden mb-6 sm:mb-8 h-[240px] sm:h-[350px] md:h-[400px] w-full">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date Badge over image */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center space-x-2 shadow-lg">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A78E]" />
                    <span className="text-[#1A1A1A] font-semibold text-xs sm:text-sm">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="space-y-4 sm:space-y-6 px-1 sm:px-2">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A78E]" />
                      <span>By Admin</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#00A78E]/20 rounded-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00A78E] rounded-full"></div>
                      </div>
                      <span>{blog.category || "Medical"}</span>
                    </div>
                  </div>

                  {/* Dynamic Fluid Heading */}
                  <h3 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A] leading-tight group-hover:text-[#00A78E] transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <button
                    onClick={() => navigate(`/blog-details/${blog._id}`)}
                    className="border-2 border-gray-100 hover:border-[#00A78E] hover:bg-[#00A78E] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base text-[#1A1A1A] transition-all duration-300 flex items-center group/btn w-fit"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Pagination Container */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:space-x-3 pt-6 sm:pt-10">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold border-2 transition-all ${
                    num === 1
                      ? "bg-white border-[#00A78E] text-[#1A1A1A]"
                      : "bg-white border-gray-100 text-gray-400 hover:border-[#00A78E] hover:text-[#1A1A1A]"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next Page"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white border-2 border-gray-100 text-gray-400 hover:border-[#00A78E] hover:text-[#1A1A1A] transition-all"
              >
                <ChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Right Side: Sidebar Widgets Container */}
          <div className="w-full lg:w-[35%] space-y-6 sm:space-y-10">
            {/* Search Widget */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">
                  Search
                </h3>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-5 py-3.5 sm:py-4 bg-[#F9FAFB] rounded-full border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-semibold text-sm sm:text-base text-gray-700"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>

            {/* Category Widget */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">
                  Category
                </h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Serenity Med",
                  "Serenity Health Center",
                  "Unity Health Services",
                  "Revive Medical Care",
                  "Harmony Holistic Health",
                ].map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center justify-between group cursor-pointer border-b border-gray-50 pb-3 sm:pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-semibold text-sm sm:text-base text-gray-600 group-hover:text-[#00A78E] transition-colors">
                      {cat}
                    </span>
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 group-hover:text-[#00A78E] group-hover:rotate-90 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Post Widget */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">
                  Recent post
                </h3>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {[
                  "Building health communities A healthy tomorrow",
                  "Quality health, close to home Caring for",
                  "you every step of the way Revive Health Center",
                ].map((title, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 group cursor-pointer w-full"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={`https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop`}
                        className="w-full h-full object-cover"
                        alt="Blog Thumbs"
                      />
                    </div>
                    <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
                      <div className="flex items-center space-x-2 text-[10px] sm:text-[12px] font-semibold text-gray-400 uppercase">
                        <div className="w-1.5 h-1.5 bg-[#00A78E] rounded-full"></div>
                        <span>Category</span>
                      </div>
                      <h4 className="font-semibold text-[#1A1A1A] leading-tight group-hover:text-[#00A78E] transition-colors text-xs sm:text-sm line-clamp-2">
                        {title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support/Help Card Container */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50 text-center space-y-6 sm:space-y-8 w-full">
              <h3 className="text-lg sm:text-[22px] font-semibold text-[#1A1A1A]">
                Need Help? Call Us
              </h3>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C1FF72] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#C1FF72]/20">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#1A1A1A]" />
              </div>
              <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-xs mx-auto">
                Health care is a vital aspect of maintaining overall well-being,
                encompassing a range of services from preventive care
              </p>
              <h2 className="text-lg sm:text-[22px] font-semibold text-[#1A1A1A] tracking-wide">
                (+888) 178 456 765
              </h2>
            </div>

            {/* Tags Widget */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Ambience",
                  "Thrive Care",
                  "Life",
                  "Health",
                  "Creativity",
                  "Harmony",
                  "Care Plan",
                  "Best",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-gray-100 text-gray-400 font-semibold text-[11px] sm:text-xs hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all cursor-pointer whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default BlogPage;