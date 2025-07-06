import React, { useState, useEffect, useRef } from 'react';
import nirmalBaral from '../../assets/imgs/nirmalbaral.jpg'; // Adjust the path as necessary
import faculty2 from '../../assets/imgs/nirmalbaral.jpg'; // Add your second faculty image
import faculty3 from '../../assets/imgs/nirmalbaral.jpg'; // Add your third faculty image

function Faculty() {
  const [visibleSections, setVisibleSections] = useState([false, false, false]);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRefs = [sectionRef1, sectionRef2, sectionRef3];

  useEffect(() => {
    const handleScroll = () => {
      const newVisibleSections = [...visibleSections];
      
      sectionRefs.forEach((ref, index) => {
        if (!ref.current) return;

        const section = ref.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if the section is in viewport
        const isInViewport = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
        
        if (isInViewport !== newVisibleSections[index]) {
          newVisibleSections[index] = isInViewport;
        }
      });
      
      if (JSON.stringify(newVisibleSections) !== JSON.stringify(visibleSections)) {
        setVisibleSections(newVisibleSections);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleSections]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Spacer section to allow scrolling */}
      <section className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-5xl lg:text-6xl font-light text-gray-300">
            Our Faculties
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xl">
            Scroll down to explore our faculties
          </p>
          <div className="animate-bounce mt-8">
            <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 1 - Image left, text right */}
      <section ref={sectionRefs[0]} className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Watch Image - Slides from left */}
            <div 
              className={`relative transition-all duration-1000 ease-out ${
                visibleSections[0] 
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform -translate-x-full opacity-0'
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-transparent rounded-full blur-3xl scale-150"></div>
                <img
                  src={nirmalBaral}
                  alt="Mr. Nirmal Baral"
                  className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl rounded-lg"
                />
              </div>
            </div>

            {/* Text Content - Slides from right */}
            <div 
              className={`space-y-8 transition-all duration-1000 ease-out delay-200 ${
                visibleSections[0]
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform translate-x-full opacity-0'
              }`}
            >
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide">
                  Mr. Nirmal Baral
                </h1>
                
                <div className="w-24 h-px bg-gradient-to-r from-white to-transparent"></div>
                
                <p className="text-gray-300 text-lg lg:text-sm text-justify leading-relaxed max-w-2xl">
                  Mr. Nirmal Baral, the Chairperson of Narabahadur Karmacharya Polytechnic Institute in Itahari, is a dedicated educational leader known for his commitment to accessible and skill-based education. Under his guidance, the institute has strengthened its focus on technical excellence, inclusivity, and practical training for students from diverse backgrounds. With a vision to empower youth through hands-on learning and community involvement, Mr. Baral has played a key role in expanding the institute's infrastructure, promoting industry-relevant programs, and fostering an environment that encourages both academic and personal growth. His leadership continues to drive the institution toward producing competent, confident, and socially responsible graduates.
                </p>
              </div>

              <div className="pt-4">
                <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25">
                  <span className="relative z-10  cursor-pointer">See more</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Image right, text left */}
      <section ref={sectionRefs[1]} className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-900/50">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content - Slides from left */}
            <div 
              className={`space-y-8 transition-all duration-1000 ease-out ${
                visibleSections[1]
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform -translate-x-full opacity-0'
              }`}
            >
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide">
                  Dr. Jane Smith
                </h1>
                
                <div className="w-24 h-px bg-gradient-to-r from-white to-transparent"></div>
                
                <p className="text-gray-300 text-lg lg:text-sm text-justify leading-relaxed max-w-2xl">
                  Dr. Jane Smith is a renowned expert in technical education with over 15 years of experience in curriculum development and student mentorship. As the Head of Department for Computer Engineering, she has implemented innovative teaching methodologies that bridge the gap between academia and industry requirements. Her research in applied computer science has been published in numerous international journals, and she actively collaborates with tech companies to provide students with real-world project experience. Dr. Smith's passion for empowering women in STEM fields has led to the establishment of several scholarship programs and mentorship initiatives at the institute.
                </p>
              </div>

              <div className="pt-4">
                <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25">
                  <span className="relative z-10  cursor-pointer">See more</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Watch Image - Slides from right */}
            <div 
              className={`relative transition-all duration-1000 ease-out delay-200 ${
                visibleSections[1]
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform translate-x-full opacity-0'
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-l from-gray-800/20 to-transparent rounded-full blur-3xl scale-150"></div>
                <img
                  src={faculty2}
                  alt="Dr. Jane Smith"
                  className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Image left, text right */}
      <section ref={sectionRefs[2]} className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Watch Image - Slides from left */}
            <div 
              className={`relative transition-all duration-1000 ease-out ${
                visibleSections[2]
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform -translate-x-full opacity-0'
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-transparent rounded-full blur-3xl scale-150"></div>
                <img
                  src={faculty3}
                  alt="Prof. John Doe"
                  className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl rounded-lg"
                />
              </div>
            </div>

            {/* Text Content - Slides from right */}
            <div 
              className={`space-y-8 transition-all duration-1000 ease-out delay-200 ${
                visibleSections[2]
                  ? 'transform translate-x-0 opacity-100' 
                  : 'transform translate-x-full opacity-0'
              }`}
            >
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide">
                  Prof. John Doe
                </h1>
                
                <div className="w-24 h-px bg-gradient-to-r from-white to-transparent"></div>
                
                <p className="text-gray-300 text-lg lg:text-sm text-justify leading-relaxed max-w-2xl">
                  Prof. John Doe brings over 20 years of industry experience to his role as the Director of Civil Engineering programs. His practical approach to teaching combines theoretical knowledge with hands-on fieldwork, preparing students for the challenges of modern construction and infrastructure development. Prof. Doe has led numerous community development projects that serve as both learning opportunities for students and valuable contributions to local municipalities. His expertise in sustainable building practices has positioned the institute as a leader in environmentally conscious engineering education. Under his guidance, the Civil Engineering department has established partnerships with leading construction firms across the country.
                </p>
              </div>

              <div className="pt-4">
                <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25">
                  <span className="relative z-10  cursor-pointer">See more</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faculty;