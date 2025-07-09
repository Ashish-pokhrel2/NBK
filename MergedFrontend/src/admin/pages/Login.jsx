import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import logo from "../../assets/imgs/logo.jpeg";

function Login() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="College Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Admin Login
        </h2>

        {/* Admin Login Form */}
        <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await axios.post("/admin/login", {
                  email: adminEmail,
                  password: adminPassword,
                });
                if (res.data.success && res.data.token) {
                  setAdminSuccess(true);
                  setAdminError("");
                  // Store JWT token in localStorage
                  localStorage.setItem("token", res.data.token);
                  setTimeout(() => navigate("/admin/dashboard"), 1000);
                } else {
                  setAdminError("Invalid admin credentials");
                  setAdminSuccess(false);
                }
              } catch (error) {
                console.error("Login error:", error);
                setAdminError("Invalid admin credentials");
                setAdminSuccess(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="admin-email"
                name="email"
                value={adminEmail || ""}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="admin-password"
                name="password"
                value={adminPassword || ""}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
            >
              Login
            </button>
            {adminError && (
              <div className="text-red-600 text-sm text-center">{adminError}</div>
            )}
            {adminSuccess && (
              <div className="text-green-600 text-sm text-center">
                Login successful! Welcome, Admin.
              </div>
            )}
          </form>
      </div>
    </div>
  );
}

export default Login;
