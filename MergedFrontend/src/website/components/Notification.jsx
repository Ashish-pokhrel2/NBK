import React, { useState, useEffect  } from 'react';
import Footer from './Footer';
import Header from './Header';
import axios from '../../api/axios';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  BellRing, 
  CheckCircle, 
  Circle, 
  Download, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Paperclip, 
  Calendar, 
  User,
  AlertCircle,
  Info,
  CheckCircle2,
  LogOut,
  X,
  Mail,
  GraduationCap,
  IdCard,
  School,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { logout, getAuthToken, student } = useStudentAuth();
  const navigate = useNavigate();
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Fetching data from API with authentication
  const fetchNotifications = React.useCallback(async () => {
    try{
      console.log('Fetching notifications...');
      const token = getAuthToken();
      console.log('🔑 Using token:', token?.substring(0, 20) + '...');
      const res = await axios.get('/notice/student-notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('📋 Notifications response:', res.data);
      setNotifications(res.data.data);   // Storing the fetched data in state
    }
    catch(error){
      console.log('❌ Error fetching notifications:', error);
      if (error.response?.status === 401) {
        // Token expired or invalid, logout user
        logout();
        navigate('/student-login');
      }
    }
  }, [getAuthToken, logout, navigate]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isProfileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isProfileSidebarOpen]);

  // Handle ESC key to close sidebar
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isProfileSidebarOpen) {
        setIsProfileSidebarOpen(false);
      }
    };

    if (isProfileSidebarOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isProfileSidebarOpen]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };



  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedNotifications, setExpandedNotifications] = useState(new Set());

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-blue-200 bg-blue-50';
      case 'warning':
        return 'border-red-200 bg-red-50';
      case 'error':
        return 'border-red-300 bg-red-100';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const toggleNotificationExpansion = (id) => {
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotifications(newExpanded);
  };

  const markAsRead = async (id) => {
    try {
      const token = getAuthToken();
      console.log(`📖 Marking notification ${id} as read with token:`, token?.substring(0, 20) + '...');
      // Call backend API to mark as read with authentication
      await axios.put(`/notice/mark-read/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log(`✅ Successfully marked notification ${id} as read`);
      // Refetch notifications to get updated read status from server
      await fetchNotifications();
    } catch (error) {
      console.error('❌ Error marking notification as read:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/student-login');
      }
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = getAuthToken();
      // Mark all unread notifications as read via API
      const unreadNotifications = notifications.filter(n => !n.isRead);
      
      for (const notification of unreadNotifications) {
        await axios.put(`/notice/mark-read/${notification.id}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      // Refetch notifications to get updated read status from server
      await fetchNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/student-login');
      }
    }
  };

  const downloadAttachment = (attachmentPath) => {
    if (attachmentPath) {
      try {
        // Create download link using the backend uploads URL
        const downloadUrl = `http://localhost:8000/uploads/${attachmentPath}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = attachmentPath;
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Optional: Show success message
        console.log('✅ Download started for:', attachmentPath);
      } catch (error) {
        console.error('❌ Download failed:', error);
        // Fallback: Open in new tab
        window.open(`http://localhost:8000/uploads/${attachmentPath}`, '_blank');
      }
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.isRead) ||
                         (filter === 'read' && notification.isRead);
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    // Sort unread notifications to the top
    if (a.isRead === b.isRead) {
      // If read status is the same, sort by date (newest first)
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
    return a.isRead ? 1 : -1;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Handle change password
  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('Please fill in all password fields');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    try {
      const token = getAuthToken();
      const response = await axios.put('/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setPasswordSuccess('Password changed successfully!');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Auto-hide success message and form after 3 seconds
        setTimeout(() => {
          setPasswordSuccess('');
          setShowChangePassword(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Change password error:', error);
      setPasswordError(
        error.response?.data?.message || 'Failed to change password. Please try again.'
      );
    }
  };

  // Handle password form input changes
  const handlePasswordInputChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (passwordError) setPasswordError('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>
    <Header />    
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">Notifications</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                Welcome, {student?.Name || 'Student'}
              </span>
              <button
                onClick={() => setIsProfileSidebarOpen(true)}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
                title="View Profile"
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sidebar - No Overlay Version */}
      {isProfileSidebarOpen && (
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 animate-slideInRight overflow-y-auto border-l border-gray-300">
          <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Student Profile</h2>
                  <button
                    onClick={() => setIsProfileSidebarOpen(false)}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors cursor-pointer"
                    title="Close (Press ESC)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{student?.Name || 'Student Name'}</h3>
                    <p className="text-blue-100 text-sm">Student Portal Access</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Registration Number */}
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IdCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Registration Number</p>
                      <p className="text-lg font-bold text-gray-900 font-mono">
                        {student?.registrationNo || student?.Number || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</p>
                      <p className="text-lg font-semibold text-gray-900 break-words">
                        {student?.Email || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Faculty */}
                  {student?.Faculty && (
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <School className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Faculty</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {student.Faculty}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Academic Year */}
                  {student?.Year && (
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Academic Year</p>
                        <p className="text-lg font-semibold text-gray-900">
                          Year {student.Year}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Session Info */}
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Session Started</p>
                      <p className="text-sm text-gray-700">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Change Password Section */}
                  <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Key className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Security</p>
                          <p className="text-sm text-gray-700">Change Your Password</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        {showChangePassword ? 'Cancel' : 'Change'}
                      </button>
                    </div>

                    {showChangePassword && (
                      <div className="space-y-3 mt-4 border-t border-yellow-200 pt-4">
                        {/* Current Password */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? "text" : "password"}
                              value={passwordForm.currentPassword}
                              onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('current')}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? "text" : "password"}
                              value={passwordForm.newPassword}
                              onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                              placeholder="Enter new password (min. 6 chars)"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('new')}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? "text" : "password"}
                              value={passwordForm.confirmPassword}
                              onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('confirm')}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Error Message */}
                        {passwordError && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                            {passwordError}
                          </div>
                        )}

                        {/* Success Message */}
                        {passwordSuccess && (
                          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-xs">
                            {passwordSuccess}
                          </div>
                        )}

                        {/* Change Password Button */}
                        <button
                          onClick={handleChangePassword}
                          className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-2"
                        >
                          <Key className="w-4 h-4" />
                          <span>Update Password</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
      )}

      {/* Notifications Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative bg-blue-600 p-3 rounded-xl shadow-md">
                <BellRing className="w-8 h-8 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center animate-pulse font-bold shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up! 🎉'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 font-medium shadow-md hover:shadow-lg cursor-pointer"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white font-medium shadow-sm cursor-pointer"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-2xl p-8 mx-auto max-w-md">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No notifications found</p>
                <p className="text-gray-400 text-sm mt-2">Check back later for updates</p>
              </div>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border-l-4 transition-all duration-300 hover:shadow-md ${
                  notification.isRead ? 'border-gray-300' : 'border-blue-500 shadow-lg bg-blue-50'
                } ${getTypeColor(notification.type)}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {notification.isRead ? (
                          <CheckCircle2 className="w-5 h-5 text-gray-400" />
                        ) : (
                          <BellRing className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${
                            notification.isRead ? 'text-gray-700' : 'text-gray-900 font-bold'
                          }`}>
                            {notification.title}
                            {!notification.isRead && (
                              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(notification.uploadDate).toLocaleDateString()}
                            </span>
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                                title="Mark as read"
                              >
                                <Circle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm mb-3 ${
                          notification.isRead ? 'text-gray-600' : 'text-gray-800 font-medium'
                        }`}>
                          {notification.description}
                        </p>
                        
                        {/* Attachment */}
                        {notification.Attachment && (
                          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3">
                            <div className="flex items-center space-x-3">
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.Attachment}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Click to download
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => downloadAttachment(notification.Attachment)}
                              className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </button>
                          </div>
                        )}

                        {/* Expand/Collapse */}
                        <button
                          onClick={() => toggleNotificationExpansion(notification.id)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium cursor-pointer"
                        >
                          {expandedNotifications.has(notification.id) ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              <span>Show less</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              <span>Read more</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {expandedNotifications.has(notification.id) && (
                    <div className="mt-4 pl-9 border-t border-gray-200 pt-4 animate-fadeIn">
                      <p className="text-gray-700 leading-relaxed">
                        {notification.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <button
                onClick={() => setShowChangePassword(false)}
                className="text-gray-500 hover:text-gray-700"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              {/* Success Message */}
              {passwordSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium">
                  {passwordSuccess}
                </div>
              )}

              {/* Error Message */}
              {passwordError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm font-medium">
                  {passwordError}
                </div>
              )}

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="Enter your current password"
                  />
                  <button
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    title={showPasswords.current ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="Enter a new password"
                  />
                  <button
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    title={showPasswords.new ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                    placeholder="Confirm your new password"
                  />
                  <button
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    title={showPasswords.confirm ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowChangePassword(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Key className="w-5 h-5" />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { 
            transform: translateX(100%); 
            opacity: 0;
          }
          to { 
            transform: translateX(0); 
            opacity: 1;
          }
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-fadeInOverlay {
          animation: fadeInOverlay 0.3s ease-out;
        }
      `}</style>
    </div>
    <Footer />
    </>

  );
};

export default Notification;