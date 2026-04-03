import { useEffect } from 'react';
import PageHero from './components/PageHero';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Plus, Phone, ChevronsRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogs = [
    {
      id: 1,
      title: 'Healing Lives, One Patient at a Time Empowering Health One Patient at a Time Empowering Health',
      date: '24 March, 2024',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1576091160550-2173bdd99602?q=80&w=2070&auto=format&fit=crop',
      category: 'Category'
    },
    {
      id: 2,
      title: 'A healthy tomorrow starts today Where health meets hope Your partner in wellness',
      date: '25 March, 2024',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1505751172107-573225a91319?q=80&w=2070&auto=format&fit=crop',
      category: 'Category'
    },
    {
      id: 3,
      title: 'Your health, our priority Healing with heart Empowering wellness Compassionate care, always',
      date: '26 March, 2024',
      author: 'Admin',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop',
      category: 'Category'
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9FAFB]">
      <PageHero title="Latest Blog" breadcrumb="Blog" />

      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Side: Blog List */}
          <div className="lg:w-[65%] space-y-10">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-50 group"
              >
                {/* Image Container */}
                <div className="relative rounded-[25px] overflow-hidden mb-8 h-[400px]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date Badge over image */}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                    <Calendar className="w-4 h-4 text-[#00A78E]" />
                    <span className="text-[#1A1A1A] font-bold text-sm">{blog.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 px-2">
                  <div className="flex items-center space-x-6 text-gray-400 text-sm font-bold uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-[#00A78E]" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#00A78E]/20 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#00A78E] rounded-full"></div>
                      </div>
                      <span>{blog.category}</span>
                    </div>
                  </div>

                  <h3 className="text-[28px] md:text-[32px] font-black text-[#1A1A1A] leading-tight group-hover:text-[#00A78E] transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <button
                    onClick={() => navigate('/blog-details')}
                    className="border-2 border-gray-100 hover:border-[#00A78E] hover:bg-[#00A78E] hover:text-white px-8 py-3.5 rounded-full font-black text-[#1A1A1A] transition-all duration-300 flex items-center group/btn"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-3 pt-10">
              {[1, 2, 3, 4].map((num) => (
                <button key={num} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 transition-all ${num === 1 ? 'bg-white border-[#00A78E] text-[#1A1A1A]' : 'bg-white border-gray-100 text-gray-400 hover:border-[#00A78E] hover:text-[#1A1A1A]'}`}>
                  {num}
                </button>
              ))}
              <button type="button" aria-label="Next Page" className="w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 border-gray-100 text-gray-400 hover:border-[#00A78E] hover:text-[#1A1A1A] transition-all">
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side: Sidebar */}
          <div className="lg:w-[35%] space-y-10">

            {/* Search Widget */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-[20px] font-black text-[#1A1A1A]">Search</h3>
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
                <h3 className="text-[20px] font-black text-[#1A1A1A]">Category</h3>
              </div>
              <div className="space-y-4">
                {['Serenity Med', 'Serenity Health Center', 'Unity Health Services', 'Revive Medical Care', 'Harmony Holistic Health'].map((cat) => (
                  <div key={cat} className="flex items-center justify-between group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <span className="font-bold text-gray-600 group-hover:text-[#00A78E] transition-colors">{cat}</span>
                    <Plus className="w-4 h-4 text-gray-300 group-hover:text-[#00A78E] group-hover:rotate-90 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Post Widget */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-[20px] font-black text-[#1A1A1A]">Recent post</h3>
              </div>
              <div className="space-y-6">
                {[
                  'Building health communities A healthy tomorrow',
                  'Quality health, close to home Caring for',
                  'you every step of the way Revive Health Center'
                ].map((title, i) => (
                  <div key={i} className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={`https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop`} className="w-full h-full object-cover" alt="Blog" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[12px] font-bold text-gray-400 uppercase">
                        <div className="w-2 h-2 bg-[#00A78E] rounded-full"></div>
                        <span>Category</span>
                      </div>
                      <h4 className="font-black text-[#1A1A1A] leading-tight group-hover:text-[#00A78E] transition-colors text-sm">
                        {title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white p-10 rounded-[30px] shadow-sm border border-gray-50 text-center space-y-8">
              <h3 className="text-[22px] font-black text-[#1A1A1A]">Need Help? Call Us</h3>
              <div className="w-16 h-16 bg-[#C1FF72] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#C1FF72]/20">
                <Phone className="w-8 h-8 text-[#1A1A1A]" />
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care</p>
              <h2 className="text-[22px] font-black text-[#1A1A1A]">(+888) 178 456 765</h2>
            </div>

            {/* Tags Widget */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-50">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
                <h3 className="text-[20px] font-black text-[#1A1A1A]">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Ambience', 'Thrive Care', 'Life', 'Health', 'Creativity', 'Harmony', 'Care Plan', 'Best'].map((tag) => (
                  <span key={tag} className="px-5 py-2 rounded-full border border-gray-100 text-gray-400 font-bold text-xs hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all cursor-pointer">
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
