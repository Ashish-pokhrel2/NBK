import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const FacultyPage = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    CollegeEmail: "",
    Qualification: "",
    Position: "",
    Hierarchy: "faculty",
    EmploymentType: "Full Time",
    Phone: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editEmail, setEditEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/faculty/list");
      console.log("Faculty data:", response.data);

      if (response.data.success) {
        setFacultyList(response.data.data);
      } else {
        console.error("Failed to fetch faculty:", response.data.message);
        Swal.fire("Error!", "Failed to load faculty data", "error");
      }
    } catch (error) {
      console.error("Failed to fetch faculty:", error);
      Swal.fire("Error!", "Failed to connect to the server", "error");
    } finally {
      setLoading(false);
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
      Position: "",
      Hierarchy: "faculty",
      EmploymentType: "Full Time",
      Phone: "",
    });
    setIsEditMode(false);
    setEditEmail("");
    setSelectedImage(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.Name) {
        Swal.fire("Error!", "Name is required", "error");
        return;
      }

      setSubmitting(true);

      // Form submission based on mode
      if (isEditMode) {
        console.log(`Updating faculty with email: ${editEmail}`, formData);
        const response = await axios.put(`/faculty/update/${editEmail}`, formData);
        console.log('Update response:', response);
        if (response.data.success) {
          // If an image was selected, upload it
          if (selectedImage) {
            await uploadImage(editEmail);
          }
          Swal.fire("Updated!", "Faculty information updated successfully.", "success");
          fetchFaculty();
          resetForm();
        } else {
          Swal.fire("Error!", response.data.message || "Update failed", "error");
        }
      } else {
        const response = await axios.post("/faculty/create", formData);
        console.log('Create response:', response);
        if (response.data.success) {
          let successMessage = "New faculty added successfully.";
          
          // If email was auto-generated, show it in the success message
          if (!formData.CollegeEmail && response.data.faculty?.CollegeEmail) {
            successMessage += ` Email auto-generated: ${response.data.faculty.CollegeEmail}`;
          }
          
          // If an image was selected, upload it
          if (selectedImage && response.data.faculty?.CollegeEmail) {
            await uploadImage(response.data.faculty.CollegeEmail);
            successMessage += " Image uploaded successfully.";
          }
          
          Swal.fire("Added!", successMessage, "success");
          fetchFaculty();
          resetForm();
        } else {
          Swal.fire("Error!", response.data.message || "Failed to add faculty", "error");
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
      Swal.fire("Error!", error.response?.data?.message || "Something went wrong during submission.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (faculty) => {
    console.log("Editing faculty:", faculty);
    
    // First scroll to the form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Then set form data with a slight delay to ensure the scroll has started
    setTimeout(() => {
      setFormData({
        Name: faculty.Name || "",
        CollegeEmail: faculty.CollegeEmail || "",
        Qualification: faculty.Qualification || "",
        Position: faculty.Position || "",
        Hierarchy: faculty.Hierarchy || "faculty",
        EmploymentType: faculty.EmploymentType || "Full Time",
        Phone: faculty.Phone || "",
      });
      setEditEmail(faculty.CollegeEmail);
      setIsEditMode(true);
      
      // If faculty has an image, set the preview URL
      if (faculty.ImageURL) {
        setPreviewUrl(`http://localhost:8000${faculty.ImageURL}`);
      } else {
        setPreviewUrl('');
      }
    }, 100);
    
    // Highlight the form
    const formElement = document.querySelector('.bg-white.rounded.shadow.p-4.mb-6');
    if (formElement) {
      formElement.classList.add('ring-2', 'ring-yellow-400');
      setTimeout(() => {
        formElement.classList.remove('ring-2', 'ring-yellow-400');
      }, 2000);
    }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const uploadImage = async (email) => {
    if (!selectedImage) {
      return null;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post(
        `/faculty/upload-image/${email}`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        return response.data.imageURL;
      } else {
        throw new Error(response.data.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      Swal.fire('Error!', 'Failed to upload image.', 'error');
      return null;
    } finally {
      setUploadingImage(false);
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
            {/* Instructor Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">
                  Instructor: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="Enter instructor name"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    !formData.Name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {!formData.Name && (
                  <p className="text-red-500 text-xs mt-1">Instructor name is required</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">Position/Rank:</label>
                <input
                  type="text"
                  name="Position"
                  value={formData.Position}
                  onChange={handleChange}
                  placeholder="Enter position/rank"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Education and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">Education:</label>
                <input
                  type="text"
                  name="Qualification"
                  value={formData.Qualification}
                  onChange={handleChange}
                  placeholder="Enter education"
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">Phone:</label>
                <input
                  type="text"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Employment Type and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">Employment Type:</label>
                <select
                  name="EmploymentType"
                  value={formData.EmploymentType}
                  onChange={handleChange}
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Course Contract">Course Contract</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 mb-1">
                  College Email:
                </label>
                <input
                  type="email"
                  name="CollegeEmail"
                  value={formData.CollegeEmail}
                  onChange={handleChange}
                  placeholder="Optional - will be auto-generated if empty"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isEditMode}
                />
                {!isEditMode && (
                  <p className="text-gray-500 text-xs mt-1">
                    {formData.Name 
                      ? `If left empty, email will be generated as: ${formData.Name.toLowerCase().replace(/\s+/g, '.')}@nbk.edu.np`
                      : "Email will be auto-generated based on name (name.lastname@nbk.edu.np)"}
                  </p>
                )}
                {isEditMode && (
                  <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>
                )}
              </div>
            </div>

            {/* Hierarchy */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">Hierarchy:</label>
              <select
                name="Hierarchy"
                value={formData.Hierarchy}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="faculty">Faculty Members</option>
                <option value="bod">Board of Directors</option>
                <option value="executive">Executive Leadership</option>
                <option value="coordinators">Coordinators</option>
                <option value="management">Management Teams</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">Profile Image:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Upload a profile image for the faculty member (Max size: 5MB)
                  </p>
                </div>
                <div className="flex justify-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-32 w-32 object-cover rounded-full border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setPreviewUrl('');
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`px-6 py-2 rounded transition-colors ${
                submitting 
                  ? "bg-gray-500 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditMode ? "Updating..." : "Adding..."}
                </span>
              ) : (
                isEditMode ? "Update Faculty" : "Add Faculty"
              )}
            </button>
            {isEditMode && (
              <button
                onClick={resetForm}
                disabled={submitting}
                className={`px-6 py-2 rounded transition-colors ${
                  submitting 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gray-400 hover:bg-gray-500"
                } text-white`}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Faculty List Table */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="ml-4 text-lg text-gray-600">Loading faculty data...</p>
            </div>
          ) : facultyList.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              No faculty members found. Add your first faculty member using the form above.
            </div>
          ) : (
            <table className="table-auto w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Instructor</th>
                  <th className="p-2">Education</th>
                  <th className="p-2">Position/Rank</th>
                  <th className="p-2">Hierarchy</th>
                  <th className="p-2">Employment Type</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">
                      {faculty.ImageURL ? (
                        <img 
                          src={`http://localhost:8000${faculty.ImageURL}`} 
                          alt={faculty.Name}
                          className="h-12 w-12 object-cover rounded-full border border-gray-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/50?text=N/A';
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="p-2">{faculty.Name}</td>
                    <td className="p-2">{faculty.Qualification || 'N/A'}</td>
                    <td className="p-2">{faculty.Position || 'N/A'}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold
                        ${faculty.Hierarchy === 'bod' ? 'bg-purple-100 text-purple-800' :
                          faculty.Hierarchy === 'executive' ? 'bg-blue-100 text-blue-800' :
                          faculty.Hierarchy === 'coordinators' ? 'bg-green-100 text-green-800' :
                          faculty.Hierarchy === 'management' ? 'bg-gray-100 text-gray-800' :
                          'bg-orange-100 text-orange-800'}`}>
                        {faculty.Hierarchy || 'faculty'}
                      </span>
                    </td>
                    <td className="p-2">{faculty.EmploymentType || 'Full Time'}</td>
                    <td className="p-2">{faculty.Phone || 'N/A'}</td>
                    <td className="p-2">{faculty.CollegeEmail}</td>
                    <td className="p-2 flex space-x-2">
                      <button
                        onClick={() => handleEdit(faculty)}
                        className="text-yellow-600 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faculty.CollegeEmail)}
                        className="text-red-600 hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default FacultyPage;
