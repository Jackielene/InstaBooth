import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxSection = ({
  title = "Capture Memories in Style",
  description = "Our photo booth experience combines cutting-edge technology with artistic design to create unforgettable moments for you and your guests.",
  backgroundImage = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
  children,
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transformations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  // Floating elements movement
  const circle1Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const circle3Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="parallax" // 👈 Added ID to make navbar scroll work
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-purple-800 to-indigo-900"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-16 left-[8%] w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-pink-500/20 blur-3xl"
        style={{ y: circle1Y }}
      />
      <motion.div
        className="absolute bottom-32 right-[12%] w-28 h-28 sm:w-44 sm:h-44 rounded-full bg-blue-500/20 blur-3xl"
        style={{ y: circle2Y }}
      />
      <motion.div
        className="absolute top-32 right-[20%] w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-purple-500/20 blur-3xl"
        style={{ y: circle3Y }}
      />

      {/* Content Section */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-10 max-w-4xl mx-auto text-center"
        style={{ y: contentY, opacity: opacityProgress }}
      >
        <h2 className="text-2xl sm:text-5xl font-bold mb-4 sm:mb-6 text-white drop-shadow-md">{title}</h2>
        <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-sm sm:max-w-3xl">{description}</p>

        {/* Glassmorphic Info Cards */}
        <div className="backdrop-blur-lg bg-white/10 p-5 sm:p-8 rounded-xl border border-white/15 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { step: 1, color: "from-pink-500 to-purple-600", title: "Choose Theme", desc: "Select from our curated collection of photo themes" },
              { step: 2, color: "from-blue-500 to-indigo-600", title: "Pose & Capture", desc: "Strike your best pose and let our booth do the magic" },
              { step: 3, color: "from-purple-500 to-indigo-600", title: "Share & Enjoy", desc: "Instantly share your photos or print them on the spot" },
            ].map(({ step, color, title, desc }) => (
              <div key={step} className="flex flex-col items-center p-3 sm:p-4">
                <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                  <span className="text-xl sm:text-3xl font-bold text-white">{step}</span>
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2">{title}</h3>
                <p className="text-white/80 text-center text-xs sm:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {children}
      </motion.div>
    </section>
  );
};

export default ParallaxSection;
