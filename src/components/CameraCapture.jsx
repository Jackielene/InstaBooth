import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Camera, Check } from "lucide-react";

const frameStyles = [
  { id: "classic", name: "Classic", borderColor: "border-white" },
  { id: "hearts", name: "Hearts", borderColor: "border-red-400" },
  { id: "stars", name: "Stars", borderColor: "border-yellow-400" },
  { id: "bubbles", name: "Bubbles", borderColor: "border-blue-400" },
  { id: "flowers", name: "Flowers", borderColor: "border-green-400" },
];

const CameraCapture = ({ layout, onComplete, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [frameStyle, setFrameStyle] = useState("classic");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const photosNeeded = { polaroid: 1, "2x2": 4, "2x3": 6, "1x3": 3, "3x3": 9 }[layout] || 3;

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    startCamera();
    return () => stream?.getTracks().forEach(track => track.stop());
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      capturePhoto();
    }
  }, [countdown]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const newPhotos = [...photos, canvas.toDataURL("image/png")];
      setPhotos(newPhotos);
      setCountdown(null);
      setCurrentPhotoIndex(currentPhotoIndex + 1);
      if (newPhotos.length === photosNeeded) onComplete(newPhotos);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-white px-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
        {photos.length < photosNeeded ? `Capture Photo ${photos.length + 1} of ${photosNeeded}` : "All Photos Captured!"}
      </h2>
      <div className={`relative mx-auto border-4 rounded-lg overflow-hidden bg-black aspect-video ${frameStyles.find(f => f.id === frameStyle)?.borderColor || "border-white"}`}>        
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        {countdown !== null && (
          <motion.div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <motion.div className="text-4xl md:text-6xl font-bold">{countdown}</motion.div>
          </motion.div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => {
            if (photos.length > 0 && !window.confirm("Are you sure you want to go back? Your progress will be lost.")) return;
            onBack();
          }}
          className="w-full sm:w-auto transition-transform transform hover:scale-105"
        >
          Back
        </Button>
        <Button 
          onClick={() => setCountdown(3)} 
          disabled={countdown !== null || photos.length >= photosNeeded}
          className="w-full sm:w-auto relative flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {photos.length < photosNeeded ? (
            <>
              Capture 
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                <Camera className="ml-2" />
              </motion.div>
            </>
          ) : (
            <>
              Complete <Check className="ml-2" />
            </>
          )}
        </Button>
      </div>
      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img src={photo} alt={`Captured ${index + 1}`} className="w-full h-auto border border-gray-300 rounded-lg" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
