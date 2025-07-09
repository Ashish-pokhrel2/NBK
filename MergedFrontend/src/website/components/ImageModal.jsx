import React, { useState, useEffect } from 'react';
import { X, Download, Share2, Copy, ChevronLeft, ChevronRight, Heart, Info } from 'lucide-react';

function ImageModal({ image, isOpen, onClose, onNext, onPrevious, currentIndex, totalImages }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onNext, onPrevious]);

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop, not the image or controls
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = async () => {
    try {
      console.log('🔽 Starting download for:', image.title);
      
      // Extract filename from image URL
      const urlParts = image.url.split('/');
      const filename = urlParts[urlParts.length - 1];
      
      // Use the dedicated download endpoint
      const downloadUrl = `http://localhost:8000/api/v1/gallery/download/${filename}`;
      
      // Create download link that forces download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = `${(image.title || 'image').replace(/[^a-z0-9\s]/gi, '_')}-${image.id}.${filename.split('.').pop()}`;
      a.setAttribute('target', '_blank');
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      console.log('✅ Download initiated successfully!');
    } catch (error) {
      console.error('❌ Download failed:', error);
      
      // Fallback: try blob method
      try {
        console.log('🔄 Trying fallback blob download...');
        const response = await fetch(image.url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${(image.title || 'image').replace(/[^a-z0-9\s]/gi, '_')}-${image.id}.jpg`;
        
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
        
        console.log('✅ Fallback download completed!');
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
        // Last resort: open in new window with download suggestion
        const newWindow = window.open(image.url, '_blank');
        if (newWindow) {
          console.log('📂 Opened in new tab - right-click to save');
        }
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(image.url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Check out this amazing photo: ${image.title}`,
          url: image.url,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      handleCopy();
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
      onClick={handleBackdropClick}
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-4 text-white">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {currentIndex + 1} of {totalImages}
            </div>
            <h3 className="text-lg font-semibold truncate max-w-md">{image.title}</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={handleCopy}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 backdrop-blur-sm relative cursor-pointer"
            >
              <Copy size={20} />
              {showCopied && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  Copied!
                </div>
              )}
            </button>
            
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 backdrop-blur-sm cursor-pointer"
            >
              <Share2 size={20} />
            </button>
            
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 cursor-pointer"
            >
              <Download size={20} />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 backdrop-blur-sm cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm cursor-pointer border border-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm cursor-pointer border border-white/20"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image Container */}
      <div className="flex-1 flex items-center justify-center p-6 min-h-0">
        <div className="relative flex items-center justify-center w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            src={image.url}
            alt={image.title}
            className={`max-w-full max-h-full object-contain transition-opacity duration-500 rounded-lg shadow-2xl ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error('Image failed to load:', e);
              setImageLoaded(true); // Show broken image instead of infinite loading
            }}
            style={{
              objectFit: 'contain',
              objectPosition: 'center',
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto'
            }}
          />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="flex-shrink-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Info size={16} />
                <span className="text-sm">{image.photographer || 'Unknown'}</span>
              </div>
              <div className="text-sm text-white/70">
                {image.category || 'Gallery'}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-white/70">
              <span>{image.dimensions || 'N/A'}</span>
              <span>•</span>
              <span>{image.size || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;