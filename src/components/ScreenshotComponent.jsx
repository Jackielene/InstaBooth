import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

function ScreenshotComponent() {
  const captureRef = useRef(null);
  
  const captureScreenshot = () => {
    if (captureRef.current) {
      // Options can be passed as a second parameter
      const options = {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS images
        allowTaint: true, 
        backgroundColor: null,
        logging: false,
        foreignObjectRendering: true
      };
      
      html2canvas(captureRef.current, options).then(canvas => {
        // Convert canvas to image
        const image = canvas.toDataURL('image/png');
        
        // Download the image
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = image;
        link.click();
      });
    }
  };

  return (
    <div>
      <div ref={captureRef} style={{ padding: '20px', border: '1px solid #ddd' }}>
        <h2>This content will be captured</h2>
        <p>html2canvas will take a screenshot of this div</p>
        <img src="https://example.com/image.jpg" alt="Example" />
      </div>
      
      <button onClick={captureScreenshot} style={{ marginTop: '20px' }}>
        Take Screenshot
      </button>
    </div>
  );
}

export default ScreenshotComponent;