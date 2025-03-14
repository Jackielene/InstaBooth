import React from "react";
import { motion } from "framer-motion";

const layouts = [
  { id: "2x2", name: "2×2 Grid", preview: "grid grid-cols-2 grid-rows-2 gap-1" },
  { id: "2x3", name: "2×3 Grid", preview: "grid grid-cols-2 grid-rows-3 gap-1" },
  { id: "polaroid", name: "Polaroid", preview: "flex flex-col space-y-2" },
];

const CollageSelector = ({ onSelect, selectedLayout }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center max-w-4xl mx-auto p-4">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-8 text-center">Choose Your Collage Layout</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
        {layouts.map((layout) => (
          <motion.div
            key={layout.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedLayout === layout.id ? "border-pink-500 ring-2 ring-purple-400" : "border-white/30"}`}
            onClick={() => onSelect(layout.id)}
          >
            <div className="aspect-square bg-black/30 backdrop-blur-sm p-4 flex items-center justify-center">
              <div className={`w-full h-full ${layout.preview}`}>
                {Array.from({ length: layout.id === "polaroid" ? 2 : layout.id === "2x2" ? 4 : layout.id === "2x3" ? 6 : 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={layout.id === "polaroid" ? (i === 0 ? "bg-white/20 h-3/4 rounded-sm" : "bg-white/10 h-1/4 rounded-sm") : "bg-white/20 rounded-sm border border-white/30"}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm py-3 px-4 text-center">
              <p className="text-white text-sm font-medium">{layout.name}</p>
            </div>
            {selectedLayout === layout.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollageSelector;