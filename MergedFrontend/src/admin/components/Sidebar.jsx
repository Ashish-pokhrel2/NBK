import React from 'react'
import { Link } from "react-router-dom";

function Sidebar() {
  return (
       <aside className="w-64 bg-white shadow-md h-screen p-4">
        <h2 className="text-xl font-bold mb-6">NBK Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin/dashboard" className="block p-2 rounded hover:bg-gray-200">
            Dashboard
          </Link>
          <Link to="/admin/faculty" className="block p-2 rounded hover:bg-gray-200">
            Faculty
          </Link>
          <Link to="/admin/notifications" className="block p-2 rounded hover:bg-gray-200">
            Notifications
          </Link>
          <Link to="/admin/messages" className="block p-2 rounded hover:bg-gray-200">
            Messages
          </Link>
          <Link to="/admin/gallery" className="block p-2 rounded hover:bg-gray-200">
            Gallery
          </Link>
           <Link to="/admin/students" className="block p-2 rounded hover:bg-gray-200 ">
            Students
          </Link>
          <Link to="/logout" className="block p-2 rounded hover:bg-gray-200 text-red-600">
            Logout
          </Link>

        </nav>
      </aside>
  )
}

export default Sidebar
