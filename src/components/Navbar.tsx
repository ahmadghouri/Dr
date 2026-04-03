import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const navLinks = [
    {
      name: 'Home',
      path: '/',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Home 1', path: '/' },
        { name: 'Home 2', path: '/' },
      ]
    },
    {
      name: 'Service',
      path: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Service', path: '/services' },
        { name: 'Service Details', path: '/service-details' },
      ]
    },
    {
      name: 'Projects',
      path: '/projects',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Project', path: '/projects' },
        { name: 'Project Details', path: '/project-details' },
      ]
    },
    {
      name: 'Blog',
      path: '/blog',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Blog', path: '/blog' },
        { name: 'Blog Details', path: '/blog-details' },
      ]
    },
    {
      name: 'Pages',
      path: '/about',
      hasDropdown: true,
      dropdownItems: [
        { name: 'About Us', path: '/about' },
        { name: 'Doctor', path: '/doctors' },
        { name: 'Doctor Details', path: '/doctor-details' },
        { name: 'Pricing', path: '/pricing' },
      ]
    },
    { name: 'Contact', path: '/contact', hasDropdown: false },
  ];

  return (
    <nav className="bg-white border-b border-gray-50 py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">

        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 bg-[#00A78E] rounded-xl flex items-center justify-center shadow-sm shadow-[#00A78E]/20 transition-transform duration-300 group-hover:scale-110">
            {/* Custom Cross Icon */}
            <div className="relative w-6 h-6">
              <div className="absolute top-1/2 left-0 w-full h-[3px] bg-white -translate-y-1/2 rounded-full"></div>
              <div className="absolute top-0 left-1/2 w-[3px] h-full bg-white -translate-x-1/2 rounded-full"></div>
              {/* Extra dots for the 'medical' look */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-40"></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full opacity-40"></div>
            </div>
          </div>
          <span className="text-3xl font-bold text-[#1A1A1A] tracking-tight">MediZen</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          className="hidden lg:flex items-center space-x-2 relative"
          onMouseLeave={() => {
            setHoveredIndex(null);
            setActiveDropdown(null);
          }}
        >
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              className="relative py-2 flex items-center group"
              onMouseEnter={() => {
                setHoveredIndex(index);
                if (link.hasDropdown) setActiveDropdown(link.name);
              }}
            >
              <Link
                to={link.path}
                className="relative px-4 py-2 flex items-center cursor-pointer"
              >
                {/* Animated Background Pill */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="nav-hover"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-[#F4F9F8] rounded-full z-0"
                    />
                  )}
                </AnimatePresence>

                <span className={`relative z-10 text-[17px] font-bold transition-colors duration-300 ${hoveredIndex === index || (activeDropdown === link.name) ? 'text-[#00A78E]' : 'text-[#1A1A1A]'}`}>
                  {link.name}
                </span>
                {link.hasDropdown && (
                  <ChevronDown className={`relative z-10 ml-1 w-4 h-4 transition-colors duration-300 ${hoveredIndex === index || (activeDropdown === link.name) ? 'text-[#00A78E]' : 'text-[#1A1A1A]'}`} />
                )}
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === link.name && link.dropdownItems && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-50 py-3 z-[60]"
                  >
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-6 py-3 text-[16px] font-bold text-[#1A1A1A] hover:text-[#00A78E] hover:bg-[#F4F9F8] transition-all duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Search Icon */}
          {/* <div className="ml-4 w-11 h-11 border border-gray-100 bg-gray-50/30 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#00A78E] hover:text-white transition-all duration-300 group">
            <Search className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
          </div> */}
        </div>

        {/* Contact Info (Right Side) */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative group cursor-pointer">
            <div className="w-14 h-14 flex items-center justify-center bg-[#F4F9F8] rounded-full transition-transform group-hover:scale-110 duration-300">
              <MessageCircle className="w-8 h-8 text-[#00A78E]" />
            </div>
            {/* Floating dots for bubbles look */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-[#00A78E] rounded-full border-2 border-white"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] text-gray-500 font-medium">Need help?</span>
            <span className="text-[20px] font-extrabold text-[#1A1A1A] leading-tight">+92 300 3968500</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Expandable) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 space-y-4 pb-6 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex flex-col border-b border-gray-50 pb-2"
              >
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-[#1A1A1A] font-bold text-lg">{link.name}</span>
                  {link.hasDropdown && <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </Link>
            ))}
            <div className="flex items-center space-x-4 px-2 pt-4 border-t border-gray-50">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F4F9F8] rounded-full">
                <MessageCircle className="w-6 h-6 text-[#00A78E]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Need help?</span>
                <span className="text-lg font-extrabold text-[#1A1A1A]">+92 300 3968500</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
