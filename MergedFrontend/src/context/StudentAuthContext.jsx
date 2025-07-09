import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentAuthContext = createContext();

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error('useStudentAuth must be used within a StudentAuthProvider');
  }
  return context;
};

export default function StudentAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if student is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (token) {
      // Verify token with backend
      fetch('http://localhost:8000/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Token invalid');
        }
      })
      .then(data => {
        setIsAuthenticated(true);
        setStudent(data.student);
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        localStorage.removeItem('studentToken');
        setIsAuthenticated(false);
        setStudent(null);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (registrationNo, password) => {
    try {
      console.log(`🎓 Attempting login for student: ${registrationNo}`);
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationNo, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Login successful for: ${data.student?.Name} (${data.student?.Email})`);
        localStorage.setItem('studentToken', data.token);
        setIsAuthenticated(true);
        setStudent(data.student);
        return { success: true };
      } else {
        const errorData = await response.json();
        console.log(`❌ Login failed for ${registrationNo}:`, errorData.message);
        return { success: false, message: errorData.message || 'Login failed' };
      }
    } catch (error) {
      console.error('🚨 Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('studentToken');
    setIsAuthenticated(false);
    setStudent(null);
  };

  const getAuthToken = () => {
    return localStorage.getItem('studentToken');
  };

  const value = {
    isAuthenticated,
    student,
    login,
    logout,
    getAuthToken,
    loading
  };

  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
}
