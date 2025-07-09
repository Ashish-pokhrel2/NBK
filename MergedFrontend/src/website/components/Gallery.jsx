import React, { useState, useEffect } from 'react';
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

  // const gridItems = [
  //   { 
  //     id: 1, 
  //     type: 'large', 
  //     url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Mountain Landscape',
  //     photographer: 'John Doe',
  //     category: 'nature',
  //     dimensions: '1920x1080',
  //     size: '2.4 MB'
  //   },
  //   { 
  //     id: 2, 
  //     type: 'medium',
  //     url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'City Architecture',
  //     photographer: 'Jane Smith',
  //     category: 'architecture',
  //     dimensions: '1920x1080',
  //     size: '1.8 MB'
  //   },
  //   { 
  //     id: 3, 
  //     type: 'small',
  //     url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Portrait Study',
  //     photographer: 'Mike Johnson',
  //     category: 'people',
  //     dimensions: '1080x1350',
  //     size: '1.2 MB'
  //   },
  //   { 
  //     id: 4, 
  //     type: 'tall',
  //     url: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop',
  //     title: 'Abstract Colors',
  //     photographer: 'Sarah Wilson',
  //     category: 'abstract',
  //     dimensions: '1080x1920',
  //     size: '2.1 MB'
  //   },
  //   { 
  //     id: 5, 
  //     type: 'small',
  //     url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Ocean Waves',
  //     photographer: 'David Brown',
  //     category: 'nature',
  //     dimensions: '1920x1080',
  //     size: '3.2 MB'
  //   },
  //   { 
  //     id: 6, 
  //     type: 'small',
  //     url: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Urban Street',
  //     photographer: 'Lisa Garcia',
  //     category: 'urban',
  //     dimensions: '1920x1080',
  //     size: '1.9 MB'
  //   },
  //   { 
  //     id: 7, 
  //     type: 'small',
  //     url: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Forest Path',
  //     photographer: 'Tom Anderson',
  //     category: 'nature',
  //     dimensions: '1920x1080',
  //     size: '2.7 MB'
  //   },
  //   { 
  //     id: 8, 
  //     type: 'large',
  //     url: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Modern Building',
  //     photographer: 'Emma Davis',
  //     category: 'architecture',
  //     dimensions: '1920x1080',
  //     size: '2.0 MB'
  //   },
  //   { 
  //     id: 9, 
  //     type: 'small',
  //     url: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Sunset Portrait',
  //     photographer: 'Chris Lee',
  //     category: 'people',
  //     dimensions: '1080x1350',
  //     size: '1.5 MB'
  //   },
  //   { 
  //     id: 10, 
  //     type: 'small',
  //     url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Geometric Patterns',
  //     photographer: 'Alex Turner',
  //     category: 'abstract',
  //     dimensions: '1920x1080',
  //     size: '1.7 MB'
  //   },
  //   { 
  //     id: 11, 
  //     type: 'small',
  //     url: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'City Lights',
  //     photographer: 'Maria Rodriguez',
  //     category: 'urban',
  //     dimensions: '1920x1080',
  //     size: '2.3 MB'
  //   },
  //   { 
  //     id: 12, 
  //     type: 'tall',
  //     url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop',
  //     title: 'Waterfall',
  //     photographer: 'Kevin White',
  //     category: 'nature',
  //     dimensions: '1080x1920',
  //     size: '3.5 MB'
  //   },
  //   { 
  //     id: 13, 
  //     type: 'small',
  //     url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Glass Reflection',
  //     photographer: 'Nina Taylor',
  //     category: 'architecture',
  //     dimensions: '1920x1080',
  //     size: '1.6 MB'
  //   },
  //   { 
  //     id: 14, 
  //     type: 'medium',
  //     url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  //     title: 'Creative Portrait',
  //     photographer: 'Ryan Clark',
  //     category: 'people',
  //     dimensions: '1920x1080',
  //     size: '2.2 MB'
  //   }
  // ];

  const filteredItems = galleryList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.photographer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleNext = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredItems.length / 6));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredItems.length / 6)) % Math.ceil(filteredItems.length / 6));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [filteredItems.length]);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-white to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Stunning Photography Collection
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
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <List size={20} />
                  </button>
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
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm transform hover:scale-105"
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
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm transform hover:scale-105"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 auto-rows-[200px]">
            {galleryList.map((item, index) => (
              <div
                key={item.id}
                className={`
                  group relative cursor-pointer overflow-hidden rounded-xl shadow-lg
                  transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                  bg-gradient-to-br from-red-100 to-blue-100
                  ${item.type === 'large' ? 'col-span-2 row-span-2' : ''}
                  ${item.type === 'medium' ? 'col-span-2' : ''}
                  ${item.type === 'tall' ? 'row-span-2' : ''}
                  ${selectedItem?.id === item.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
                `}
                onClick={() => handleItemClick(item)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <img 
                  src={`http://localhost:5000/uploads/${item.ImagePath}`} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-200">by {item.photographer}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-300">{item.dimensions}</span>
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
        currentIndex={selectedItem ? filteredItems.findIndex(item => item.id === selectedItem.id) : 0}
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