import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useStudentAuth } from '../../context/StudentAuthContext';
import Header from './Header';
import Footer from './Footer';
import '../../styles/StudentLogin.css';

export default function StudentLogin() {
  const [registrationNo, setRegistrationNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useStudentAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination or default to notifications
  const from = location.state?.from?.pathname || '/notification';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(registrationNo, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="student-login-container">
        <div className="student-login-card">
          <div className="student-login-header">
            <h2>Student Login</h2>
            <p>Access your notifications and announcements</p>
          </div>
          
          <form onSubmit={handleSubmit} className="student-login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="registrationNo">Registration Number</label>
              <input
                type="text"
                id="registrationNo"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                required
                placeholder="Enter your registration number"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="student-login-footer">
            <p>Need help? Contact the administration office.</p>
            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
