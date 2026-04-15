import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHero from "./components/PageHero";
import { useBlog, useBlogs } from "./features/blogs/hooks/useBlogs";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  Search,
  Plus,
  Phone,
  Quote,
  ChevronsRight,
  ArrowRight,
} from "lucide-react";

const BlogDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: blog, isLoading, error } = useBlog(id || "");
  const { data: allBlogs } = useBlogs();
  const recentBlogs = allBlogs?.filter((b) => b._id !== id).slice(0, 3) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="w-12 h-12 border-4 border-[#00A78E] border-t-[#C1FF72] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center space-y-4 max-w-md px-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-[#1A1A1A]">Blog not found</h2>
          <p className="text-gray-500">
            The blog post you are looking for does not exist or has been removed.
          </p>
          {error && (
            <p className="text-red-400 text-sm bg-red-50 p-3 rounded-xl">
              Error: {(error as any)?.message || 'Failed to load blog'}
            </p>
          )}
          <button 
            onClick={() => navigate('/blog')}
            className="mt-4 bg-[#00A78E] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#008F7A] transition-all"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9FAFB]">
      <PageHero title="Blog Details" breadcrumb="Blog Details" />

      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side: Blog Content */}
          <div className="lg:w-[65%] space-y-10">
            {/* Blog Title & Meta */}
            <div className="space-y-6">
              <h2 className="text-[42px] md:text-[52px] font-black text-[#1A1A1A] leading-tight">
                {blog.title}
              </h2>
              <div className="flex flex-wrap items-center gap-6 text-gray-400 font-bold text-sm uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#00A78E]" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#00A78E]" />
                  <span>By Admin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#00A78E]/20 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#00A78E] rounded-full"></div>
                  </div>
                  <span>{blog.category || "Medical"}</span>
                </div>
              </div>
              <p className="text-gray-500 text-lg leading-relaxed">
                {blog.summary}
              </p>
            </div>

            {/* Main Blog Image */}
            <div className="rounded-[40px] overflow-hidden shadow-2xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Body Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-wrap">
                  {blog.fullContent || blog.summary}
                </p>
              </div>

              {/* Quote Section */}
              {blog.quote && (
                <div className="bg-white p-10 md:p-12 rounded-[30px] border border-gray-100 relative overflow-hidden flex items-start space-x-6 shadow-sm">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#F4F9F8] rounded-full flex items-center justify-center">
                      <Quote className="w-8 h-8 text-[#00A78E] opacity-40" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[18px] md:text-[20px] font-bold text-gray-600 leading-relaxed italic">
                      {blog.quote}
                    </p>
                    {(blog.quoteAuthor || blog.quoteAuthorRole) && (
                      <div>
                        <h4 className="font-black text-[#1A1A1A] text-lg">
                          {blog.quoteAuthor}
                        </h4>
                        <p className="text-gray-400 font-bold text-sm uppercase">
                          {blog.quoteAuthorRole}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Points List */}
              {blog.points && blog.points.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-[28px] font-black text-[#1A1A1A]">
                    Key Points
                  </h3>
                  <ul className="space-y-4">
                    {blog.points.map((point: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-center space-x-3 text-gray-500 font-bold text-lg"
                      >
                        <ChevronsRight className="w-5 h-5 text-[#00A78E] flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Holistic Section */}
              {blog.holisticTitle && (
                <div className="space-y-4">
                  <h3 className="text-[28px] font-black text-[#1A1A1A]">
                    {blog.holisticTitle}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-wrap">
                    {blog.holisticContent}
                  </p>
                </div>
              )}
            </div>

            {/* Tags & Socials Row */}
            <div className="flex flex-col md:flex-row items-center justify-between py-10 border-t border-b border-gray-100 mt-16 space-y-6 md:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="font-black text-[#1A1A1A] text-xl">Tags:</span>
                <div className="flex items-center space-x-2">
                  {blog.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-5 py-2 rounded-full border border-gray-100 text-gray-400 font-bold text-xs hover:bg-[#00A78E] hover:text-white transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white transition-all cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Unity Health Services Section (Comments) */}
            <div className="space-y-10 pt-10">
              <h3 className="text-[32px] font-black text-[#1A1A1A]">
                Unity Health Services
              </h3>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-8 rounded-[30px] border border-gray-50 flex items-start space-x-6 relative"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-[#1A1A1A] text-xl">
                          Theresa Webb
                        </h4>
                        <button className="bg-[#C1FF72] text-[#1A1A1A] px-6 py-2 rounded-full font-black text-sm hover:bg-[#00A78E] hover:text-white transition-all">
                          Reply
                        </button>
                      </div>
                      <p className="text-gray-400 font-bold text-sm">
                        August 13, 2023 at 8:30 PM
                      </p>
                      <p className="text-gray-500 leading-relaxed">
                        Medical services are an essential part of our lives,
                        offering care and treatment for various health
                        conditions. These services encompass a wide range of
                        specialties, including primary.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Message Form */}
            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-sm border border-gray-50 space-y-10">
              <h3 className="text-[32px] font-black text-[#1A1A1A]">
                Write Your Message
              </h3>
              <form className="space-y-6">
                <textarea
                  placeholder="Message here..."
                  rows={6}
                  className="w-full px-8 py-6 bg-[#F9FAFB] rounded-[30px] border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-bold text-gray-700 resize-none"
                ></textarea>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-bold text-gray-700"
                  />
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-bold text-gray-700"
                    />
                    <Send className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00A78E] opacity-40" />
                  </div>
                </div>
                <button className="bg-[#00A78E] text-white px-10 py-4 rounded-full font-black text-lg flex items-center hover:bg-[#1A1A1A] transition-all group">
                  Reply
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="lg:w-[35%] space-y-10">
            {/* Search Widget */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-[20px] font-black text-[#1A1A1A]">
                  Search
                </h3>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-6 py-4 bg-[#F9FAFB] rounded-full border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-bold text-gray-700"
                />
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Category Widget */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-[20px] font-black text-[#1A1A1A]">
                  Category
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "Serenity Med",
                  "Serenity Health Center",
                  "Unity Health Services",
                  "Revive Medical Care",
                  "Harmony Holistic Health",
                ].map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center justify-between group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-bold text-gray-600 group-hover:text-[#00A78E] transition-colors">
                      {cat}
                    </span>
                    <Plus className="w-4 h-4 text-gray-300 group-hover:text-[#00A78E] group-hover:rotate-90 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Post Widget */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-[20px] font-black text-[#1A1A1A]">
                  Recent post
                </h3>
              </div>
              <div className="space-y-6">
                {recentBlogs.map((b) => (
                  <div
                    key={b._id}
                    onClick={() => navigate(`/blog-details/${b._id}`)}
                    className="flex items-center space-x-4 group cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={b.image}
                        className="w-full h-full object-cover"
                        alt="Recent post"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[12px] font-bold text-gray-400 uppercase">
                        <div className="w-2 h-2 bg-[#00A78E] rounded-full"></div>
                        <span>{b.category || "Medical"}</span>
                      </div>
                      <h4 className="font-black text-[#1A1A1A] leading-tight group-hover:text-[#00A78E] transition-colors text-sm line-clamp-2">
                        {b.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white p-10 rounded-[30px] shadow-sm border border-gray-50 text-center space-y-8">
              <h3 className="text-[22px] font-black text-[#1A1A1A]">
                Need Help? Call Us
              </h3>
              <div className="w-16 h-16 bg-[#C1FF72] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#C1FF72]/20">
                <Phone className="w-8 h-8 text-[#1A1A1A]" />
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Health care is a vital aspect of maintaining overall well-being,
                encompassing a range of services from preventive care
              </p>
              <h2 className="text-[22px] font-black text-[#1A1A1A]">
                (+888) 178 456 765
              </h2>
            </div>

            {/* Tags Widget */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                  <h3 className="text-[20px] font-black text-[#1A1A1A]">
                    Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-5 py-2 rounded-full border border-gray-100 text-gray-400 font-bold text-xs hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
