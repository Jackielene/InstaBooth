import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

const Hero = ({
  title = "Capture Moments, Create Memories",
  subtitle = "Experience our premium photo booth service with stunning effects and instant sharing",
  backgroundGradient = "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
}) => {
  // Floating Elements
  const FloatingElements = () => (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute w-32 h-32 bg-white/10 rounded-full top-20 left-[10%]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-white/10 rounded-lg top-40 right-[15%]"
        animate={{ x: [0, -20, 0], y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-40 h-40 border-2 border-white/20 rounded-full bottom-40 left-[20%]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-48 h-36 border-4 border-white/30 right-[10%] bottom-[20%]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );

  // Start Button (Updated to Link)
  const StartButton = () => (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
      whileTap={{ scale: 0.98 }}
      animate={{ boxShadow: ["0 0 0px rgba(255, 255, 255, 0.2)", "0 0 20px rgba(255, 255, 255, 0.5)", "0 0 0px rgba(255, 255, 255, 0.2)"] }}
      transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
    >
      <Link
        to="/photo-guide" // Navigate to PhotoGuide page
        className="px-10 py-4 text-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-shadow inline-block"
      >
        Start Experience
      </Link>
    </motion.div>
  );

  return (
    <section  id="hero" className={`relative h-[700px] w-full overflow-hidden ${backgroundGradient}`}>
      {/* Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          {title}
        </motion.h1>

        <motion.p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          {subtitle}
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <StartButton />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
        <div className="flex flex-col items-center text-white/70">
          <p className="text-sm mb-2">Scroll to explore</p>
          <ChevronDown size={24} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
