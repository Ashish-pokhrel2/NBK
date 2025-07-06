import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../../api/axios";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Attachment: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/notice/list");
      setNotifications(res.data.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Attachment") {
      setFormData((prev) => ({ ...prev, Attachment: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      Title: "",
      Description: "",
      Attachment: null,
    });
    setIsEditMode(false);
    setEditId(null);
  };

const handleSubmit = async () => {
  try {
    const data = new FormData();
    data.append("title", formData.Title);
    data.append("description", formData.Description);

    if (formData.Attachment) {
      data.append("Attachment", formData.Attachment);
    }

    if (isEditMode) {
      await axios.put(`/notice/update/${editId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post("/notice/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    fetchNotifications();
    resetForm();
  } catch (error) {
    console.error("Failed to submit notification:", error);
  }
};


  const handleEdit = (note) => {
    setFormData({
      Title: note.title,
      Description: note.description,
      Attachment: null, // must reselect file
    });
    setEditId(note.id);
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notice/delete/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center underline text-gray-800">
          Notification List
        </h1>

        {/* Form */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {isEditMode ? "Edit Notification" : "Add Notification"}
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Title */}
            <div className="flex items-center space-x-2 w-[900px]">
              <label className="font-medium w-82 text-right">Title:</label>
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                placeholder="Enter title"
                className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Attachment */}
            <div className="flex items-center space-x-2 w-[900px]">
              <label className="font-medium w-82 text-right">Attachment:</label>
              <input
                type="file"
                name="Attachment"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Description */}
            <div className="flex items-start space-x-2 w-[900px]">
              <label className="font-medium w-82 text-right mt-2">Description:</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Enter description"
                rows="3"
                className="flex-1 border p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
          </form>

          <div className="flex space-x-2 mt-6 ml-124">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditMode ? "Update" : "Add"} Notification
            </button>
            {isEditMode && (
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Upload Date</th>
                <th className="p-2">Attachment</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((note, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{note.title}</td>
                  <td className="p-2">{note.description}</td>
                  <td className="p-2">
                    {new Date(note.uploadDate).toLocaleDateString("en-GB")}
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
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default NotificationPage;
