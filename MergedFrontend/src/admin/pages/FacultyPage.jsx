import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const FacultyPage = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    CollegeEmail: "",
    Qualification: "",
    Department: "",
    Description: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editEmail, setEditEmail] = useState("");

  const fetchFaculty = async () => {
    try {
      const response = await axios.get("/faculty/list");
      setFacultyList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch faculty:", error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      Name: "",
      CollegeEmail: "",
      Qualification: "",
      Department: "",
      Description: "",
    });
    setIsEditMode(false);
    setEditEmail("");
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put(`/faculty/update/${editEmail}`, formData);
        Swal.fire("Updated!", "Faculty information updated successfully.", "success");
      } else {
        await axios.post("/faculty/create", formData);
        Swal.fire("Added!", "New faculty added successfully.", "success");
      }
      fetchFaculty();
      resetForm();
    } catch (error) {
      console.error("Submission failed:", error);
      Swal.fire("Error!", "Something went wrong during submission.", "error");
    }
  };

  const handleEdit = (faculty) => {
    setFormData(faculty);
    setEditEmail(faculty.CollegeEmail);
    setIsEditMode(true);
  };

  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This faculty record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/faculty/delete/${email}`);
        Swal.fire("Deleted!", "Faculty deleted successfully.", "success");
        fetchFaculty();
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error!", "Failed to delete faculty.", "error");
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center underline text-gray-800">
          Faculty List
        </h1>

        {/* Add/Edit Form */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {isEditMode ? "Edit Faculty" : "Add Faculty"}
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {["Name", "CollegeEmail", "Qualification", "Department"].map((field) => (
              <div key={field} className="flex items-center space-x-2 w-[900px]">
                <label className="font-medium w-82 text-right">{field}:</label>
                <input
                  type={field === "CollegeEmail" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.toLowerCase()}`}
                  className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isEditMode && field === "CollegeEmail"}
                />
              </div>
            ))}

            <div className="flex items-start space-x-2 w-[900px]">
              <label className="font-medium w-82 text-right mt-2">Description:</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Enter short description"
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
              {isEditMode ? "Update Faculty" : "Add Faculty"}
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
                <th className="p-2">Name</th>
                <th className="p-2">College Email</th>
                <th className="p-2">Qualification</th>
                <th className="p-2">Department</th>
                <th className="p-2">Description</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {facultyList.map((faculty, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{faculty.Name}</td>
                  <td className="p-2">{faculty.CollegeEmail}</td>
                  <td className="p-2">{faculty.Qualification}</td>
                  <td className="p-2">{faculty.Department}</td>
                  <td className="p-2">{faculty.Description}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(faculty)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faculty.CollegeEmail)}
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

export default FacultyPage;
