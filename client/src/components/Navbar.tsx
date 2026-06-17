import React, { useState } from "react";
import { Search, ChevronDown, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { useUser, useLogout } from "../features/auth/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const logout = useLogout();

  // 1. Reusable Smooth Scroll Function
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsOpen(false); // Mobile menu ko click par close karne ke liye
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
      hasDropdown: false,
      dropdownItems: [
        { name: "Home 1", path: "/" },
      ],
    },
    {
      name: "About Us",
      path: "/about",
      hasDropdown: false,
      dropdownItems: [
        { name: "About Us", path: "/about" },
        { name: "All Doctors", path: "/doctors" },
        { name: "Pricing", path: "/pricing" },
      ],
    },
    {
      name: "Service",
      path: "/services",
      hasDropdown: false,
      dropdownItems: [{ name: "All Services", path: "/services" }],
    },
    {
      name: "Projects",
      path: "/projects",
      hasDropdown: false,
      dropdownItems: [{ name: "All Projects", path: "/projects" }],
    },
    {
      name: "Blog",
      path: "/blog",
      hasDropdown: false,
      dropdownItems: [{ name: "All Blogs", path: "/blog" }],
    },
    
    { name: "Contact", path: "/contact", hasDropdown: false },
  ];

  if (user?.isAdmin) {
    navLinks.push({ name: "Admin", path: "/admin", hasDropdown: false });
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-50 py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo Section - Added onClick for top scroll */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#00A78E] rounded-xl flex items-center justify-center shadow-sm shadow-[#00A78E]/20 transition-transform duration-300 group-hover:scale-110">
            <div className="relative w-6 h-6">
              <div className="absolute top-1/2 left-0 w-full h-[3px] bg-white -translate-y-1/2 rounded-full"></div>
              <div className="absolute top-0 left-1/2 w-[3px] h-full bg-white -translate-x-1/2 rounded-full"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-40"></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full opacity-40"></div>
            </div>
          </div>
          <span className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
            MediZen
          </span>
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
              {/* Added onClick={handleLinkClick} to Desktop NavLinks */}
              <NavLink
                to={link.path}
                end={link.path === "/"}
                onClick={handleLinkClick}
                className="relative px-4 py-2 flex items-center cursor-pointer"
              >
                {({ isActive }) => (
                  <>
                    <AnimatePresence>
                      {(hoveredIndex === index || isActive) && (
                        <motion.div
                          layoutId="nav-hover"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                          className="absolute inset-0 bg-[#F4F9F8] rounded-full z-0"
                        />
                      )}
                    </AnimatePresence>

                    <span
                      className={`relative z-10 text-[17px] font-semibold transition-colors duration-300 ${
                        hoveredIndex === index || activeDropdown === link.name || isActive ? "text-[#00A78E]" : "text-[#1A1A1A]"
                      }`}
                    >
                      {link.name}
                    </span>
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`relative z-10 ml-1 w-4 h-4 transition-colors duration-300 ${
                          hoveredIndex === index || activeDropdown === link.name || isActive ? "text-[#00A78E]" : "text-[#1A1A1A]"
                        }`}
                      />
                    )}
                  </>
                )}
              </NavLink>

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
                      <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                          `block px-6 py-3 text-[16px] font-semibold transition-all duration-200 ${
                            isActive
                              ? "text-[#00A78E] bg-[#F4F9F8]"
                              : "text-[#1A1A1A] hover:text-[#00A78E] hover:bg-[#F4F9F8]"
                          }`
                        }
                        onClick={() => {
                          setActiveDropdown(null);
                          handleLinkClick(); // Added for Dropdown items too
                        }}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 space-y-4 pb-6 overflow-hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={handleLinkClick} // Directly using handleLinkClick here
                className="flex flex-col border-b border-gray-50 pb-2"
              >
                {({ isActive }) => (
                  <div className="flex items-center justify-between px-2 py-2">
                    <span
                      className={`font-bold text-lg transition-colors duration-300 ${
                        isActive ? "text-[#00A78E]" : "text-[#1A1A1A]"
                      }`}
                    >
                      {link.name}
                    </span>
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? "text-[#00A78E]" : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                )}
              </NavLink>
            ))}
            <div className="flex items-center space-x-4 px-2 pt-4 border-t border-gray-50">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F4F9F8] rounded-full">
                <MessageCircle className="w-6 h-6 text-[#00A78E]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">
                  Need help?
                </span>
                <span className="text-lg font-extrabold text-[#1A1A1A]">
                  +92 300 3968500
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;