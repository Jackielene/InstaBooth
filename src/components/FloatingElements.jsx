import React from "react";
import { motion } from "framer-motion";

const FloatingElements = ({
  count = 15,
  minSize = 20,
  maxSize = 120,
  minDuration = 15,
  maxDuration = 40,
  colors = [
    "rgba(255, 255, 255, 0.3)",
    "rgba(173, 216, 230, 0.4)",
    "rgba(255, 182, 193, 0.3)",
    "rgba(152, 251, 152, 0.3)",
    "rgba(255, 215, 0, 0.2)",
  ],
}) => {
  const generateElements = () => {
    return Array.from({ length: count }).map((_, i) => {
      const isFrame = Math.random() > 0.6;
      const size = Math.floor(Math.random() * (maxSize - minSize) + minSize);
      const duration = Math.floor(Math.random() * (maxDuration - minDuration) + minDuration);
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      const targetX = Math.random() * 100;
      const targetY = Math.random() * 100;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rotation = Math.random() * 360;
      const targetRotation = rotation + (Math.random() > 0.5 ? 180 : -180);

      return (
        <motion.div
          key={i}
          className={`absolute ${isFrame ? "border-2 border-white/30 backdrop-blur-sm" : ""}`}
          style={{
            width: size,
            height: isFrame ? size * 1.2 : size,
            backgroundColor: isFrame ? "rgba(255, 255, 255, 0.1)" : color,
            borderRadius: isFrame ? "4px" : "50%",
            filter: "blur(0.5px)",
            left: `${initialX}%`,
            top: `${initialY}%`,
            zIndex: 0,
          }}
          animate={{
            x: [`${initialX}%`, `${targetX}%`],
            y: [`${initialY}%`, `${targetY}%`],
            rotate: [rotation, targetRotation],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: delay,
          }}
        >
          {isFrame && <div className="absolute inset-1 bg-gradient-to-br from-white/10 to-transparent" />}
        </motion.div>
      );
    });
  };

  return <div className="fixed inset-0 overflow-hidden pointer-events-none bg-transparent">{generateElements()}</div>;
};

export default FloatingElements;
