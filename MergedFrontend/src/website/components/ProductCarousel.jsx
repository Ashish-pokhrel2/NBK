import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import plcimg from '../../assets/imgs/nbk.jpg'; // Adjust the path as necessary

const products = [
  {
    id: 1,
    name: "Diploma in Civil Engineering",
    image: plcimg,
  },
  {
    id: 2,
    name: "Diploma in Hotel Management",
    image: plcimg,
  },
  {
    id: 3,
    name: "Diploma in Agriculture",
    image: plcimg,
  },
  {
    id: 4,
    name: "Diploma in Pharmacy",
    image: plcimg,
  },
  {
    id: 5,
    name: "Diploma in Computer Engineering",
    image: plcimg,
  },
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [direction, setDirection] = useState('next'); // 'next' or 'prev'

  const handlePrevious = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  };

  const getVisibleProducts = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + products.length) % products.length;
      visible.push({ ...products[index], position: i });
    }
    return visible;
  };

  const getCardStyle = (position) => {
    const isCenter = position === 0;

    if (isCenter) {
      return {
        transform: `translateX(0px) translateZ(0px) rotateY(0deg) scale(1)`,
        opacity: 1,
        zIndex: 20,
      };
    }

    const baseX = 200;
    const baseZ = 100;
    const baseScale = 0.75;
    const rotation = 35;

    const translateX = position * baseX;
    const translateZ = -Math.abs(position) * baseZ;
    const rotateY = direction === 'next'
      ? (position > 0 ? -rotation : rotation)
      : (position > 0 ? rotation : -rotation);
    const scale = baseScale - Math.abs(position) * 0.1;
    const opacity = Math.abs(position) > 1 ? 0.3 : 0.7;
    const zIndex = 10 - Math.abs(position);

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-6xl font-bold text-gray-800 text-center mb-20 tracking-tight">
          Our Courses
        </h1>

        <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-8 z-30 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-7 h-7 text-gray-700" />
          </button>

          {/* Carousel Cards */}
          <div className="relative w-full max-w-6xl h-[600px]" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {getVisibleProducts().map((product) => (
                <div
                  key={product.id}
                  className="absolute transition-transform duration-700 ease-in-out"
                  style={{
                    ...getCardStyle(product.position),
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div
                    className={`w-80 h-110 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 transform-gpu ${
                      product.position === 0
                        ? 'bg-white border-4 border-blue-200'
                        : 'bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {/* Image */}
                    <div className="h-66 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-2xl shadow-md"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-6 text-center">
                      <h3
                        className={`text-xl font-semibold mb-6 ${
                          product.position === 0 ? 'text-gray-800' : 'text-gray-600'
                        }`}
                      >
                        {product.name}
                      </h3>
                      <button
                        className={`w-full cursor-pointer py-4 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                          product.position === 0
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transform hover:scale-105'
                            : 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white opacity-80'
                        }`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-8 z-30 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Next product"
          >
            <ChevronRight className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'next' : 'prev');
                setCurrentIndex(index);
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125 shadow-lg'
                  : 'bg-gray-400 hover:bg-gray-500 hover:scale-110'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
