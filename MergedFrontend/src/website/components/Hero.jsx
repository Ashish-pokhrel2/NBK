import React from 'react';
import '../../styles/home.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <video
        autoPlay
        muted
        loop
        className="hero-video"
        poster="/src/assets/imgs/nbk.jpg"
      >
        <source src="/src/assets/imgs/hero-section.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>Welcome to NBK</h1>
        <p>Empowering Education, Building Futures</p>
      </div>
    </div>
  );
};

export default Hero;