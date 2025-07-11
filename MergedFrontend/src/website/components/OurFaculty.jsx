import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  BookOpen, 
  Calendar, 
  Filter,
  Users,
  Building,
  ChevronDown,
  ChevronUp,
  Star,
  GraduationCap,
  X
} from 'lucide-react';
import axios from '../../api/axios';
import Header from './Header';
import Footer from './Footer';

// Component to handle image loading with multiple fallbacks
const FacultyImage = ({ imageUrl, name, className, isCircular = false }) => {
  const [src, setSrc] = useState('https://via.placeholder.com/300x200?text=Loading+Image');
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (!imageUrl) {
      setError(true);
      setSrc('https://via.placeholder.com/300x200?text=No+Image');
      return;
    }
    
    // Extract the filename from the URL path
    const filename = imageUrl.split('/').pop();
    
    // Try different URL formats with priority
    const urls = [
      imageUrl, // Direct URL as provided
      imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`, // Ensure leading slash
      `/uploads/${filename}`, // Relative path with filename
      `http://localhost:8000${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`, // Development backend
      `http://localhost:8000/uploads/${filename}`, // Development backend uploads folder
      `http://localhost:8001/test-uploads/${filename}`, // Test server
      `${window.location.origin}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`, // Using current domain
      `${window.location.origin}/uploads/${filename}` // Current domain with uploads path
    ];
    
    // Try each URL until one works
    const testImage = (index) => {
      if (index >= urls.length) {
        setError(true);
        setSrc('https://via.placeholder.com/300x200?text=No+Image');
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        setSrc(urls[index]);
      };
      img.onerror = () => {
        testImage(index + 1);
      };
      img.src = urls[index];
    };
    
    testImage(0);
  }, [imageUrl, name]);
  
  const containerClasses = `overflow-hidden ${isCircular ? 'w-full h-full' : 'h-48 w-full'} ${error ? 'bg-gray-100' : ''}`;
  const imageClasses = className || `w-full h-full ${isCircular ? 'object-cover object-center' : 'object-cover'}`;
  
  return (
    <div className={containerClasses}>
      {error ? (
        <div className="h-full w-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      ) : (
        <img 
          src={src} 
          alt={name}
          className={imageClasses}
        />
      )}
    </div>
  );
};

