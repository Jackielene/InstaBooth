import React from "react";
import { motion } from "framer-motion";
import FloatingElements from "../components/FloatingElements";
import StartButton from "../components/ui/StartButton";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const PhotoGuide = ({ className = "" }) => {
  // Custom Navbar for PhotoGuide page
  const CustomNavbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
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
          <Link to="/">PhotoBooth</Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/#hero" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">
            Home
          </Link>
          <Link to="/#parallax" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">
            About
          </Link>
          <Link to="/#footer" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium">
            Contact
          </Link>
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
            <Link to="/#parallax" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/#footer" className="text-gray-700 hover:text-black transition-colors duration-200 font-medium" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
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

  return (
    <div
      className={`relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 overflow-hidden ${className}`}
    >
      {/* Add Custom Navbar */}
      <CustomNavbar />
      
      {/* Custom floating elements with 3D effect */}
      <FloatingElements
        count={20}
        minSize={30}
        maxSize={150}
        colors={[
          "rgba(255, 255, 255, 0.2)",
          "rgba(173, 216, 230, 0.3)",
          "rgba(255, 182, 193, 0.2)",
          "rgba(152, 251, 152, 0.2)",
          "rgba(255, 215, 0, 0.15)",
        ]}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl px-6 py-10 md:py-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl flex flex-col items-center text-center">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How to Take Your Perfect Photo
        </motion.h1>

        <div className="space-y-4 w-full">
          {["Strike a Pose", "Choose Your Filter", "Say Cheese!", "Share Instantly"].map((title, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-4 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full">
                {index + 1}
              </div>
              <p className="text-white/80 text-sm md:text-base flex-1">{title}</p>
            </motion.div>
          ))}
        </div>

        {/* Start button */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StartButton text="Start Photo Booth" href="/experience" isLink={true} />
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoGuide;
