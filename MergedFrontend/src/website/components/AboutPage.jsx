import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Users, Award, Building, GraduationCap, DollarSign, Target, Lightbulb, Trophy } from 'lucide-react';
import '../../styles/AboutPage.css';
import Header from './Header';
import Footer from './Footer';
import nbk from '../../assets/imgs/nbk.jpg';

const AboutPage = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    // Create intersection observer with enhanced options
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-animate');
          
          if (entry.isIntersecting) {
            // Add element to visible set when it enters viewport
            setVisibleElements(prev => new Set([...prev, elementId]));
          } else {
            // Remove element from visible set when it leaves viewport
            // This allows re-animation when scrolling back
            setVisibleElements(prev => {
              const newSet = new Set(prev);
              newSet.delete(elementId);
              return newSet;
            });
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px' // Trigger animation when element is more visible
      }
    );

    // Observe all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const isVisible = (elementId) => visibleElements.has(elementId);

  return (
    <>
    <Header />
    <div className="about-page">
        
      {/* Hero Section */}
      
      <section 
        className={`hero-section ${isVisible('hero') ? 'animate-in' : ''}`}
        data-animate="hero"
      >
        <div className="hero-content">
          <h1 className="hero-title">Nara Bahadur Karmachariya Polytechnic Institute</h1>
          <h2 className="hero-subtitle">About Us</h2>
          <div className="hero-decorative-line"></div>
        </div>
      </section>

      {/* Main About Section */}
      <section 
        className={`main-section ${isVisible('about-main') ? 'animate-in' : ''}`}
        data-animate="about-main"
      >
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2 className="section-title">About Us</h2>
              <p className="about-description">
                NBK Pratisthan is a prestigious educational institution dedicated to providing quality education 
                and fostering holistic development of students. Our institution stands as a beacon of excellence 
                in the field of technical and vocational education, committed to shaping future leaders and 
                skilled professionals.
              </p>
              <p className="about-description">
                With a rich legacy of educational excellence, we have been instrumental in transforming lives 
                through comprehensive academic programs, skill development initiatives, and character building 
                activities. Our mission is to create well-rounded individuals who can contribute meaningfully 
                to society.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <img src={nbk} alt="NBK Pratisthan" className="about-image-placeholder" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section 
        className={`values-section ${isVisible('values') ? 'animate-in' : ''}`}
        data-animate="values"
      >
        <div className="container">
          <h2 className="section-title text-center text-white mb-12">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card" data-animate="value-1">
              <div className="value-icon">
                <Lightbulb size={40} />
              </div>
              <h3>Our Philosophy</h3>
              <p>The quality of education depends upon the understanding between teacher and student. We believe in nurturing minds through innovative teaching methodologies.</p>
            </div>
            <div className="value-card" data-animate="value-2">
              <div className="value-icon">
                <Target size={40} />
              </div>
              <h3>NBK's Principle</h3>
              <p>Education is the most powerful weapon that one can use to change the world. Nelson Mandela's words guide our educational approach.</p>
            </div>
            <div className="value-card" data-animate="value-3">
              <div className="value-icon">
                <Trophy size={40} />
              </div>
              <h3>Key Of Success</h3>
              <p>Success cannot be achieved without hardwork and discipline. We instill these values in every student to ensure their bright future.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section 
        className={`infrastructure-section ${isVisible('infrastructure') ? 'animate-in' : ''}`}
        data-animate="infrastructure"
      >
        <div className="container">
          <div className="infrastructure-grid">
            <div className="infrastructure-content">
              <h2 className="section-title">Special College Infrastructure</h2>
              <p className="infrastructure-description">
                The institution has strong modern physical infrastructure that safeguards students from natural disasters like earthquake and flood. Proper practical labs for each faculty, separate laboratories for boys and girls, safe and green drinking water, and round-the-clock security for students is the NBK's priority.
              </p>
              <div className="infrastructure-features">
                <div className="feature-item" data-animate="feature-1">
                  <Building size={24} />
                  <span>Modern Buildings</span>
                </div>
                <div className="feature-item" data-animate="feature-2">
                  <BookOpen size={24} />
                  <span>Advanced Laboratories</span>
                </div>
                <div className="feature-item" data-animate="feature-3">
                  <Users size={24} />
                  <span>Separate Facilities</span>
                </div>
              </div>
            </div>
            <div className="infrastructure-image">
              <div className="image-placeholder">
                <Building size={80} className="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section 
        className={`programs-section ${isVisible('programs') ? 'animate-in' : ''}`}
        data-animate="programs"
      >
        <div className="container">
          <h2 className="section-title text-center mb-12">Our Programs</h2>
          <div className="programs-grid">
            <div className="program-card" data-animate="program-1">
              <div className="program-image">
                <div className="image-placeholder">
                  <Users size={60} className="placeholder-icon" />
                </div>
              </div>
              <div className="program-content">
                <h3>Agricultural Training</h3>
                <p>
                  Our agricultural programs focus on modern farming techniques, sustainable practices, 
                  and innovative agricultural technologies. Students gain hands-on experience in crop 
                  management, soil science, and agricultural economics.
                </p>
              </div>
            </div>
            <div className="program-card" data-animate="program-2">
              <div className="program-image">
                <div className="image-placeholder">
                  <GraduationCap size={60} className="placeholder-icon" />
                </div>
              </div>
              <div className="program-content">
                <h3>Graduation Programs</h3>
                <p>
                  Each enrolled student will be rewarded with the graduation certificate at the end of their college journey. They mold character and intellect equally matters along with academics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section 
        className={`scholarships-section ${isVisible('scholarships') ? 'animate-in' : ''}`}
        data-animate="scholarships"
      >
        <div className="container">
          <div className="scholarships-grid">
            <div className="scholarships-content">
              <h2 className="section-title">Scholarships</h2>
              <p className="scholarships-description">
                The NBK will be glad to provide scholarships to those disciples who are physically challenged, economically weak, and with special abilities so they can be brilliant in their respective faculties. The institution encourages every student to be successful and get better opportunities.
              </p>
              <div className="scholarship-benefits">
                <div className="benefit-item" data-animate="benefit-1">
                  <Award size={24} />
                  <span>Merit-based Scholarships</span>
                </div>
                <div className="benefit-item" data-animate="benefit-2">
                  <DollarSign size={24} />
                  <span>Financial Aid</span>
                </div>
                <div className="benefit-item" data-animate="benefit-3">
                  <Users size={24} />
                  <span>Special Assistance</span>
                </div>
              </div>
            </div>
            <div className="scholarships-image">
              <div className="image-placeholder">
                <Award size={80} className="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        className={`gallery-section ${isVisible('gallery') ? 'animate-in' : ''}`}
        data-animate="gallery"
      >
        <div className="container">
          <h2 className="section-title text-center mb-12">Our Journey</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="gallery-item" 
                data-animate={`gallery-${item}`}
              >
                <div className="gallery-placeholder">
                  <BookOpen size={40} className="placeholder-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        className={`contact-section ${isVisible('contact') ? 'animate-in' : ''}`}
        data-animate="contact"
      >
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Get In Touch</h2>
              <div className="contact-details">
                <div className="contact-item" data-animate="contact-1">
                  <strong>Address:</strong>
                  <p>NBK Pratisthan Campus<br />Educational District</p>
                </div>
                <div className="contact-item" data-animate="contact-2">
                  <strong>Phone:</strong>
                  <p>+91 XXX XXX XXXX</p>
                </div>
                <div className="contact-item" data-animate="contact-3">
                  <strong>Email:</strong>
                  <p>info@nbkpratisthan.edu</p>
                </div>
              </div>
            </div>
            <div className="contact-map">
              <div className="map-placeholder">
                <div className="map-icon">📍</div>
                <p>Interactive Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
};

export default AboutPage;