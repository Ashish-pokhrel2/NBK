import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import Swal from "sweetalert2";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Faculty: "",
    Year: "",
    Email: "",
    Number: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editEmail, setEditEmail] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/student/list");
      setStudents(res.data.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits in Number field
    if (name === "Number" && /[^0-9]/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "Year" ? parseInt(value, 10) || "" : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      Name: "",
      Faculty: "",
      Year: "",
      Email: "",
      Number: "",
    });
    setIsEditMode(false);
    setEditEmail("");
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.Name,
      faculty: formData.Faculty,
      year: formData.Year,
      email: formData.Email,
      number: formData.Number,
    };

    try {
      if (isEditMode) {
        await axios.put(`/student/update/${editEmail}`, payload);
        Swal.fire("Updated!", "Student information updated successfully.", "success");
      } else {
        await axios.post("/student/create", payload);
        Swal.fire("Added!", "New student added successfully.", "success");
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      Name: student.Name,
      Faculty: student.Faculty,
      Year: student.Year,
      Email: student.Email,
      Number: student.Number,
    });
    setEditEmail(student.Email);
    setIsEditMode(true);
  };

  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/student/delete/${email}`);
        Swal.fire("Deleted!", "The student has been deleted.", "success");
        fetchStudents();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete student.", "error");
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center underline text-gray-800">
          Student List
        </h1>

        {/* Student Form */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {isEditMode ? "Edit Student" : "Add Student"}
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {["Name", "Faculty", "Email", "Number"].map((field) => (
              <div key={field} className="flex items-center space-x-2 w-[900px]">
                <label className="font-medium w-82 text-right">{field}:</label>
                <input
                  type={field === "Email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.toLowerCase()}`}
                  className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isEditMode && field === "Email"}
                  inputMode={field === "Number" ? "numeric" : undefined}
                  maxLength={field === "Number" ? 10 : undefined}
                />
              </div>
            ))}

            {/* Year Dropdown */}
            <div className="flex items-center space-x-2 w-[900px]">
              <label className="font-medium w-82 text-right">Year:</label>
              <select
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Year</option>
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
              </select>
            </div>
          </form>

          <div className="flex space-x-2 mt-6 ml-124">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditMode ? "Update Student" : "Add Student"}
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

        {/* Student Table */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Faculty</th>
                <th className="p-2">Year</th>
                <th className="p-2">Email</th>
                <th className="p-2">Number</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{student.Name}</td>
                  <td className="p-2">{student.Faculty}</td>
                  <td className="p-2">{student.Year}</td>
                  <td className="p-2">{student.Email}</td>
                  <td className="p-2">{student.Number}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.Email)}
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

export default StudentPage;
