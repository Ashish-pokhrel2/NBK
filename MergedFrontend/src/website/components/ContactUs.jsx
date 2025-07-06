import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare, 
  Building, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle
} from 'lucide-react';
import '../../styles/ContactUs.css';
import Header from './Header.jsx'; 
import Footer from './Footer.jsx'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone Numbers",
      details: [
        "+1 (555) 123-4567 - Main Office",
        "+1 (555) 123-4568 - Admissions",
        "+1 (555) 123-4569 - Student Services"
      ]
    },
    {
      icon: <Mail size={24} />,
      title: "Email Addresses",
      details: [
        "info@university.edu - General Inquiries",
        "admissions@university.edu - Admissions",
        "support@university.edu - Technical Support"
      ]
    },
    {
      icon: <MapPin size={24} />,
      title: "Campus Address",
      details: [
        "123 University Avenue",
        "Academic City, State 12345",
        "United States of America"
      ]
    },
    {
      icon: <Clock size={24} />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 4:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  const departments = [
    { name: "Admissions Office", phone: "+1 (555) 123-4568", email: "admissions@university.edu" },
    { name: "Student Services", phone: "+1 (555) 123-4569", email: "students@university.edu" },
    { name: "Academic Affairs", phone: "+1 (555) 123-4570", email: "academic@university.edu" },
    { name: "Financial Aid", phone: "+1 (555) 123-4571", email: "financial@university.edu" },
    { name: "IT Support", phone: "+1 (555) 123-4572", email: "support@university.edu" },
    { name: "Library Services", phone: "+1 (555) 123-4573", email: "library@university.edu" }
  ];

  return (
    <>
    <Header />
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Get In Touch</h1>
            <p className="hero-subtitle">
              We're here to help and answer any questions you might have. 
              We look forward to hearing from you.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Departments</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">48hrs</span>
                <span className="stat-label">Response Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-container">
        {/* Contact Information Cards */}
        <div className="contact-info-section">
          <div className="section-header">
            <h2 className="section-title">Contact Information</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-background"></div>
                <div className="info-icon-container">
                  <div className="info-icon">{info.icon}</div>
                </div>
                <h3 className="info-title">{info.title}</h3>
                <div className="info-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="info-detail">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form and Map Section */}
        <div className="form-map-section">
          <div className="contact-form-container">
            <div className="form-header">
              <h2 className="form-title">Send us a Message</h2>
              <p className="form-subtitle">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle size={48} className="success-icon" />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <User size={16} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <Mail size={16} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    <Building size={16} />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <MessageSquare size={16} />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-button">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Map Section */}
          <div className="map-container">
            <div className="map-header">
              <h3 className="map-title">Find Us on Campus</h3>
              <p className="map-subtitle">Visit our beautiful campus located in the heart of Academic City</p>
            </div>
            <div className="map-wrapper">
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.654365893447!2d87.27118707513667!3d26.659546770925047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6d80c0a77143%3A0xec0ee8a18362c012!2sNarabahadur%20Karmacharya%20Memorial%20Foundation!5e0!3m2!1sen!2snp!4v1751133811004!5m2!1sen!2snp"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="University Location"
              ></iframe>
              <div className="map-overlay">
                <div className="map-info">
                  <MapPin size={20} />
                  <div>
                    <h4>University Campus</h4>
                    <p>123 University Avenue, Academic City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Directory */}
        <div className="department-section">
          <div className="section-header">
            <h2 className="section-title">Department Directory</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Direct contact information for specific departments</p>
          </div>
          
          <div className="department-grid">
            {departments.map((dept, index) => (
              <div key={index} className="department-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="dept-background"></div>
                <h3 className="dept-name">{dept.name}</h3>
                <div className="dept-contacts">
                  <a href={`tel:${dept.phone}`} className="dept-contact">
                    <Phone size={16} />
                    {dept.phone}
                  </a>
                  <a href={`mailto:${dept.email}`} className="dept-contact">
                    <Mail size={16} />
                    {dept.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media and Additional Info */}
        <div className="footer-section">
          <div className="social-section">
            <h3 className="social-title">Connect With Us</h3>
            <div className="social-links">
              <a href="#" className="social-link facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="social-link twitter">
                <Twitter size={24} />
              </a>
              <a href="#" className="social-link instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="social-link linkedin">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          <div className="additional-info">
            <div className="info-item">
              <Globe size={20} />
              <div>
                <h4>Website</h4>
                <p>www.university.edu</p>
              </div>
            </div>
            <div className="info-item">
              <Building size={20} />
              <div>
                <h4>Established</h4>
                <p>1965 - Excellence in Education</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default ContactUs;