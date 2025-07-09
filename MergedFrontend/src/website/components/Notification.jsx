import React, { useState, useEffect  } from 'react';
import Footer from './Footer';
import Header from './Header';
import axios from '../../api/axios';
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
  const [notifications, setNotifications] = useState([]);

  // Fetching data from API 

  const fetchNotifications = async () => {
    try{
      const res = await axios.get('/notice/list');
      setNotifications(res.data.data);   // Storing the fetched data in state
    }


    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);



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