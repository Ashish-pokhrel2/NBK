import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, GraduationCap, Building, X, Filter, Award, Calendar, BookOpen } from 'lucide-react';
import '../../styles/Department.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Chairman from '../../assets/imgs/nirmalbaral.jpg';

const facultyData = [
  {
    id: 1,
    name: "Mr. Nirmal Baral",
    position: "Chairman",
    department: "Administration",
    qualification: "Ph.D. in Educational Leadership, Harvard University",
    email: "chairman@university.edu",
    phone: "+1 (555) 100-0001",
    office: "Admin Building, Room 101",
    specialization: "Educational Policy, Strategic Planning",
    experience: "25 years",
    achievements: "Excellence in Leadership Award 2023, Educational Innovation Medal",
    publications: "50+ research papers, 5 books on educational leadership",
    image: Chairman,
    hierarchy: "chairman"
  },
  {
    id: 2,
    name: "Dr. Sarah Mitchell",
    position: "Principal",
    department: "Administration",
    qualification: "Ph.D. in Academic Administration, Stanford University",
    email: "principal@university.edu",
    phone: "+1 (555) 100-0002",
    office: "Admin Building, Room 102",
    specialization: "Academic Excellence, Student Affairs",
    experience: "20 years",
    achievements: "Outstanding Administrator Award, Student Choice Excellence",
    publications: "35+ research papers on academic administration",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "principal"
  },
  {
    id: 3,
    name: "Ms. Aayushma Baral",
    position: "Mgmt",
    department: "Administration",
    qualification: "Ph.D. in Academic Administration, Stanford University",
    email: "principal@university.edu",
    phone: "+1 (555) 100-0002",
    office: "Admin Building, Room 102",
    specialization: "Academic Excellence, Student Affairs",
    experience: "20 years",
    achievements: "Outstanding Administrator Award, Student Choice Excellence",
    publications: "35+ research papers on academic administration",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "Management"
  },
  {
    id: 4,
    name: "Mr. Semanta Raj Khanal",
    position: "Mgmt",
    department: "Administration",
    qualification: "Ph.D. in Academic Administration, Stanford University",
    email: "principal@university.edu",
    phone: "+1 (555) 100-0002",
    office: "Admin Building, Room 102",
    specialization: "Academic Excellence, Student Affairs",
    experience: "20 years",
    achievements: "Outstanding Administrator Award, Student Choice Excellence",
    publications: "35+ research papers on academic administration",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "Management"
  },
  {
    id: 5,
    name: "Ms. Bishnu Maya Parajuli",
    position: "Mgmt",
    department: "Administration",
    qualification: "Ph.D. in Academic Administration, Stanford University",
    email: "principal@university.edu",
    phone: "+1 (555) 100-0002",
    office: "Admin Building, Room 102",
    specialization: "Academic Excellence, Student Affairs",
    experience: "20 years",
    achievements: "Outstanding Administrator Award, Student Choice Excellence",
    publications: "35+ research papers on academic administration",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "Management"
  },
  {
    id: 6,
    name: "Mrs. Shova Sharma",
    position: "Mgmt",
    department: "Level-II H.M",
    qualification: "Ph.D. in Academic Administration, Stanford University",
    email: "principal@university.edu",
    phone: "+1 (555) 100-0002",
    office: "Admin Building, Room 102",
    specialization: "Academic Excellence, Student Affairs",
    experience: "20 years",
    achievements: "Outstanding Administrator Award, Student Choice Excellence",
    publications: "35+ research papers on academic administration",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "Management"
  },
  {
    id: 7,
    name: "Mr. Ram Narayan Tharu",
    position: "Mgmt",
    department: "Security Guard",
    qualification: "Ph.D. in Academic Administration, Stanford University",
    email: "principal@university.edu",
    phone: "+1 (555) 100-0002",
    office: "Admin Building, Room 102",
    specialization: "Academic Excellence, Student Affairs",
    experience: "20 years",
    achievements: "Outstanding Administrator Award, Student Choice Excellence",
    publications: "35+ research papers on academic administration",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "Management"
  },
  {
    id: 8,
    name: "Min Kumari Pariyar",
    position: "Office Help",
    department: "Administration",
    qualification: "Ph.D. in Academic Administration, Stanford University",
    email: "principal@university.edu",
    phone: "+1 (555) 100-0002",
    office: "Admin Building, Room 102",
    specialization: "Academic Excellence, Student Affairs",
    experience: "20 years",
    achievements: "Outstanding Administrator Award, Student Choice Excellence",
    publications: "35+ research papers on academic administration",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "Management"
  },

  {
    id: 9,
    name: "Prof. David Kumar",
    position: "Head of Computer Science",
    department: "Computer Science",
    qualification: "Ph.D. in Computer Science, Carnegie Mellon",
    email: "d.kumar@university.edu",
    phone: "+1 (555) 100-0005",
    office: "CS Block, Room 101",
    specialization: "Artificial Intelligence, Machine Learning, Data Science",
    experience: "15 years",
    achievements: "ACM Distinguished Scientist, AI Innovation Award",
    publications: "70+ papers in top-tier conferences, ML textbook",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "hod"
  },
  {
    id: 10,
    name: "Prof. Lisa Wang",
    position: "Head of Mathematics",
    department: "Mathematics",
    qualification: "Ph.D. in Applied Mathematics, Princeton",
    email: "l.wang@university.edu",
    phone: "+1 (555) 100-0006",
    office: "Math Block, Room 201",
    specialization: "Statistical Analysis, Data Science, Computational Math",
    experience: "14 years",
    achievements: "Mathematical Society Excellence Award, Research Grant Winner",
    publications: "55+ mathematical research papers, statistics handbook",
    image: "https://images.pexels.com/photos/1181421/pexels-photo-1181421.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "hod"
  },
  {
    id: 11,
    name: "Prof. James Wilson",
    position: "Head of Physics",
    department: "Physics",
    qualification: "Ph.D. in Theoretical Physics, Oxford",
    email: "j.wilson@university.edu",
    phone: "+1 (555) 100-0007",
    office: "Physics Lab, Room 301",
    specialization: "Quantum Mechanics, Nuclear Physics, Particle Physics",
    experience: "17 years",
    achievements: "Royal Physics Society Fellow, Nuclear Research Award",
    publications: "60+ physics journals, quantum mechanics textbook",
    image: "https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "hod"
  },
  {
    id: 12,
    name: "Prof. Maria Rodriguez",
    position: "Head of Chemistry",
    department: "Chemistry",
    qualification: "Ph.D. in Organic Chemistry, Yale",
    email: "m.rodriguez@university.edu",
    phone: "+1 (555) 100-0008",
    office: "Chemistry Lab, Room 401",
    specialization: "Organic Synthesis, Drug Discovery, Green Chemistry",
    experience: "13 years",
    achievements: "Chemical Society Innovation Award, Green Chemistry Medal",
    publications: "45+ chemistry journals, organic synthesis handbook",
    image: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "hod"
  },
  {
    id: 13,
    name: "Prof. Ahmed Hassan",
    position: "Professor of Engineering",
    department: "Civil Engineering",
    qualification: "Ph.D. in Structural Engineering, Berkeley",
    email: "a.hassan@university.edu",
    phone: "+1 (555) 100-0009",
    office: "Civil Block, Room 101",
    specialization: "Structural Design, Earthquake Engineering, Smart Materials",
    experience: "16 years",
    achievements: "Structural Engineering Excellence Award, Earthquake Safety Medal",
    publications: "50+ engineering papers, structural design manual",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "professor"
  },
  {
    id: 14,
    name: "Prof. Rachel Green",
    position: "Professor of Biology",
    department: "Biology",
    qualification: "Ph.D. in Molecular Biology, Harvard",
    email: "r.green@university.edu",
    phone: "+1 (555) 100-0010",
    office: "Bio Lab, Room 201",
    specialization: "Genetics, Biotechnology, Molecular Research",
    experience: "12 years",
    achievements: "Biotechnology Innovation Award, Genetics Research Medal",
    publications: "40+ biology journals, genetics research handbook",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "professor"
  },
  {
    id: 15,
    name: "Dr. Kevin Park",
    position: "Associate Professor",
    department: "Computer Science",
    qualification: "Ph.D. in Software Engineering, Georgia Tech",
    email: "k.park@university.edu",
    phone: "+1 (555) 100-0011",
    office: "CS Block, Room 102",
    specialization: "Software Architecture, Cloud Computing, DevOps",
    experience: "10 years",
    achievements: "Software Engineering Excellence Award, Cloud Innovation Medal",
    publications: "35+ software engineering papers, cloud computing guide",
    image: "https://images.pexels.com/photos/2182976/pexels-photo-2182976.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 16,
    name: "Dr. Jennifer Lee",
    position: "Associate Professor",
    department: "Mathematics",
    qualification: "Ph.D. in Pure Mathematics, Columbia",
    email: "j.lee@university.edu",
    phone: "+1 (555) 100-0012",
    office: "Math Block, Room 202",
    specialization: "Abstract Algebra, Number Theory, Cryptography",
    experience: "9 years",
    achievements: "Pure Mathematics Research Award, Number Theory Medal",
    publications: "30+ mathematical research papers, algebra textbook",
    image: "https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 17,
    name: "Dr. Thomas Brown",
    position: "Associate Professor",
    department: "Physics",
    qualification: "Ph.D. in Astrophysics, Cambridge",
    email: "t.brown@university.edu",
    phone: "+1 (555) 100-0013",
    office: "Physics Lab, Room 302",
    specialization: "Cosmology, Dark Matter Research, Space Physics",
    experience: "11 years",
    achievements: "Astrophysics Research Award, Space Science Medal",
    publications: "40+ astrophysics papers, cosmology research guide",
    image: "https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 18,
    name: "Dr. Angela Smith",
    position: "Associate Professor",
    department: "Chemistry",
    qualification: "Ph.D. in Physical Chemistry, Caltech",
    email: "a.smith@university.edu",
    phone: "+1 (555) 100-0014",
    office: "Chemistry Lab, Room 402",
    specialization: "Catalysis, Environmental Chemistry, Materials Science",
    experience: "8 years",
    achievements: "Environmental Chemistry Award, Catalysis Research Medal",
    publications: "25+ chemistry papers, environmental chemistry handbook",
    image: "https://images.pexels.com/photos/1181683/pexels-photo-1181683.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 19,
    name: "Dr. Mark Davis",
    position: "Assistant Professor",
    department: "Computer Science",
    qualification: "Ph.D. in Cybersecurity, Johns Hopkins",
    email: "m.davis@university.edu",
    phone: "+1 (555) 100-0015",
    office: "CS Block, Room 103",
    specialization: "Network Security, Cryptography, Ethical Hacking",
    experience: "6 years",
    achievements: "Cybersecurity Excellence Award, Security Research Medal",
    publications: "20+ security papers, cybersecurity best practices guide",
    image: "https://images.pexels.com/photos/2182974/pexels-photo-2182974.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "assistant"
  },
  {
    id: 20,
    name: "Dr. Sophia Garcia",
    position: "Assistant Professor",
    department: "Mathematics",
    qualification: "Ph.D. in Computational Mathematics, NYU",
    email: "s.garcia@university.edu",
    phone: "+1 (555) 100-0016",
    office: "Math Block, Room 203",
    specialization: "Numerical Analysis, Optimization, Scientific Computing",
    experience: "5 years",
    achievements: "Computational Mathematics Award, Young Researcher Medal",
    publications: "18+ computational papers, numerical methods guide",
    image: "https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "assistant"
  },
  {
    id: 21,
    name: "Dr. Robert Kim",
    position: "Assistant Professor",
    department: "Physics",
    qualification: "Ph.D. in Condensed Matter Physics, MIT",
    email: "r.kim@university.edu",
    phone: "+1 (555) 100-0017",
    office: "Physics Lab, Room 303",
    specialization: "Nanotechnology, Materials Science, Quantum Devices",
    experience: "4 years",
    achievements: "Nanotechnology Innovation Award, Materials Research Medal",
    publications: "15+ materials science papers, nanotechnology handbook",
    image: "https://images.pexels.com/photos/2379002/pexels-photo-2379002.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "assistant"
  },
  {
    id: 22,
    name: "Dr. Nancy Taylor",
    position: "Assistant Professor",
    department: "Chemistry",
    qualification: "Ph.D. in Analytical Chemistry, Stanford",
    email: "n.taylor@university.edu",
    phone: "+1 (555) 100-0018",
    office: "Chemistry Lab, Room 403",
    specialization: "Spectroscopy, Chemical Analysis, Forensic Chemistry",
    experience: "3 years",
    achievements: "Analytical Chemistry Award, Young Scientist Medal",
    publications: "12+ analytical papers, spectroscopy techniques guide",
    image: "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "assistant"
  },
  {
    id: 23,
    name: "Dr. Alex Turner",
    position: "Professor of Engineering",
    department: "Electrical Engineering",
    qualification: "Ph.D. in Electrical Engineering, Caltech",
    email: "a.turner@university.edu",
    phone: "+1 (555) 100-0019",
    office: "EE Block, Room 101",
    specialization: "Signal Processing, Communications, IoT Systems",
    experience: "14 years",
    achievements: "IEEE Distinguished Engineer, Signal Processing Award",
    publications: "45+ electrical engineering papers, IoT systems handbook",
    image: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "professor"
  },
  {
    id: 24,
    name: "Dr. Maya Patel",
    position: "Associate Professor",
    department: "Biology",
    qualification: "Ph.D. in Cell Biology, UCSF",
    email: "m.patel@university.edu",
    phone: "+1 (555) 100-0020",
    office: "Bio Lab, Room 202",
    specialization: "Cell Signaling, Cancer Research, Immunology",
    experience: "9 years",
    achievements: "Cancer Research Award, Cell Biology Excellence Medal",
    publications: "30+ cell biology papers, cancer research handbook",
    image: "https://images.pexels.com/photos/1181689/pexels-photo-1181689.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 25,
    name: "Dr. Peter Anderson",
    position: "Assistant Professor",
    department: "Mechanical Engineering",
    qualification: "Ph.D. in Mechanical Engineering, Georgia Tech",
    email: "p.anderson@university.edu",
    phone: "+1 (555) 100-0021",
    office: "ME Block, Room 101",
    specialization: "Thermodynamics, Energy Systems, Renewable Energy",
    experience: "5 years",
    achievements: "Energy Systems Award, Renewable Energy Medal",
    publications: "20+ mechanical engineering papers, energy systems guide",
    image: "https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "assistant"
  },
  {
    id: 26,
    name: "Dr. Linda Thompson",
    position: "Professor of Business",
    department: "Business Administration",
    qualification: "Ph.D. in Business Management, Wharton",
    email: "l.thompson@university.edu",
    phone: "+1 (555) 100-0022",
    office: "Business Block, Room 201",
    specialization: "Strategic Management, Entrepreneurship, Innovation",
    experience: "15 years",
    achievements: "Business Excellence Award, Entrepreneurship Medal",
    publications: "40+ business papers, strategic management textbook",
    image: "https://images.pexels.com/photos/1181688/pexels-photo-1181688.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "professor"
  },
  {
    id: 27,
    name: "Dr. Carlos Martinez",
    position: "Associate Professor",
    department: "Chemical Engineering",
    qualification: "Ph.D. in Chemical Engineering, MIT",
    email: "c.martinez@university.edu",
    phone: "+1 (555) 100-0023",
    office: "ChE Block, Room 301",
    specialization: "Process Design, Catalysis, Sustainable Engineering",
    experience: "10 years",
    achievements: "Chemical Engineering Award, Process Innovation Medal",
    publications: "35+ chemical engineering papers, process design handbook",
    image: "https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 28,
    name: "Dr. Helen Chang",
    position: "Assistant Professor",
    department: "Environmental Science",
    qualification: "Ph.D. in Environmental Engineering, Berkeley",
    email: "h.chang@university.edu",
    phone: "+1 (555) 100-0024",
    office: "Env Block, Room 101",
    specialization: "Water Treatment, Sustainability, Climate Science",
    experience: "4 years",
    achievements: "Environmental Excellence Award, Sustainability Medal",
    publications: "15+ environmental papers, sustainability practices guide",
    image: "https://images.pexels.com/photos/1181684/pexels-photo-1181684.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "assistant"
  },
  {
    id: 29,
    name: "Dr. Steven Wright",
    position: "Professor of Psychology",
    department: "Psychology",
    qualification: "Ph.D. in Clinical Psychology, UCLA",
    email: "s.wright@university.edu",
    phone: "+1 (555) 100-0025",
    office: "Psychology Block, Room 201",
    specialization: "Cognitive Behavioral Therapy, Research, Mental Health",
    experience: "18 years",
    achievements: "Psychology Excellence Award, Mental Health Advocacy Medal",
    publications: "50+ psychology papers, CBT therapy handbook",
    image: "https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "professor"
  },
  {
    id: 30,
    name: "Dr. Amanda Foster",
    position: "Associate Professor",
    department: "English Literature",
    qualification: "Ph.D. in English Literature, Oxford",
    email: "a.foster@university.edu",
    phone: "+1 (555) 100-0026",
    office: "Humanities Block, Room 301",
    specialization: "Victorian Literature, Creative Writing, Literary Criticism",
    experience: "11 years",
    achievements: "Literature Excellence Award, Creative Writing Medal",
    publications: "30+ literature papers, Victorian literature anthology",
    image: "https://images.pexels.com/photos/1181692/pexels-photo-1181692.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 31,
    name: "Dr. Ryan O'Connor",
    position: "Assistant Professor",
    department: "History",
    qualification: "Ph.D. in Modern History, Cambridge",
    email: "r.oconnor@university.edu",
    phone: "+1 (555) 100-0027",
    office: "Humanities Block, Room 302",
    specialization: "World War History, Political Science, Historical Research",
    experience: "6 years",
    achievements: "Historical Research Award, Political Science Medal",
    publications: "20+ history papers, world war history textbook",
    image: "https://images.pexels.com/photos/2182972/pexels-photo-2182972.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "assistant"
  },
  {
    id: 32,
    name: "Dr. Grace Liu",
    position: "Professor of Economics",
    department: "Economics",
    qualification: "Ph.D. in Economics, Harvard",
    email: "g.liu@university.edu",
    phone: "+1 (555) 100-0028",
    office: "Economics Block, Room 401",
    specialization: "Macroeconomics, International Trade, Economic Policy",
    experience: "16 years",
    achievements: "Economics Excellence Award, Trade Policy Medal",
    publications: "45+ economics papers, macroeconomics textbook",
    image: "https://images.pexels.com/photos/1181691/pexels-photo-1181691.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "professor"
  },
  {
    id: 33,
    name: "Dr. Daniel Cooper",
    position: "Associate Professor",
    department: "Philosophy",
    qualification: "Ph.D. in Philosophy, Princeton",
    email: "d.cooper@university.edu",
    phone: "+1 (555) 100-0029",
    office: "Philosophy Block, Room 501",
    specialization: "Ethics, Logic, Metaphysics, Applied Philosophy",
    experience: "12 years",
    achievements: "Philosophy Excellence Award, Ethics Research Medal",
    publications: "35+ philosophy papers, ethics and logic handbook",
    image: "https://images.pexels.com/photos/2379008/pexels-photo-2379008.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 34,
    name: "Dr. Victoria Brooks",
    position: "Assistant Professor",
    department: "Art & Design",
    qualification: "Ph.D. in Fine Arts, Yale",
    email: "v.brooks@university.edu",
    phone: "+1 (555) 100-0030",
    office: "Art Block, Room 601",
    specialization: "Digital Art, Contemporary Design, Visual Communication",
    experience: "5 years",
    achievements: "Digital Art Innovation Award, Design Excellence Medal",
    publications: "18+ art papers, digital design methodology guide",
    image: "https://images.pexels.com/photos/1181693/pexels-photo-1181693.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "assistant"
  },
  {
    id: 35,
    name: "Dr. Jonathan Miller",
    position: "Professor of Medicine",
    department: "Medical Sciences",
    qualification: "M.D., Ph.D. in Internal Medicine, Johns Hopkins",
    email: "j.miller@university.edu",
    phone: "+1 (555) 100-0031",
    office: "Medical Block, Room 101",
    specialization: "Internal Medicine, Medical Research, Clinical Trials",
    experience: "20 years",
    achievements: "Medical Excellence Award, Clinical Research Medal",
    publications: "60+ medical papers, internal medicine textbook",
    image: "https://images.pexels.com/photos/2182977/pexels-photo-2182977.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "professor"
  },
  {
    id: 36,
    name: "Dr. Catherine White",
    position: "Associate Professor",
    department: "Nursing",
    qualification: "Ph.D. in Nursing Science, University of Pennsylvania",
    email: "c.white@university.edu",
    phone: "+1 (555) 100-0032",
    office: "Nursing Block, Room 201",
    specialization: "Critical Care Nursing, Healthcare Management, Patient Safety",
    experience: "13 years",
    achievements: "Nursing Excellence Award, Patient Care Medal",
    publications: "40+ nursing papers, critical care nursing handbook",
    image: "https://images.pexels.com/photos/1181694/pexels-photo-1181694.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "associate"
  },
  {
    id: 37,
    name: "Dr. Sarah Mitchell",
    position: "Vice Principal",
    department: "Administration",
    qualification: "Ph.D. in Academic Administration, Stanford University",
    email: "principal@university.edu",
    phone: "+1 (555) 100-0002",
    office: "Admin Building, Room 102",
    specialization: "Academic Excellence, Student Affairs",
    experience: "20 years",
    achievements: "Outstanding Administrator Award, Student Choice Excellence",
    publications: "35+ research papers on academic administration",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    hierarchy: "principal"
  }
];

