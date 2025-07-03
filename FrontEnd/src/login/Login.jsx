import React, { useState } from 'react';

function Login() {
  const [userType, setUserType] = useState('student'); // 'student' or 'admin'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png" // Replace with your actual logo path
            alt="College Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Tab Switch */}
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
              userType === 'student'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setUserType('student')}
          >
            Student Login
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
              userType === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setUserType('admin')}
          >
            Admin Login
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          {userType === 'student' ? 'Student Login' : 'Admin Login'}
        </h2>

        {/* Login Form */}
        <form
          action={userType === 'student' ? '/login/student' : '/login/admin'}
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
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

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
