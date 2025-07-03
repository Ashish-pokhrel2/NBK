import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import FacultyPage from "./pages/FacultyPage";
import NotificationsPage from "./pages/NotificationsPage";
import MessagePage from "./pages/MessagePage";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/students" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