// Faculty Card Component
const FacultyCard = ({ member, config, onOpenModal, hierarchy }) => {
  const defaultImage = "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400";
  
  // Define card sizes based on hierarchy
  const getCardSize = (hierarchy) => {
    switch (hierarchy) {
      case 'bod':
        return {
          cardClass: 'col-span-2 lg:col-span-1', // Takes 2 columns on medium screens
          imageSize: 'w-40 h-40', // Much larger image
          titleSize: 'text-2xl',
          subtitleSize: 'text-lg',
          padding: 'p-6',
          profileButtonSize: 'w-14 h-14',
          profileIconSize: 32
        };
      case 'executive':
        return {
          cardClass: 'col-span-1',
          imageSize: 'w-36 h-36', // Much larger image
          titleSize: 'text-xl',
          subtitleSize: 'text-base',
          padding: 'p-6',
          profileButtonSize: 'w-12 h-12',
          profileIconSize: 28
        };
      case 'coordinators':
        return {
          cardClass: 'col-span-1',
          imageSize: 'w-32 h-32', // Much larger image
          titleSize: 'text-lg',
          subtitleSize: 'text-sm',
          padding: 'p-5',
          profileButtonSize: 'w-10 h-10',
          profileIconSize: 24
        };
      default: // faculty, management
        return {
          cardClass: 'col-span-1',
          imageSize: 'w-28 h-28', // Much larger image
          titleSize: 'text-lg',
          subtitleSize: 'text-sm',
          padding: 'p-5',
          profileButtonSize: 'w-10 h-10',
          profileIconSize: 20
        };
    }
  };

  const cardSize = getCardSize(hierarchy);
  
  return (
    <div className={`${cardSize.cardClass} bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${config.borderColor} border-2 overflow-hidden flex flex-col`}>
      {/* Top center image */}
      <div className="flex justify-center pt-6">
        <div className={`${cardSize.imageSize} rounded-full overflow-hidden bg-gray-100 mb-4 shadow-md border-4 ${config.borderColor}`}>
          {member.ImageURL ? (
            <FacultyImage
              imageUrl={member.ImageURL}
              name={member.Name}
              isCircular={true}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={defaultImage}
              alt={member.Name}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
      </div>
      
      {/* Card content */}
      <div className={`${cardSize.padding} flex-1 flex flex-col`}>
        <div className="text-center mb-4">
          <h3 className={`${cardSize.titleSize} font-bold text-gray-900`}>{member.Name}</h3>
          <p className={`${cardSize.subtitleSize} text-gray-600`}>{member.Position || 'Faculty Member'}</p>
          <p className="text-xs text-gray-500">{member.Department}</p>
        </div>

        {/* Always show basic info for larger cards */}
        {(hierarchy === 'bod' || hierarchy === 'executive') && (
          <div className="space-y-2 mb-4">
            {member.Qualification && (
              <div className="text-sm">
                <span className="font-semibold text-gray-700">Qualification:</span>
                <p className="text-gray-600">{member.Qualification}</p>
              </div>
            )}
            {member.Description && (
              <div className="text-sm">
                <span className="font-semibold text-gray-700">About:</span>
                <p className="text-gray-600 line-clamp-2">{member.Description}</p>
              </div>
            )}
          </div>
        )}

        {/* Card footer with contact buttons and view profile */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex space-x-2">
            {member.CollegeEmail && (
              <a
                href={`mailto:${member.CollegeEmail}`}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="Send Email"
              >
                <Mail size={20} />
              </a>
            )}
            {member.Phone && (
              <a
                href={`tel:${member.Phone}`}
                className="text-gray-400 hover:text-green-600 transition-colors"
                title="Call"
              >
                <Phone size={20} />
              </a>
            )}
          </div>
          
          <button
            onClick={() => onOpenModal(member)}
            className={`${cardSize.profileButtonSize} flex items-center justify-center bg-gradient-to-r ${config.color} text-white rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
            title="View Full Profile"
          >
            <Users size={cardSize.profileIconSize} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Faculty Modal Component
const FacultyModal = ({ faculty, onClose }) => {
  const defaultImage = "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Centered larger image at the top of modal */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-100 shadow-lg border-4 border-blue-200 mb-4">
              {faculty.ImageURL ? (
                <FacultyImage
                  imageUrl={faculty.ImageURL}
                  name={faculty.Name}
                  isCircular={true}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <img
                  src={defaultImage}
                  alt={faculty.Name}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{faculty.Name}</h2>
              <p className="text-xl text-blue-600 font-semibold mb-1">{faculty.Position || 'Faculty Member'}</p>
              <p className="text-gray-600">{faculty.Department}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="text-blue-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Qualification</h3>
                </div>
                <p className="text-gray-600">{faculty.Qualification || 'Not specified'}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="text-blue-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Department</h3>
                </div>
                <p className="text-gray-600">{faculty.Department}</p>
              </div>
            </div>

            <div>
              {faculty.CollegeEmail && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-gray-900">Email</h3>
                  </div>
                  <p className="text-gray-600">
                    <a href={`mailto:${faculty.CollegeEmail}`} className="text-blue-600 hover:text-blue-800">
                      {faculty.CollegeEmail}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {faculty.Description && (
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-900">About</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{faculty.Description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OurFaculty = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHierarchy, setSelectedHierarchy] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const hierarchyConfig = {
    bod: {
      title: 'Board of Directors',
      icon: <Building className="w-6 h-6" />,
      color: 'from-purple-600 to-indigo-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    executive: {
      title: 'Executive Leadership',
      icon: <Star className="w-6 h-6" />,
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    coordinators: {
      title: 'Coordinators',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    faculty: {
      title: 'Faculty Members',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-orange-600 to-red-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    management: {
      title: 'Management Teams',
      icon: <Award className="w-6 h-6" />,
      color: 'from-gray-600 to-slate-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/faculty/list');
      setFacultyData(response.data.data || []);
    } catch {
      setFacultyData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = facultyData.filter(member => {
    const matchesSearch = member.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.Position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.Department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHierarchy = selectedHierarchy === 'all' || member.Hierarchy === selectedHierarchy;
    return matchesSearch && matchesHierarchy;
  });

  const groupedFaculty = filteredFaculty.reduce((groups, member) => {
    const hierarchy = member.Hierarchy || 'faculty';
    if (!groups[hierarchy]) {
      groups[hierarchy] = [];
    }
    groups[hierarchy].push(member);
    return groups;
  }, {});

  const openModal = (faculty) => {
    setSelectedFaculty(faculty);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFaculty(null);
    setModalOpen(false);
  };



  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-700">Loading Faculty Directory...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Faculty
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Meet the distinguished faculty and staff who make our institution a center of excellence in education and research.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{facultyData.length} Team Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>{Object.keys(groupedFaculty).length} Departments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Excellence in Education</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, position, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Filter className="text-gray-500" size={20} />
              <select
                value={selectedHierarchy}
                onChange={(e) => setSelectedHierarchy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Positions</option>
                {Object.entries(hierarchyConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Directory */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedFaculty)
            .sort(([a], [b]) => {
              const order = ['bod', 'executive', 'coordinators', 'faculty', 'management'];
              return order.indexOf(a) - order.indexOf(b);
            })
            .map(([hierarchy, members]) => {
              const config = hierarchyConfig[hierarchy] || hierarchyConfig.faculty;
              
              return (
                <div key={hierarchy} className="mb-12">
                  {/* Section Header */}
                  <div className={`bg-gradient-to-r ${config.color} rounded-2xl p-6 mb-8 text-white shadow-xl`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {config.icon}
                        <div>
                          <h2 className="text-3xl font-bold">{config.title}</h2>
                          <p className="text-blue-100">{members.length} members</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{members.length}</div>
                        <div className="text-sm text-blue-100">Team Members</div>
                      </div>
                    </div>
                  </div>

                  {/* Faculty Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {members.map((member) => (
                      <FacultyCard
                        key={member.CollegeEmail || member.Name}
                        member={member}
                        config={config}
                        hierarchy={hierarchy}
                        onOpenModal={() => openModal(member)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

          {filteredFaculty.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No faculty members found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Faculty Detail Modal */}
      {modalOpen && selectedFaculty && (
        <FacultyModal faculty={selectedFaculty} onClose={closeModal} />
      )}

      <Footer />
    </>
  );
};

export default OurFaculty;
