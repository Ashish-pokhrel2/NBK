import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentAuthProvider from "./context/StudentAuthContext";

// Admin Panel Components
import AdminPanel from "./admin/AdminPanel";
import FacultyPage from "./admin/pages/FacultyPage";
import NotificationsPage from "./admin/pages/NotificationsPage";
import MessagePage from "./admin/pages/MessagePage";
import StudentPage from "./admin/pages/StudentPage";
import Login from "./admin/pages/Login";
import GalleryPage from "./admin/pages/GalleryPage";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Logout from "./admin/pages/Logout";

// Website Components
import Home from "./website/components/Home";
import CoursesPage from "./website/components/Courses";
import Gallery from "./website/components/Gallery";
import Contact from "./website/components/ContactUs";
import About from "./website/components/AboutPage";
import Notification from "./website/components/Notification";
import StudentLogin from "./website/components/StudentLogin";
import StudentProtectedRoute from "./website/components/StudentProtectedRoute";
import OurFaculty from "./website/components/OurFaculty";

function App() {
  return (
    <StudentAuthProvider>
      <Router>
        <Routes>
          {/* Admin Panel Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/admin/faculty" element={<ProtectedRoute><FacultyPage /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><MessagePage /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/department" element={<Navigate to="/faculty" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faculty" element={<OurFaculty />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/notification" element={<StudentProtectedRoute><Notification /></StudentProtectedRoute>} />
        </Routes>
      </Router>
    </StudentAuthProvider>
  );
}

export default App;
