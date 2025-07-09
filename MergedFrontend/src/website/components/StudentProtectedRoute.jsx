import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStudentAuth } from '../../context/StudentAuthContext';

export default function StudentProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useStudentAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Loading...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to student login page with return URL
    return <Navigate to="/student-login" state={{ from: location }} replace />;
  }

  return children;
}
