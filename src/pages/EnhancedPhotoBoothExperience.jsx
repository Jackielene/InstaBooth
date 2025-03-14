import React, { useState } from "react";
import { motion } from "framer-motion";
import FloatingElements from "../components/FloatingElements";
import CollageSelector from "../components/CollageSelector";
import CameraCapture from "../components/CameraCapture";
import CollageResult from "../components/CollageResult";

const EnhancedPhotoBoothExperience = ({ className = "" }) => {
  const [step, setStep] = useState(0); // 0: select layout, 1: capture photos, 2: view result
  const [selectedLayout, setSelectedLayout] = useState("");
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  const handleLayoutSelect = (layout) => {
    setSelectedLayout(layout);
    setStep(1);
  };

  const handlePhotosComplete = (photos) => {
    setCapturedPhotos(photos);
    setStep(2);
  };

  const handleReset = () => {
    setStep(0);
    setSelectedLayout("");
    setCapturedPhotos([]);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <CollageSelector
            onSelect={handleLayoutSelect}
            selectedLayout={selectedLayout}
          />
        );
      case 1:
        return (
          <CameraCapture
            layout={selectedLayout}
            onComplete={handlePhotosComplete}
            onBack={() => setStep(0)}
          />
        );
      case 2:
        return (
          <CollageResult
            photos={capturedPhotos}
            layout={selectedLayout}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 overflow-hidden flex flex-col items-center justify-center px-4 py-20 ${className}`}
    >
      {/* Enhanced Floating Elements */}
      <FloatingElements
        count={30}
        minSize={20}
        maxSize={120}
        colors={["rgba(255, 255, 255, 0.2)", "rgba(173, 216, 230, 0.3)", "rgba(255, 182, 193, 0.2)", "rgba(152, 251, 152, 0.2)", "rgba(255, 215, 0, 0.15)"]}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-10 transition-all duration-300 hover:shadow-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-white text-3xl font-bold text-center mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Enhanced Photo Booth Experience
        </motion.h1>
        {renderStep()}
      </motion.div>
    </div>
  );
};

export default EnhancedPhotoBoothExperience;
