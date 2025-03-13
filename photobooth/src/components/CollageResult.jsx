import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Download, RefreshCw, Sliders, Image, Sticker } from "lucide-react";
import domtoimage from 'dom-to-image-more';

// Instagram-like filter presets
const instagramFilters = {
  normal: {
    name: "Normal",
    style: {},
    class: ""
  },
  clarendon: {
    name: "Clarendon",
    style: {},
    class: "brightness-125 contrast-110 saturate-130"
  },
  gingham: {
    name: "Gingham",
    style: {},
    class: "brightness-105 sepia-10 contrast-90 hue-rotate-350"
  },
  moon: {
    name: "Moon",
    style: {},
    class: "grayscale brightness-110 contrast-110"
  },
  lark: {
    name: "Lark",
    style: {},
    class: "brightness-110 contrast-105 saturate-110 sepia-10"
  },
  reyes: {
    name: "Reyes",
    style: {},
    class: "brightness-85 contrast-90 saturate-75 sepia-22"
  },
  juno: {
    name: "Juno",
    style: {},
    class: "saturate-140 hue-rotate-15 contrast-105"
  },
  slumber: {
    name: "Slumber",
    style: {},
    class: "brightness-90 saturate-85 sepia-35"
  },
  aden: {
    name: "Aden",
    style: { backgroundImage: "linear-gradient(to right, rgba(66, 10, 14, 0.2), transparent)" },
    class: "brightness-115 contrast-90 saturate-140 hue-rotate-20"
  },
  perpetua: {
    name: "Perpetua",
    style: { backgroundImage: "linear-gradient(to bottom, rgba(0, 91, 154, 0.25), rgba(230, 193, 61, 0.25))" },
    class: "brightness-105 contrast-110 saturate-110"
  },
  mayfair: {
    name: "Mayfair",
    style: { backgroundImage: "radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.8), rgba(255, 200, 200, 0.6), rgba(17, 17, 17, 0.2))" },
    class: "brightness-110 contrast-105 saturate-115"
  },
  rise: {
    name: "Rise",
    style: { backgroundImage: "linear-gradient(to top, rgba(236, 205, 169, 0.4), rgba(50, 30, 7, 0.4))" },
    class: "brightness-110 contrast-95 saturate-85 sepia-30"
  },
  hudson: {
    name: "Hudson",
    style: { backgroundImage: "radial-gradient(circle, rgba(166, 177, 255, 0.5) 50%, rgba(0, 0, 0, 0.5))" },
    class: "brightness-120 contrast-120 saturate-105 sepia-15"
  },
  valencia: {
    name: "Valencia",
    style: { backgroundImage: "linear-gradient(to bottom, rgba(168, 118, 95, 0.2), rgba(37, 37, 37, 0.1))" },
    class: "brightness-105 contrast-110 saturate-110 sepia-20"
  },
  xpro2: {
    name: "X-Pro II",
    style: { backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(230, 115, 108, 0.2))" },
    class: "contrast-125 saturate-125 sepia-15 brightness-95"
  }
};

// Polaroid frame designs
const polaroidFrames = {
  classic: {
    name: "Classic",
    borderColor: "border-white",
    bgColor: "bg-white",
    textColor: "text-gray-600",
    shadowColor: "shadow-sm"
  },
  vintage: {
    name: "Vintage",
    borderColor: "border-amber-50",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    shadowColor: "shadow-sm"
  },
  retro: {
    name: "Retro",
    borderColor: "border-blue-50",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    shadowColor: "shadow-sm"
  },
  modern: {
    name: "Modern",
    borderColor: "border-gray-100",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
    shadowColor: "shadow-sm"
  },
  pastel: {
    name: "Pastel",
    borderColor: "border-pink-50",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
    shadowColor: "shadow-sm"
  },
  noir: {
    name: "Noir",
    borderColor: "border-gray-900",
    bgColor: "bg-gray-900",
    textColor: "text-gray-200",
    shadowColor: "shadow-sm"
  }
};

