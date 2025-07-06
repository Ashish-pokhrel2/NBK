import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [counts, setCounts] = useState({
    totalFaculty: 0,
    totalNotifications: 0,
    totalMessages: 0,
    totalStudents: 0,
  });

  // Also store notifications data to show recent notifications table dynamically
  const [notifications, setNotifications] = useState([]);

  const fetchCounts = async () => {
    try {
      const [facultyRes, notificationsRes, messagesRes, studentsRes] =
        await Promise.all([
          axios.get("/faculty/list"),
          axios.get("/notice/list"),
          axios.get("/messages/list"),
          axios.get("/student/list"),
        ]);

      setCounts({
        totalFaculty: facultyRes.data.data?.length || 0,
        totalNotifications: notificationsRes.data.data?.length || 0,
        totalMessages: messagesRes.data.data?.length || 0,
        totalStudents:
          studentsRes.data.totalStudents || studentsRes.data.data?.length || 0,
      });

      setNotifications(notificationsRes.data.data || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };
  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Faculty</h2>
            <p className="text-2xl text-blue-600 font-bold">
              {counts.totalFaculty}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-2xl text-green-600 font-bold">
              {counts.totalNotifications}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Messages</h2>
            <p className="text-2xl text-yellow-600 font-bold">
              {counts.totalMessages}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Students</h2>
            <p className="text-2xl text-yellow-600 font-bold">
              {counts.totalStudents}
            </p>
          </div>
        </div>

        {/* Notification Table - dynamically filled */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Date</th>
                <th className="p-2">Attachment</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  <tr key={note.id} className="border-t">
                    <td className="p-2">{note.title}</td>
                    <td className="p-2">{note.description}</td>
                    <td className="p-2">
                      {note.uploadDate
                        ? new Date(note.uploadDate).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                    <td className="p-2">
                      {note.Attachment ? (
                        <a
                          href={`http://localhost:5000/uploads/${note.Attachment}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        "No file"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No notifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
