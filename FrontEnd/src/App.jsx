import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import FacultyPage from "./pages/FacultyPage";
import NotificationsPage from "./pages/NotificationsPage";
import MessagePage from "./pages/MessagePage";
import StudentPage from "./pages/StudentPage";
import Login from "./login/Login"
import GalleryPage from "./pages/GalleryPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/admin/faculty" element={<ProtectedRoute><FacultyPage /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><MessagePage /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
