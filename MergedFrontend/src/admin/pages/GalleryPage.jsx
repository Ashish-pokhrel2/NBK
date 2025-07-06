import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../../api/axios";
import Swal from "sweetalert2";

const GalleryPage = () => {
  const [galleryList, setGalleryList] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Image: null,
  });

  const fetchGallery = async () => {
    try {
      const res = await axios.get("/gallery/list");
      setGalleryList(res.data.data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Image") {
      setFormData((prev) => ({ ...prev, Image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({ Title: "", Image: null });
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("title", formData.Title);
    form.append("Image", formData.Image);

    try {
      await axios.post("/gallery/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Success!", "Image uploaded!", "success");
      fetchGallery();
      resetForm();
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire("Error", "Upload failed", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This image will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/gallery/delete/${id}`);
        Swal.fire("Deleted!", "Image deleted successfully.", "success");
        fetchGallery();
      } catch (error) {
        console.error("Failed to delete image:", error);
        Swal.fire("Error!", "Failed to delete image.", "error");
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center underline text-gray-800">
          Gallery Management
        </h1>

        {/* Upload Form */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Upload Image
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center space-x-2 w-[900px]">
              <label className="font-medium w-32 text-right">Title:</label>
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                placeholder="Enter image title"
                className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-2 w-[900px]">
              <label className="font-medium w-32 text-right">Image:</label>
              <input
                type="file"
                name="Image"
                accept="image/*"
                onChange={handleChange}
                className="flex-1"
              />
            </div>
          </form>

          <div className="flex space-x-2 mt-6 ml-124">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload Image
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Gallery Table */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Image ID</th>
                <th className="p-2">Title</th>
                <th className="p-2">Preview</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {galleryList.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{item.ImageID}</td>
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">
                    <img
                      src={`http://localhost:5000/uploads/${item.ImagePath}`}
                      alt={item.title}
                      className="h-16 w-28 object-cover rounded shadow"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(item.ImageID)}
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

export default GalleryPage;
