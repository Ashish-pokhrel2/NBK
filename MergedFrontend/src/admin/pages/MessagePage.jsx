import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../../api/axios";
import Swal from "sweetalert2"; // 👈 import SweetAlert2

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [expandedMessages, setExpandedMessages] = useState(new Set());

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/messages/list");
      setMessages(res.data.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleMessageExpansion = (messageId) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId);
    } else {
      newExpanded.add(messageId);
    }
    setExpandedMessages(newExpanded);
  };

  const isMessageExpanded = (messageId) => {
    return expandedMessages.has(messageId);
  };

  const formatMessage = (message) => {
    // Split message into lines and format nicely
    return message.split('\n').map((line, index) => (
      <div key={index} className={line.startsWith('Subject:') ? 'font-semibold text-blue-600' : ''}>
        {line}
      </div>
    ));
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This message will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/messages/delete/${id}`);

        // ✅ Remove the deleted message from UI immediately
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.SenderID !== id)
        );

        Swal.fire("Deleted!", "The message has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the message.", "error");
        console.error("Failed to delete message:", error);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 text-center underline text-gray-800">
            Message Management
          </h1>
          <div className="text-center text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {messages.length} Total Messages
            </span>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold">ID</th>
                <th className="p-3 text-left font-semibold">Name</th>
                <th className="p-3 text-left font-semibold">Email</th>
                <th className="p-3 text-left font-semibold">Phone</th>
                <th className="p-3 text-left font-semibold">Message Preview</th>
                <th className="p-3 text-left font-semibold">Date</th>
                <th className="p-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <React.Fragment key={index}>
                  <tr className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">#{msg.SenderID}</td>
                    <td className="p-3 text-gray-700">{msg.SenderName}</td>
                    <td className="p-3 text-gray-700">
                      <a href={`mailto:${msg.SenderEmail}`} className="text-blue-600 hover:underline">
                        {msg.SenderEmail}
                      </a>
                    </td>
                    <td className="p-3 text-gray-700">
                      <a href={`tel:${msg.SenderNumber}`} className="text-green-600 hover:underline">
                        {msg.SenderNumber}
                      </a>
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-gray-600">
                          {msg.Message.length > 50 ? `${msg.Message.substring(0, 50)}...` : msg.Message}
                        </span>
                        {msg.Message.length > 50 && (
                          <button
                            onClick={() => toggleMessageExpansion(msg.MessageID || msg.SenderID)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors flex-shrink-0"
                          >
                            {isMessageExpanded(msg.MessageID || msg.SenderID) ? '▼ Less' : '▶ View'}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-gray-500 text-sm">
                      {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(msg.SenderID)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {/* Expanded Message Row */}
                  {isMessageExpanded(msg.MessageID || msg.SenderID) && (
                    <tr className="border-t bg-blue-50">
                      <td colSpan="7" className="p-4">
                        <div className="bg-white rounded-lg border shadow-sm p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-gray-800 text-lg">📧 Full Message</h4>
                            <button
                              onClick={() => toggleMessageExpansion(msg.MessageID || msg.SenderID)}
                              className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {formatMessage(msg.Message)}
                          </div>
                          <div className="mt-3 flex justify-between text-xs text-gray-500 border-t pt-2">
                            <span>From: {msg.SenderName} ({msg.SenderEmail})</span>
                            {msg.created_at && <span>Received: {new Date(msg.created_at).toLocaleString()}</span>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MessagePage;
