import React, { useEffect, useRef } from 'react';
import '../../styles/SecondHero.css';

const SecondHero = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const titleElement = titleRef.current;
      const contentElement = contentRef.current;
      const windowHeight = window.innerHeight;

      if (titleElement && contentElement) {
        const titlePosition = titleElement.getBoundingClientRect().top;
        const contentPosition = contentElement.getBoundingClientRect().top;

        // Animate title when it comes into view, else reset
        if (titlePosition < windowHeight * 0.75 && titlePosition > 0) {
          titleElement.style.transform = 'translateX(0)';
          titleElement.style.opacity = '1';
        } else {
          titleElement.style.transform = 'translateX(-100px)';
          titleElement.style.opacity = '0';
        }

        // Animate content when it comes into view, else reset
        if (contentPosition < windowHeight * 0.75 && contentPosition > 0) {
          contentElement.style.transform = 'translateX(0)';
          contentElement.style.opacity = '1';
        } else {
          contentElement.style.transform = 'translateX(100px)';
          contentElement.style.opacity = '0';
        }
      }
    };

    // Run once initially to set starting state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="second-hero">
      <div className="second-hero-container">
        <h1 
          ref={titleRef}
          className="second-hero-title"
          style={{ transform: 'translateX(-100px)', opacity: 0, transition: 'all 0.6s ease' }}
        >
          NARABAHADUR KARMACHARIYA POLYTECHNIC INSTITUTE
        </h1>
        
        <div 
          ref={contentRef}
          className="second-hero-content"
          style={{ transform: 'translateX(100px)', opacity: 0, transition: 'all 0.6s ease' }}
        >
          <p>
            Narabahadur Karmacharya Polytechnic Institute (NBK Pratisthan), located in Itahari, Sunsari, is a CTEVT-affiliated technical school established in 2016 to honor the late Nara Bahadur Karmacharya, a pioneer in democracy and education in Nepal. The institute offers affordable, practical diploma programs in Civil Engineering, Hotel Management, Agriculture, and Pharmacy, mainly for students from marginalized backgrounds, with scholarship opportunities available. <br />
            NBK provides a well-equipped campus with earthquake- and flood-resistant buildings, modern labs, a canteen, clean water, and transport facilities. It promotes holistic development through sports and cultural activities, guided by the belief that “Education is the most powerful weapon.” Graduates receive nationally recognized diplomas that prepare them for employment or higher education. <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondHero;
