import React, { useState } from 'react';
import { BookOpen, Award, Users, Clock, Calendar, MapPin, X, ChevronRight, Star, TrendingUp, Globe, CheckCircle } from 'lucide-react';
import '../../styles/courses.css';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
const coursesData = [
  {
    id: 1,
    title: "Diploma in Civil Engineering",
    category: "Engineering",
    duration: "3 Years",
    level: "Diploma",
    rating: 4.8,
    students: 1250,
    image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Master the fundamentals of civil engineering with hands-on experience in construction, design, and project management.",
    fullDescription: "Our comprehensive Diploma in Civil Engineering program provides students with a solid foundation in construction technology, structural design, surveying, and project management. This three-year program combines theoretical knowledge with practical applications, ensuring graduates are industry-ready with cutting-edge skills in modern construction techniques.",
    highlights: [
      "Industry-standard software training (AutoCAD, Revit, STAAD Pro)",
      "Real construction site visits and internships",
      "Expert faculty with 15+ years industry experience",
      "State-of-the-art structural testing laboratory"
    ],
    curriculum: [
      "Engineering Mathematics & Applied Physics",
      "Building Construction & Advanced Materials",
      "Structural Design & Seismic Analysis",
      "Surveying & Geographic Information Systems",
      "Transportation & Highway Engineering",
      "Water Resources & Environmental Engineering",
      "Construction Project Management",
      "Building Information Modeling (BIM)",
      "Quantity Surveying & Cost Estimation",
      "Concrete Technology & Testing"
    ],
    career: [
      "Site Engineer - $45,000-65,000/year",
      "Structural Designer - $50,000-75,000/year",
      "Project Coordinator - $48,000-68,000/year",
      "Quality Control Inspector - $42,000-58,000/year",
      "Construction Supervisor - $55,000-80,000/year",
      "Building Inspector - $46,000-62,000/year"
    ],
    fees: "$12,000",
    intake: "September & January",
    jobPlacement: "94%",
    accreditation: "CTEVT Recognized"
  },
  {
    id: 2,
    title: "Diploma in Pharmacy",
    category: "Healthcare",
    duration: "2 Years",
    level: "Diploma",
    rating: 4.9,
    students: 890,
    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Learn pharmaceutical sciences, drug dispensing, and patient care in our comprehensive pharmacy program.",
    fullDescription: "The Diploma in Pharmacy is designed to prepare competent pharmacy technicians who can work effectively in various pharmaceutical settings. Students learn about drug composition, effects, and proper dispensing procedures while developing strong patient interaction skills and understanding of modern pharmaceutical practices.",
    highlights: [
      "Modern pharmaceutical laboratory with latest equipment",
      "Clinical rotations in top hospitals and pharmacies",
      "Pharmacovigilance and drug safety training",
      "Digital pharmacy management systems training"
    ],
    curriculum: [
      "Pharmaceutical Chemistry & Drug Analysis",
      "Pharmacology & Advanced Toxicology",
      "Clinical Pharmacy Practice",
      "Hospital & Institutional Pharmacy",
      "Community Pharmacy & Patient Counseling",
      "Pharmaceutical Jurisprudence & Ethics",
      "Biochemistry & Clinical Pathophysiology",
      "Pharmacovigilance & Drug Safety",
      "Pharmaceutical Marketing & Management",
      "Herbal Medicine & Natural Products"
    ],
    career: [
      "Pharmacy Technician - $35,000-48,000/year",
      "Hospital Pharmacist Assistant - $38,000-52,000/year",
      "Drug Inspector - $42,000-58,000/year",
      "Medical Representative - $40,000-65,000/year",
      "Pharmaceutical Sales Executive - $45,000-70,000/year",
      "Clinical Research Associate - $48,000-68,000/year"
    ],
    fees: "$8,500",
    intake: "August & February",
    jobPlacement: "96%",
    accreditation: "CTEVT Recognized"
  },
  {
    id: 3,
    title: "Diploma in Agriculture",
    category: "Agriculture",
    duration: "2 Years",
    level: "Diploma",
    rating: 4.7,
    students: 650,
    image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Explore modern farming techniques, crop management, and sustainable agriculture practices.",
    fullDescription: "Our Diploma in Agriculture program focuses on modern agricultural practices, sustainable farming methods, and agricultural business management. Students gain hands-on experience through field work and laboratory sessions, preparing them for careers in the rapidly evolving agricultural sector with emphasis on precision farming and sustainable practices.",
    highlights: [
      "50-acre experimental farm for practical training",
      "Drone technology and precision agriculture training",
      "Organic farming and sustainable practices focus",
      "Agricultural entrepreneurship development program"
    ],
    curriculum: [
      "Crop Production & Advanced Agronomy",
      "Soil Science & Nutrient Management",
      "Integrated Pest Management",
      "Agricultural Economics & Farm Business",
      "Farm Machinery & Precision Agriculture",
      "Horticulture & Protected Cultivation",
      "Animal Husbandry & Dairy Science",
      "Agricultural Extension & Rural Development",
      "Post-Harvest Technology & Food Processing",
      "Climate-Smart Agriculture"
    ],
    career: [
      "Agricultural Officer - $38,000-55,000/year",
      "Farm Manager - $42,000-62,000/year",
      "Agricultural Consultant - $45,000-68,000/year",
      "Crop Production Specialist - $40,000-58,000/year",
      "Agricultural Sales Representative - $36,000-52,000/year",
      "Extension Officer - $35,000-48,000/year"
    ],
    fees: "$6,500",
    intake: "July & January",
    jobPlacement: "89%",
    accreditation: "CTEVT Recognized"
  },
  {
    id: 4,
    title: "Diploma in Hotel Management",
    category: "Hospitality",
    duration: "2 Years",
    level: "Diploma",
    rating: 4.8,
    students: 1100,
    image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Master hospitality operations, customer service excellence, and hotel administration.",
    fullDescription: "The Diploma in Hotel Management prepares students for exciting careers in the hospitality industry. Our program covers all aspects of hotel operations, from front office management to food service, event planning, and customer relations, with extensive practical training in our on-campus training hotel and partnerships with luxury hotel chains.",
    highlights: [
      "On-campus training hotel with 50 rooms",
      "Internships with 5-star hotel chains",
      "International cuisine and culinary arts training",
      "Digital hospitality management systems"
    ],
    curriculum: [
      "Hotel Operations & Strategic Management",
      "Food & Beverage Service Excellence",
      "Front Office Operations & Guest Relations",
      "Housekeeping & Facility Management",
      "Culinary Arts & Kitchen Management",
      "Hospitality Marketing & Revenue Management",
      "Event Management & Wedding Planning",
      "Tourism & Destination Management",
      "Hotel Finance & Cost Control",
      "Hospitality Law & Ethics"
    ],
    career: [
      "Hotel Manager - $48,000-75,000/year",
      "Front Desk Supervisor - $35,000-48,000/year",
      "Food & Beverage Manager - $42,000-62,000/year",
      "Event Coordinator - $38,000-55,000/year",
      "Tourism Officer - $36,000-52,000/year",
      "Guest Relations Manager - $40,000-58,000/year"
    ],
    fees: "$7,800",
    intake: "September & March",
    jobPlacement: "92%",
    accreditation: "CTEVT Recognized"
  },
  {
    id: 5,
    title: "Professional Barista Course",
    category: "Culinary",
    duration: "3 Months",
    level: "Certificate",
    rating: 4.9,
    students: 320,
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Perfect your coffee craft with advanced brewing techniques and latte art mastery.",
    fullDescription: "Our intensive Professional Barista Course is designed for coffee enthusiasts who want to master the art and science of coffee making. Learn from experienced professionals about bean selection, grinding, brewing techniques, and creating beautiful latte art that will impress customers. This comprehensive program covers everything from coffee origins to business management for aspiring cafe owners.",
    highlights: [
      "Professional espresso machines and grinders",
      "Coffee cupping and sensory evaluation training",
      "Latte art competitions and certifications",
      "Coffee shop business planning workshop"
    ],
    curriculum: [
      "Coffee Origins & Bean Selection",
      "Espresso Machine Mastery & Maintenance",
      "Milk Steaming & Texturing Techniques",
      "Advanced Latte Art & Presentation",
      "Alternative Brewing Methods",
      "Customer Service in Coffee Culture",
      "Coffee Shop Operations & Management",
      "Specialty Drink Creation & Menu Development",
      "Coffee Roasting Fundamentals",
      "Barista Competition Preparation"
    ],
    career: [
      "Professional Barista - $28,000-42,000/year",
      "Coffee Shop Supervisor - $32,000-45,000/year",
      "Cafe Manager - $38,000-55,000/year",
      "Coffee Quality Controller - $35,000-48,000/year",
      "Coffee Trainer - $40,000-58,000/year",
      "Coffee Shop Owner - $45,000-85,000/year"
    ],
    fees: "$1,200",
    intake: "Monthly",
    jobPlacement: "87%",
    accreditation: "CTEVT Recognized"
  },
  {
    id: 6,
    title: "Professional Waiter Course",
    category: "Service",
    duration: "2 Months",
    level: "Certificate",
    rating: 4.6,
    students: 280,
    image: "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Excel in professional food service with customer relations and dining etiquette expertise.",
    fullDescription: "The Professional Waiter Course provides comprehensive training in food and beverage service, customer relations, and restaurant operations. Students learn proper serving techniques, wine service, and how to create exceptional dining experiences for guests. This program prepares graduates for positions in fine dining establishments, hotels, and upscale restaurants.",
    highlights: [
      "Fine dining service simulation restaurant",
      "Wine sommelier basics and pairing training",
      "Multi-language customer service training",
      "Restaurant management fundamentals"
    ],
    curriculum: [
      "Professional Service Techniques & Standards",
      "Menu Knowledge & Food Presentation",
      "Wine Service & Beverage Pairing",
      "Customer Relations & Conflict Resolution",
      "Table Setting & International Dining Etiquette",
      "POS System Operations & Payment Processing",
      "Food Safety & Hygiene Certification",
      "Complaint Handling & Service Recovery",
      "Restaurant Operations & Teamwork",
      "Upselling Techniques & Sales Skills"
    ],
    career: [
      "Professional Waiter/Waitress - $25,000-38,000/year",
      "Restaurant Supervisor - $32,000-45,000/year",
      "Banquet Server - $28,000-40,000/year",
      "Fine Dining Specialist - $35,000-52,000/year",
      "Food Service Coordinator - $30,000-42,000/year",
      "Restaurant Trainer - $38,000-55,000/year"
    ],
    fees: "$800",
    intake: "Monthly",
    jobPlacement: "91%",
    accreditation: "CTEVT Recognized"
  }
];

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCourse(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="courses-container">
      <Header />
      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <div className="header-badge">
            <Star size={16} />
            <span>Quality Education Since 2017</span>
          </div>
          <h1 className="main-title">Transform Your Future</h1>
          <p className="subtitle">Discover world-class professional courses designed by industry experts to accelerate your career growth and unlock unlimited opportunities</p>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Graduates</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">94%</div>
              <div className="stat-label">Job Placement</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Industry Partners</div>
            </div>
          </div>
        </div>
        <div className="floating-elements">
          <div className="floating-icon icon-1"><BookOpen size={24} /></div>
          <div className="floating-icon icon-2"><Award size={24} /></div>
          <div className="floating-icon icon-3"><TrendingUp size={24} /></div>
          <div className="floating-icon icon-4"><Globe size={24} /></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Award size={32} />
            </div>
            <h3>Industry Certified</h3>
            <p>All our programs are accredited by leading industry bodies and recognized globally</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Expert Faculty</h3>
            <p>Learn from industry professionals with 15+ years of real-world experience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={32} />
            </div>
            <h3>Career Support</h3>
            <p>Dedicated placement assistance with 94% job placement rate within 6 months</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Globe size={32} />
            </div>
            <h3>Global Recognition</h3>
            <p>Certificates recognized worldwide with international internship opportunities</p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="courses-section">
        <div className="section-header">
          <h2>Choose Your Path to Success</h2>
          <p>Explore our comprehensive range of professional courses designed to meet industry demands</p>
        </div>
        <div className="courses-grid">
          {coursesData.map((course) => (
            <div key={course.id} className="course-card" onClick={() => openModal(course)}>
              <div className="card-image">
                <img src={course.image} alt={course.title} />
                <div className="category-badge">{course.category}</div>
                <div className="level-badge">{course.level}</div>
              </div>
              <div className="card-content">
                <div className="course-header">
                  <h3 className="course-title">{course.title}</h3>
                  <div className="rating">
                    <Star size={14} />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-stats">
                  <div className="stat">
                    <Users size={14} />
                    <span>{course.students} students</span>
                  </div>
                  <div className="stat">
                    <TrendingUp size={14} />
                    <span>{course.jobPlacement} placement</span>
                  </div>
                </div>
                <div className="course-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Award size={16} />
                    <span>{course.accreditation}</span>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="course-fee">{course.fees}</span>
                  <div className="learn-more">
                    <span>Explore Course</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <img src={selectedCourse.image} alt={selectedCourse.title} className="modal-image" />
              <div className="modal-header-content">
                <div className="modal-badges">
                  <div className="modal-category">{selectedCourse.category}</div>
                  <div className="modal-rating">
                    <Star size={14} />
                    <span>{selectedCourse.rating}</span>
                  </div>
                </div>
                <h2 className="modal-title">{selectedCourse.title}</h2>
                <p className="modal-description">{selectedCourse.fullDescription}</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="highlights-section">
                <h3><CheckCircle size={20} /> Course Highlights</h3>
                <div className="highlights-grid">
                  {selectedCourse.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <CheckCircle size={16} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-section">
                <div className="info-grid">
                  <div className="info-item">
                    <Clock size={20} />
                    <div>
                      <strong>Duration</strong>
                      <span>{selectedCourse.duration}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Calendar size={20} />
                    <div>
                      <strong>Intake</strong>
                      <span>{selectedCourse.intake}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Award size={20} />
                    <div>
                      <strong>Fees</strong>
                      <span>{selectedCourse.fees}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <TrendingUp size={20} />
                    <div>
                      <strong>Job Placement</strong>
                      <span>{selectedCourse.jobPlacement}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="curriculum-section">
                <h3><BookOpen size={20} /> Comprehensive Curriculum</h3>
                <div className="curriculum-grid">
                  {selectedCourse.curriculum.map((item, index) => (
                    <div key={index} className="curriculum-item">
                      <div className="curriculum-number">{index + 1}</div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="career-section">
                <h3><Users size={20} /> Career Opportunities & Salary Range</h3>
                <div className="career-list">
                  {selectedCourse.career.map((career, index) => (
                    <div key={index} className="career-item">
                      <ChevronRight size={16} />
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button className="enroll-button" onClick={() => window.open("https://nbkform.onrender.com", "_blank")}>
                  <Award size={20}/>
                  Enroll Now - Limited Seats
                </button>
                <button className="contact-button">
                  <MapPin size={20} />
                  Schedule Campus Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>

  );
}

export default Courses;