const Department = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filteredFaculty, setFilteredFaculty] = useState(facultyData);

  useEffect(() => {
    let filtered = facultyData;
    
    if (searchTerm) {
      filtered = filtered.filter(faculty => 
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDepartment) {
      filtered = filtered.filter(faculty => 
        faculty.department === filterDepartment
      );
    }

    setFilteredFaculty(filtered);
  }, [searchTerm, filterDepartment]);

  const hierarchyOrder = ['chairman', 'principal', 'Management', 'hod', 'professor', 'associate', 'assistant'];
  
  const sortedFaculty = [...filteredFaculty].sort((a, b) => {
    const aIndex = hierarchyOrder.indexOf(a.hierarchy);
    const bIndex = hierarchyOrder.indexOf(b.hierarchy);
    return aIndex - bIndex;
  });

  const departments = [...new Set(facultyData.map(f => f.department))];

  const getHierarchyTitle = (hierarchy) => {
    switch (hierarchy) {
      case 'chairman': return 'Board of Directors';
      case 'principal': return 'Executive Leadership';
      case 'Management': return 'Management Team';
      case 'hod': return 'Department Heads';
      case 'professor': return 'Distinguished Professors';
      case 'associate': return 'Associate Professors';
      case 'assistant': return 'Assistant Professors';
      default: return 'Faculty Members';
    }
  };

  const groupedFaculty = hierarchyOrder.reduce((acc, hierarchy) => {
    const facultyInHierarchy = sortedFaculty.filter(f => f.hierarchy === hierarchy);
    if (facultyInHierarchy.length > 0) {
      acc[hierarchy] = facultyInHierarchy;
    }
    return acc;
  }, {});

  return (
    <>
    <Header />
    <div className="faculty-page">
        
      {/* Hero Section */}
      <div className="faculty-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Our Distinguished Faculty</h1>
            <p className="hero-subtitle">World-class educators, researchers, and innovators shaping the future</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">32+</span>
                <span className="stat-label">Expert Faculty</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Departments</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Publications</span>
              </div>
            </div>
          </div>
          
          <div className="search-filter-section">
            <div className="search-container">
              <div className="search-box">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, department, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-container">
                <Filter className="filter-icon" size={20} />
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Sections */}
      <div className="faculty-container">
        {Object.entries(groupedFaculty).map(([hierarchy, faculty]) => (
          <div key={hierarchy} className="hierarchy-section">
            <div className="section-header">
              <h2 className="hierarchy-title">{getHierarchyTitle(hierarchy)}</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className={`faculty-grid ${hierarchy === 'chairman' || hierarchy === 'principal' ? 'leadership-grid' : ''}`}>
              {faculty.map((member, index) => (
                <div
                  key={member.id}
                  className={`faculty-card ${hierarchy}`}
                  onClick={() => setSelectedFaculty(member)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-background"></div>
                  <div className="faculty-image-container">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="faculty-image"
                    />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <span className="view-details">View Profile</span>
                        <div className="overlay-icons">
                          <Mail size={16} />
                          <Phone size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="faculty-info">
                    <h3 className="faculty-name">{member.name}</h3>
                    <p className="faculty-position">{member.position}</p>
                    <p className="faculty-department">{member.department}</p>
                    <div className="faculty-meta">
                      <span className="experience">{member.experience} experience</span>
                      <span className="specialization">{member.specialization.split(',')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <div className="quick-contact">
                      <a href={`mailto:${member.email}`} className="contact-link">
                        <Mail size={14} />
                      </a>
                      <a href={`tel:${member.phone}`} className="contact-link">
                        <Phone size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {selectedFaculty && (
        <div className="modal-overlay" onClick={() => setSelectedFaculty(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedFaculty(null)}
            >
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <div className="modal-image-container">
                <img
                  src={selectedFaculty.image}
                  alt={selectedFaculty.name}
                  className="modal-image"
                />
                <div className="modal-badge">{selectedFaculty.hierarchy}</div>
              </div>
              <div className="modal-header-info">
                <h2 className="modal-name">{selectedFaculty.name}</h2>
                <p className="modal-position">{selectedFaculty.position}</p>
                <p className="modal-department">{selectedFaculty.department}</p>
                <div className="modal-experience">
                  <Calendar size={16} />
                  <span>{selectedFaculty.experience} of experience</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="info-tabs">
                <div className="tab-content">
                  <div className="info-grid">
                    <div className="info-card">
                      <div className="info-header">
                        <GraduationCap className="info-icon" size={20} />
                        <h4>Qualification</h4>
                      </div>
                      <p>{selectedFaculty.qualification}</p>
                    </div>

                    <div className="info-card">
                      <div className="info-header">
                        <Building className="info-icon" size={20} />
                        <h4>Specialization</h4>
                      </div>
                      <p>{selectedFaculty.specialization}</p>
                    </div>

                    <div className="info-card">
                      <div className="info-header">
                        <Award className="info-icon" size={20} />
                        <h4>Achievements</h4>
                      </div>
                      <p>{selectedFaculty.achievements}</p>
                    </div>

                    <div className="info-card">
                      <div className="info-header">
                        <BookOpen className="info-icon" size={20} />
                        <h4>Publications</h4>
                      </div>
                      <p>{selectedFaculty.publications}</p>
                    </div>

                    <div className="info-card">
                      <div className="info-header">
                        <Mail className="info-icon" size={20} />
                        <h4>Email</h4>
                      </div>
                      <p><a href={`mailto:${selectedFaculty.email}`}>{selectedFaculty.email}</a></p>
                    </div>

                    <div className="info-card">
                      <div className="info-header">
                        <Phone className="info-icon" size={20} />
                        <h4>Phone</h4>
                      </div>
                      <p><a href={`tel:${selectedFaculty.phone}`}>{selectedFaculty.phone}</a></p>
                    </div>

                    <div className="info-card">
                      <div className="info-header">
                        <MapPin className="info-icon" size={20} />
                        <h4>Office</h4>
                      </div>
                      <p>{selectedFaculty.office}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        <Footer />
    </div>
    </>
  );
};

export default Department;