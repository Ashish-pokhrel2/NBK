import React from 'react';
import heroVid from '../../assets/imgs/nbk.jpg';
import '../../styles/home.css';
import { useNavigate } from 'react-router-dom';

const VideoPlayer = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/courses');
  };

  // Add error handling for video
  const handleVideoError = (e) => {
    console.error("Video failed to load", e);
  };

  return (
    <div 
      id="video-box" 
      className="relative w-full h-screen bg-black" // Added fallback background
      style={{ minHeight: '500px' }} // Ensure minimum height
    >
      {/* Video Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img src={heroVid} alt="placeholder" id="hero" />
      </div>

      {/* Overlay Content - now with z-index */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} // Semi-transparent overlay
      >
        <h1 
          className="text-white text-4xl md:text-6xl px-4 md:px-20 pb-4 md:pb-8 font-bold"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
        >
          NARABAHADUR KARMACHARIYA POLYTECHNIC INSTITUTE
        </h1>
        <h3 
          className="text-white text-lg md:text-xl font-bold pb-8 md:pb-10"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          आत्मनिर्भरता को लागि प्राविधिक शिक्षा
        </h3>
        <button 
          onClick={handleButtonClick}
          className="text-white bg-blue-700 hover:bg-red-700 text-xl md:text-2xl font-bold py-2 px-8 md:py-3 md:px-12 rounded mt-1 cursor-pointer transition-all duration-300 transform hover:scale-105"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          See Courses
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;