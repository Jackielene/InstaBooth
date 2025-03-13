import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ logo = "InstaBooth" }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll function for sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-3 flex items-center justify-between"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        <Link to="/">{logo}</Link>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <button onClick={() => scrollToSection("hero")} className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">
          Home
        </button>
        <button onClick={() => scrollToSection("parallax")} className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">
          About
        </button>
        <button onClick={() => scrollToSection("footer")} className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">
          Contact
        </button>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/photo-guide">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-md">
              Start Now
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-full left-0 right-0 bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden"
        >
          <Link to="/" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <button onClick={() => scrollToSection("parallax")} className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">
            About
          </button>
          <button onClick={() => scrollToSection("footer")} className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">
            Contact
          </button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-2">
            <Link to="/photo-guide">
              <button className="px-4 py-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-md">
                Start Now
              </button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