// Sticker options
const stickers = [
  { id: "heart", emoji: "❤️", name: "Heart" },
  { id: "star", emoji: "⭐", name: "Star" },
  { id: "smile", emoji: "😊", name: "Smile" },
  { id: "fire", emoji: "🔥", name: "Fire" },
  { id: "camera", emoji: "📷", name: "Camera" },
  { id: "rainbow", emoji: "🌈", name: "Rainbow" },
  { id: "sparkles", emoji: "✨", name: "Sparkles" },
  { id: "sunglasses", emoji: "😎", name: "Cool" },
  { id: "party", emoji: "🎉", name: "Party" },
  { id: "love", emoji: "😍", name: "Love" },
  { id: "peace", emoji: "✌️", name: "Peace" },
  { id: "kiss", emoji: "💋", name: "Kiss" }
];

function CollageResult({ photos, layout, filter, onReset }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadError, setDownloadError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(filter || "normal");
  const [showFilters, setShowFilters] = useState(false);
  const [showFrames, setShowFrames] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState("classic");
  const [appliedStickers, setAppliedStickers] = useState([]);
  const [activeSticker, setActiveSticker] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [lastDownloadedImage, setLastDownloadedImage] = useState(null);
  const collageRef = useRef(null);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  // Get the selected filter's class and style
  const getFilterClass = () => {
    return instagramFilters[selectedFilter]?.class || "";
  };

  const getFilterStyle = () => {
    const filter = instagramFilters[selectedFilter];
    if (!filter) return {};
    
    const filterString = convertTailwindToFilters(filter.class);
    return {
      ...filter.style,
      filter: filterString
    };
  };

  const getGridLayout = () => {
    switch (layout) {
      case "2x2": return "grid-cols-2 grid-rows-2";
      case "2x3": return "grid-cols-2 grid-rows-3";
      case "1x3": return "grid-cols-1 grid-rows-3";
      default: return "grid-cols-2 grid-rows-2";
    }
  };

  const getFrameStyle = () => {
    return polaroidFrames[selectedFrame] || polaroidFrames.classic;
  };

  const addSticker = (sticker) => {
    const newSticker = {
      id: `sticker-${Date.now()}`,
      type: sticker,
      position: { x: 50, y: 50 }, // Center position as percentage
      rotation: 0,
      size: 30 // Size in pixels
    };
    setAppliedStickers([...appliedStickers, newSticker]);
    setActiveSticker(newSticker.id);
  };

  // Improved sticker movement with drag start and end handlers
  const handleDragStart = (stickerId) => {
    setActiveSticker(stickerId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (event, stickerId) => {
    if (activeSticker !== stickerId || !isDragging) return;
    
    const container = collageRef.current.getBoundingClientRect();
    const x = ((event.clientX - container.left) / container.width) * 100;
    const y = ((event.clientY - container.top) / container.height) * 100;
    
    setAppliedStickers(appliedStickers.map(sticker => 
      sticker.id === stickerId 
        ? { ...sticker, position: { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } }
        : sticker
    ));
  };

  const removeSticker = (stickerId, event) => {
    if (event) event.stopPropagation();
    setAppliedStickers(appliedStickers.filter(sticker => sticker.id !== stickerId));
    if (activeSticker === stickerId) setActiveSticker(null);
  };

  const renderSticker = (sticker) => {
    const stickerObj = stickers.find(s => s.id === sticker.type);
    if (!stickerObj) return null;
    
    const isActive = activeSticker === sticker.id;
    
    return (
      <motion.div 
        key={sticker.id}
        className={`absolute cursor-move transition-all ${isActive ? 'z-20 scale-110' : 'z-10'}`}
        style={{
          left: `${sticker.position.x}%`,
          top: `${sticker.position.y}%`,
          transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
          fontSize: `${sticker.size}px`
        }}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSticker(isActive ? null : sticker.id);
        }}
        onMouseDown={() => handleDragStart(sticker.id)}
        onMouseUp={handleDragEnd}
        onMouseMove={(e) => handleDrag(e, sticker.id)}
        onDoubleClick={() => removeSticker(sticker.id)}
        drag
        dragMomentum={false}
        dragConstraints={collageRef}
        onDragStart={() => handleDragStart(sticker.id)}
        onDragEnd={handleDragEnd}
      >
        {stickerObj.emoji}
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sticker-remove-button absolute -top-6 -right-6 bg-red-400/90 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer hover:bg-red-500/90 backdrop-blur-sm"
            onClick={(e) => removeSticker(sticker.id, e)}
          >
            ✕
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderPolaroid = () => {
    const frame = getFrameStyle();
    
    return (
      <div 
        className={`relative ${frame.bgColor} p-4 pb-16 max-w-md mx-auto border-4 ${frame.borderColor} rounded-sm`}
        onClick={() => setActiveSticker(null)}
      >
        <div className="aspect-square overflow-hidden relative">
          <img
            src={photos[0]}
            alt="Polaroid photo"
            className={`w-full h-full object-cover ${getFilterClass()}`}
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0" style={getFilterStyle()}></div>
          
          {/* Stickers for polaroid */}
          {appliedStickers.map(renderSticker)}
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className={`${frame.textColor} font-handwriting text-sm opacity-90`}>{currentDate}</p>
        </div>
      </div>
    );
  };

  const renderCollage = () => {
    if (!photos || photos.length === 0) {
      return <p className="text-white">No photos to display.</p>;
    }

    if (layout === "polaroid") {
      return renderPolaroid();
    }

    // Adjust container size based on layout
    const containerClass = layout === "2x3" 
      ? "aspect-[2/3] w-full max-w-2xl mx-auto" 
      : "aspect-[3/4] w-full max-w-md mx-auto";
    
    const frame = getFrameStyle();
    
    return (
      <div 
        className={`${containerClass} relative collage-content`}
        onClick={() => setActiveSticker(null)}
      >
        <div className={`grid ${getGridLayout()} gap-0 h-full ${frame.bgColor} border-4 ${frame.borderColor} rounded-sm shadow ${frame.shadowColor} p-0 m-0`}> 
          {photos.map((photo, index) => (
            <div key={index} className="relative overflow-hidden aspect-square m-0 p-0 border-0">
              <img
                src={photo}
                alt={`Collage photo ${index + 1}`}
                className={`w-full h-full object-cover ${getFilterClass()}`}
                crossOrigin="anonymous"
                style={{ margin: 0, padding: 0 }}
              />
              <div className="absolute inset-0" style={getFilterStyle()}></div>
              <div className={`absolute bottom-2 right-2 text-xs ${frame.textColor} bg-black/20 px-2 py-1 rounded-sm backdrop-blur-sm`}>
                {currentDate}
              </div>
            </div>
          ))}
        </div>
        
        {/* Stickers for collage */}
        {appliedStickers.map(renderSticker)}
      </div>
    );
  };

  const handleDownload = async () => {
    if (!photos || photos.length === 0 || isDownloading) return;
    
    try {
      setIsDownloading(true);
      setDownloadProgress(10);
      setDownloadError(null);
      
      const element = collageRef.current;
      if (!element) {
        throw new Error("Collage container not found");
      }

      // Create a temporary clone for download
      const clone = element.cloneNode(true);
      document.body.appendChild(clone);
      
      // Set background to transparent for the clone
      clone.style.backgroundColor = 'transparent';
      
      // More aggressive border and background removal
      // First, remove all borders from all elements except the main frame
      const allElements = clone.querySelectorAll('*');
      allElements.forEach(el => {
        // Skip the main grid container to preserve the frame
        if (el.className && el.className.includes('grid')) {
          return;
        }
        
        el.style.border = 'none';
        el.style.boxShadow = 'none';
        el.style.outline = 'none';
        
        // Remove border classes except for the main frame
        if (el.className && typeof el.className === 'string') {
          el.className = el.className
            .split(' ')
            .filter(cls => 
              !cls.includes('border') && 
              !cls.includes('shadow') && 
              !cls.includes('ring') &&
              !cls.includes('outline')
            )
            .join(' ');
        }
        
        // For grid gaps
        if (el.className && el.className.includes('grid')) {
          el.style.gap = '0';
        }
      });

      // Specifically target date stamps
      const dateStamps = clone.querySelectorAll('.absolute.bottom-2, .absolute.bottom-4, [class*="bottom-"]');
      dateStamps.forEach(el => {
        el.style.background = 'transparent';
        el.style.backgroundColor = 'transparent';
        el.style.backdropFilter = 'none';
        el.style.border = 'none';
        el.style.boxShadow = 'none';
        el.style.padding = '0';
        el.style.margin = '0';
        
        // Remove background classes
        if (el.className && typeof el.className === 'string') {
          el.className = el.className
            .split(' ')
            .filter(cls => 
              !cls.includes('bg-') && 
              !cls.includes('backdrop-') && 
              !cls.includes('p-') && 
              !cls.includes('px-') && 
              !cls.includes('py-') && 
              !cls.includes('rounded')
            )
            .join(' ');
        }
      });

      // Remove grid gaps and padding
      const gridElements = clone.querySelectorAll('.grid');
      gridElements.forEach(el => {
        // Skip the main grid container to preserve the frame
        if (el.className && el.className.includes('grid-cols-')) {
          return;
        }
        el.style.gap = '0';
        el.style.padding = '0';
        el.style.margin = '0';
        el.style.border = 'none';
        el.style.backgroundColor = 'transparent';
      });

      // Remove padding and margins from container
      clone.style.cssText = 'margin: 0; padding: 0; width: fit-content; height: fit-content; background-color: transparent; border: none; box-shadow: none;';
      
      // Remove padding from collage content
      const contentElements = clone.querySelectorAll('.collage-content, .collage-container');
      contentElements.forEach(el => {
        el.style.margin = '0';
        el.style.padding = '0';
        el.style.border = 'none';
        el.style.backgroundColor = 'transparent';
        el.style.boxShadow = 'none';
      });

      // Hide remove buttons
      const removeButtons = clone.querySelectorAll('.sticker-remove-button');
      removeButtons.forEach(button => button.style.display = 'none');

      setDownloadProgress(30);

      try {
        // Convert the clone to PNG with transparent background
        const dataUrl = await domtoimage.toPng(clone, {
          quality: 1.0,
          scale: 2,
          bgcolor: null, // Ensure transparent background
          style: {
            transform: 'scale(1)',
            'transform-origin': 'top left',
            margin: '0',
            padding: '0',
            border: 'none',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            background: 'transparent'
          },
          filter: (node) => {
            // Additional filter to ensure no unwanted elements are included
            return (!node.style || 
                   (node.style.display !== 'none' && 
                    node.style.visibility !== 'hidden'));
          }
        });

        // Remove the clone from DOM
        document.body.removeChild(clone);

        setDownloadProgress(70);

        // Create download link
        const link = document.createElement('a');
        const filterName = instagramFilters[selectedFilter]?.name || "custom";
        const frameName = `-${polaroidFrames[selectedFrame]?.name || "classic"}`;
        const filename = `Instabooth-${layout}${frameName}-${filterName.toLowerCase()}-${Date.now()}.png`;
        
        link.download = filename;
        link.href = dataUrl;
        link.click();
        
        // After successful download
        setLastDownloadedImage(dataUrl);
        setDownloadProgress(100);
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
          setShowThankYou(true);
        }, 1000);

      } catch (error) {
        // Remove the clone in case of error
        if (clone.parentNode) {
          document.body.removeChild(clone);
        }
        throw new Error(`Image creation failed: ${error.message}`);
      }
      
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadError(`Failed to download image: ${error.message}`);
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleShare = async (platform) => {
    if (!lastDownloadedImage) return;

    try {
      // Convert base64 to blob
      const response = await fetch(lastDownloadedImage);
      const blob = await response.blob();
      const file = new File([blob], "photobooth.png", { type: "image/png" });

      const shareUrls = {
        'instagram-post': 'https://instagram.com/share',
        'instagram-story': 'https://instagram.com/stories/share',
        'facebook-post': 'https://www.facebook.com/sharer/sharer.php',
        'facebook-story': 'https://www.facebook.com/stories/share',
        'twitter': 'https://twitter.com/intent/tweet',
        'whatsapp': 'https://wa.me/'
      };

      if (shareUrls[platform]) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out my awesome photobooth creation!');
        
        // For Instagram and Facebook stories, we'll need to handle differently
        if (platform === 'instagram-story' || platform === 'facebook-story') {
          // Note: Direct sharing to stories requires platform-specific SDKs
          // For now, we'll redirect to the main sharing page
          window.open(shareUrls[platform], '_blank');
        } else {
          window.open(`${shareUrls[platform]}?url=${url}&text=${text}`, '_blank');
        }
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  // Add CSS filter mappings for Tailwind classes
  const filterMappings = {
    'brightness-125': 'brightness(1.25)',
    'contrast-110': 'contrast(1.1)',
    'saturate-130': 'saturate(1.3)',
    'brightness-105': 'brightness(1.05)',
    'sepia-10': 'sepia(0.1)',
    'contrast-90': 'contrast(0.9)',
    'hue-rotate-350': 'hue-rotate(350deg)',
    'grayscale': 'grayscale(1)',
    'brightness-110': 'brightness(1.1)',
    'contrast-105': 'contrast(1.05)',
    'saturate-110': 'saturate(1.1)',
    'brightness-85': 'brightness(0.85)',
    'saturate-75': 'saturate(0.75)',
    'sepia-22': 'sepia(0.22)',
    'saturate-140': 'saturate(1.4)',
    'hue-rotate-15': 'hue-rotate(15deg)',
    'brightness-90': 'brightness(0.9)',
    'saturate-85': 'saturate(0.85)',
    'sepia-35': 'sepia(0.35)',
    'brightness-115': 'brightness(1.15)',
    'saturate-140': 'saturate(1.4)',
    'hue-rotate-20': 'hue-rotate(20deg)',
  };

  // Helper function to convert Tailwind classes to CSS filters
  const convertTailwindToFilters = (classes) => {
    if (!classes) return '';
    return classes.split(' ')
      .map(cls => filterMappings[cls] || '')
      .filter(Boolean)
      .join(' ');
  };

  // Component to show download progress
  const DownloadProgress = () => {
    if (!isDownloading && !downloadError) return null;
    
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          {downloadError ? (
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
              <p className="text-gray-700 mb-4">{downloadError}</p>
              <Button
                onClick={() => setDownloadError(null)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-xl mb-4">Preparing Download</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm">
                {downloadProgress < 100 
                  ? "Processing your image..." 
                  : "Download starting..."}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Component to show thank you modal with sharing options
  const ThankYouModal = () => {
    if (!showThankYou) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              We're grateful you chose to use our photobooth! Your creation has been downloaded successfully.
            </p>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Share your creation:</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Button
                    onClick={() => handleShare('instagram-post')}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Instagram Post
                  </Button>
                  <Button
                    onClick={() => handleShare('instagram-story')}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Instagram Story
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Button
                    onClick={() => handleShare('facebook-post')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Facebook Post
                  </Button>
                  <Button
                    onClick={() => handleShare('facebook-story')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Facebook Story
                  </Button>
                </div>

                <Button
                  onClick={() => handleShare('twitter')}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Twitter Post
                </Button>

                <Button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  WhatsApp
                </Button>
              </div>

              <Button
                onClick={() => setShowThankYou(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Close
              </Button>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  Made with <span className="text-red-500">❤️</span> by Kiel
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center min-h-[500px]">
        <motion.div
          ref={collageRef}
          data-collage-container
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="collage-container"
        >
          {renderCollage()}
        </motion.div>
      </div>

      {/* Control buttons */}
      <div className="flex justify-center flex-wrap gap-2">
        <Button
          variant="outline"
          className="bg-purple-500/10 border-purple-500/30 text-white hover:bg-purple-500/20 flex items-center gap-2"
          onClick={() => {
            setShowFilters(!showFilters);
            if (showFilters) {
              setShowFrames(false);
              setShowStickers(false);
            }
          }}
        >
          <Sliders className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Choose Filter"}
        </Button>
        
        <Button
          variant="outline"
          className="bg-blue-500/10 border-blue-500/30 text-white hover:bg-blue-500/20 flex items-center gap-2"
          onClick={() => {
            setShowFrames(!showFrames);
            if (showFrames) {
              setShowFilters(false);
              setShowStickers(false);
            }
          }}
        >
          <Image className="h-4 w-4" />
          {showFrames ? "Hide Frames" : "Choose Frame"}
        </Button>
        
        <Button
          variant="outline"
          className="bg-green-500/10 border-green-500/30 text-white hover:bg-green-500/20 flex items-center gap-2"
          onClick={() => {
            setShowStickers(!showStickers);
            if (showStickers) {
              setShowFilters(false);
              setShowFrames(false);
            }
          }}
        >
          <Sticker className="h-4 w-4" />
          {showStickers ? "Hide Stickers" : "Add Stickers"}
        </Button>
      </div>

      {/* Filter selector */}
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-black/30 backdrop-blur-sm p-4 rounded-xl"
        >
          <h3 className="text-white text-lg font-medium mb-3">Instagram Filters</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {Object.entries(instagramFilters).map(([key, filterObj]) => (
              <div 
                key={key}
                className={`cursor-pointer relative rounded-md overflow-hidden transition-all ${selectedFilter === key ? 'ring-2 ring-purple-500 scale-105' : 'opacity-80 hover:opacity-100'}`}
                onClick={() => setSelectedFilter(key)}
              >
                <div className="aspect-square w-full bg-gray-800 relative overflow-hidden">
                  {photos.length > 0 && (
                    <>
                      <img 
                        src={photos[0]} 
                        alt={filterObj.name} 
                        className={`w-full h-full object-cover ${filterObj.class}`}
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0" style={filterObj.style}></div>
                    </>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1 px-2">
                  <p className="text-white text-xs text-center truncate">{filterObj.name}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Frame selector for all layouts */}
      {showFrames && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-black/30 backdrop-blur-sm p-4 rounded-xl"
        >
          <h3 className="text-white text-lg font-medium mb-3">Frame Styles</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {Object.entries(polaroidFrames).map(([key, frame]) => (
              <div 
                key={key}
                className={`cursor-pointer relative transition-all ${selectedFrame === key ? 'ring-2 ring-blue-500 scale-105' : 'opacity-80 hover:opacity-100'}`}
                onClick={() => setSelectedFrame(key)}
              >
                <div className={`aspect-square w-full ${frame.bgColor} border-4 ${frame.borderColor} shadow ${frame.shadowColor} relative overflow-hidden p-2`}>
                  {photos.length > 0 && (
                    <div className={`w-full ${layout === "polaroid" ? "h-3/4" : "h-full"} bg-gray-200`}>
                      <img 
                        src={photos[0]} 
                        alt={frame.name} 
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                  )}
                  <div className={`${layout === "polaroid" ? "h-1/4" : "absolute bottom-0 left-0 right-0"} flex items-center justify-center ${frame.textColor} text-xs font-handwriting`}>
                    {frame.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Sticker selector */}
      {showStickers && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-black/30 backdrop-blur-sm p-4 rounded-xl"
        >
          <h3 className="text-white text-lg font-medium mb-3">Stickers</h3>
          <p className="text-gray-300 text-sm mb-2">Click to add, drag to move, double-click to remove</p>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {stickers.map((sticker) => (
              <div 
                key={sticker.id}
                className="cursor-pointer bg-gray-800/50 rounded-md p-2 text-center hover:bg-gray-700/50 transition-colors"
                onClick={() => addSticker(sticker.id)}
              >
                <div className="text-2xl">{sticker.emoji}</div>
                <p className="text-white text-xs mt-1">{sticker.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex justify-center gap-4">
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center gap-2"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" /> Download
            </>
          )}
        </Button>
        <Button 
          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white flex items-center gap-2" 
          onClick={onReset}
          disabled={isDownloading}
        >
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
      </div>
      
      {/* Download progress modal */}
      <DownloadProgress />
      
      {/* Add ThankYouModal to the render */}
      <ThankYouModal />
    </div>
  );
}

export default CollageResult;