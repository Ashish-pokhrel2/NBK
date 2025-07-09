import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
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
  CheckCircle2
} from 'lucide-react';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'System Update Available',
      message: 'A new system update is available for download. This update includes security patches and performance improvements.',
      fullContent: 'A new system update (version 2.1.4) is available for download. This update includes important security patches, performance improvements, and new features. The update process will take approximately 15 minutes and requires a system restart. Please ensure all important work is saved before proceeding with the update.',
      timestamp: '2 hours ago',
      read: false,
      attachment: {
        name: 'update_notes_v2.1.4.pdf',
        size: '2.4 MB',
        type: 'pdf'
      }
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment Processed Successfully',
      message: 'Your payment of $299.99 has been processed successfully for your Pro subscription.',
      fullContent: 'Your payment of $299.99 has been processed successfully for your Pro subscription. Your account has been upgraded and all premium features are now available. This payment will be automatically renewed on the 15th of next month unless you choose to cancel. You can manage your subscription settings in your account dashboard.',
      timestamp: '1 day ago',
      read: true,
      attachment: {
        name: 'payment_receipt_inv_001234.pdf',
        size: '156 KB',
        type: 'pdf'
      }
    },
    {
      id: 3,
      type: 'warning',
      title: 'Password Security Alert',
      message: 'We detected a login attempt from a new device. Please verify if this was you.',
      fullContent: 'We detected a login attempt from a new device (iPhone 15 Pro) at IP address 192.168.1.45 on January 15, 2025 at 3:24 PM EST. The login was from New York, NY. If this was you, no action is required. If you do not recognize this activity, please immediately change your password and enable two-factor authentication. You can review all recent login activity in your security settings.',
      timestamp: '3 days ago',
      read: false,
      attachment: {
        name: 'login_activity_report.csv',
        size: '45 KB',
        type: 'csv'
      }
    },
    {
      id: 4,
      type: 'info',
      title: 'New Feature: Dark Mode',
      message: 'Dark mode is now available! Switch to dark mode in your settings for a better nighttime experience.',
      fullContent: 'We are excited to announce that dark mode is now available across all our applications! You can now switch to dark mode in your user settings for a more comfortable viewing experience, especially during nighttime usage. Dark mode reduces eye strain and can help save battery life on OLED displays. The setting will sync across all your devices automatically.',
      timestamp: '1 week ago',
      read: true,
      attachment: {
        name: 'dark_mode_guide.pdf',
        size: '1.8 MB',
        type: 'pdf'
      }
    },
    {
      id: 5,
      type: 'success',
      title: 'Backup Completed',
      message: 'Your data backup has been completed successfully. All files are securely stored.',
      fullContent: 'Your scheduled data backup has been completed successfully. A total of 2.4 GB of data has been securely backed up to our encrypted cloud storage. This includes all your documents, settings, and preferences. The backup is encrypted with AES-256 encryption and can be restored at any time from your account dashboard. Your next automatic backup is scheduled for next Monday at 2:00 AM.',
      timestamp: '2 weeks ago',
      read: true,
      attachment: {
        name: 'backup_summary_jan_2025.zip',
        size: '2.4 GB',
        type: 'zip'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedNotifications, setExpandedNotifications] = useState(new Set());

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

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

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const downloadAttachment = (attachment) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = attachment.name;
    link.click();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.read) ||
                         (filter === 'read' && notification.read);
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    // Sort unread notifications to the top
    if (a.read === b.read) return 0;
    return a.read ? 1 : -1;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
    <Header />    
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <BellRing className="w-8 h-8 text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 text-sm">
                  {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border-l-4 transition-all duration-300 hover:shadow-md ${
                  notification.read ? 'border-gray-300' : 'border-blue-500 shadow-lg'
                } ${getTypeColor(notification.type)}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${
                            notification.read ? 'text-gray-700' : 'text-gray-900 font-bold'
                          }`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {notification.timestamp}
                            </span>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                title="Mark as read"
                              >
                                <Circle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm mb-3 ${
                          notification.read ? 'text-gray-600' : 'text-gray-800 font-medium'
                        }`}>
                          {notification.message}
                        </p>
                        
                        {/* Attachment */}
                        {notification.attachment && (
                          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3">
                            <div className="flex items-center space-x-3">
                              <Paperclip className="w-4 h-4 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.attachment.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {notification.attachment.size}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => downloadAttachment(notification.attachment)}
                              className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </button>
                          </div>
                        )}

                        {/* Expand/Collapse */}
                        <button
                          onClick={() => toggleNotificationExpansion(notification.id)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium"
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
                        {notification.fullContent}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
    <Footer />
    </>

  );
};

export default Notification;