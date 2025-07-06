import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../../api/axios";
import Swal from "sweetalert2"; // 👈 import SweetAlert2

const MessagePage = () => {
  const [messages, setMessages] = useState([]);

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
        <h1 className="text-4xl font-bold mb-6 text-center underline text-gray-800">
          Message List
        </h1>

        {/* Messages Table */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Sender ID</th>
                <th className="p-2">Sender Name</th>
                <th className="p-2">Sender Email</th>
                <th className="p-2">Sender Number</th>
                <th className="p-2">Message</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{msg.SenderID}</td>
                  <td className="p-2">{msg.SenderName}</td>
                  <td className="p-2">{msg.SenderEmail}</td>
                  <td className="p-2">{msg.SenderNumber}</td>
                  <td className="p-2 max-w-xs truncate" title={msg.Message}>
                    {msg.Message}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(msg.SenderID)}
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

export default MessagePage;
