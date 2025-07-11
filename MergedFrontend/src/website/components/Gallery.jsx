import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Grid, List } from 'lucide-react';
import Header from './Header';
import ImageModal from './ImageModal';
import axios from '../../api/axios';


function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryList, setGalleryList] = useState([]);  // (Gallery response contains :  ImageID, Title and ImagePath)

   const fetchGallery = async () => {
    try {
      const res = await axios.get("/gallery/list");
      setGalleryList(res.data.data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };


useEffect(() => {
    fetchGallery();
  }, []);






  const categories = ['all', 'nature', 'architecture', 'people', 'abstract', 'urban'];



  const filteredItems = galleryList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all'; // Since backend doesn't have categories yet
    return matchesSearch && matchesCategory;
  });

  const handleItemClick = (item) => {
    // Transform backend data to match ImageModal expectations
    const transformedItem = {
      id: item.ImageID,
      url: `http://localhost:8000/uploads/${item.ImagePath}`,
      title: item.title,
      photographer: 'Unknown', // Default value since backend doesn't provide this
      category: 'general', // Default value since backend doesn't provide this
      dimensions: '1920x1080', // Default value since backend doesn't provide this
      size: 'N/A' // Default value since backend doesn't provide this
    };
    setSelectedItem(transformedItem);
    setModalOpen(true);
  };

  const handleNext = () => {
    const currentIndex = filteredItems.findIndex(item => item.ImageID === selectedItem.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      const nextItem = filteredItems[nextIndex];
      const transformedItem = {
        id: nextItem.ImageID,
        url: `http://localhost:8000/uploads/${nextItem.ImagePath}`,
        title: nextItem.title,
        photographer: 'Unknown',
        category: 'general',
        dimensions: '1920x1080',
        size: 'N/A'
      };
      setSelectedItem(transformedItem);
    }
  };

  const handlePrevious = () => {
    const currentIndex = filteredItems.findIndex(item => item.ImageID === selectedItem.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      const prevItem = filteredItems[prevIndex];
      const transformedItem = {
        id: prevItem.ImageID,
        url: `http://localhost:8000/uploads/${prevItem.ImagePath}`,
        title: prevItem.title,
        photographer: 'Unknown',
        category: 'general',
        dimensions: '1920x1080',
        size: 'N/A'
      };
      setSelectedItem(transformedItem);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredItems.length / 6));
  }, [filteredItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredItems.length / 6)) % Math.ceil(filteredItems.length / 6));
  }, [filteredItems.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, filteredItems.length]);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-white to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl h-20 md:text-6xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Our gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover breathtaking images from talented photographers around the world. 
              Each photo tells a unique story waiting to be explored.
            </p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="flex items-center gap-4">
                
                
                <div className="flex bg-gray-100 rounded-xl p-1">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Slideshow Header */}
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-blue-600 rounded-2xl shadow-xl mb-8 overflow-hidden">
            <div className="flex justify-between items-center p-8 text-white">
              <button 
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm transform hover:scale-105 cursor-pointer"
              >
                <ChevronLeft size={32} />
              </button>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Featured Gallery</h2>
                <p className="text-red-100">
                  {filteredItems.length} amazing photos • Slide {currentSlide + 1} of {Math.ceil(filteredItems.length / 6)}
                </p>
              </div>
              
              <button 
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm transform hover:scale-105 cursor-pointer"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 auto-rows-[200px]">
            {filteredItems.map((item, index) => (
              <div
                key={item.ImageID}
                className={`
                  group relative cursor-pointer overflow-hidden rounded-xl shadow-lg
                  transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                  bg-gradient-to-br from-red-100 to-blue-100
                  ${selectedItem?.id === item.ImageID ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
                `}
                onClick={() => handleItemClick(item)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <img 
                  src={`http://localhost:8000/uploads/${item.ImagePath}`} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-200">by Unknown</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        General
                      </span>
                      <span className="text-xs text-gray-300">1920x1080</span>
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No photos found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        image={selectedItem}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentIndex={selectedItem ? filteredItems.findIndex(item => item.ImageID === selectedItem.id) : 0}
        totalImages={filteredItems.length}
      />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default Gallery;