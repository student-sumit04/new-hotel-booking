import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useAuth } from "../../context/UserContext";

const ContactMessages = () => {
  const [auth] = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/contact/messages`,
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (data?.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchMessages();
  }, [auth?.token]);

  return (
    <div className="flex p-4">
      <Navbar />
      <div className="w-full ml-8">
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4">
          Contact Messages
        </h2>

        {loading && <p className="text-gray-600">Loading...</p>}

        {!loading && messages.length === 0 && (
          <p className="text-gray-600">No messages yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="rounded-lg border border-gray-200 bg-white shadow-sm p-4"
            >
              <div className="text-sm text-gray-500 mb-2">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {msg.subject}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{msg.message}</p>
              <div className="text-sm text-gray-700">
                <div>
                  <span className="font-semibold">Name:</span> {msg.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {msg.email}
                </div>
                {msg.phone && (
                  <div>
                    <span className="font-semibold">Phone:</span> {msg.phone}
                  </div>
                )}
                {msg.source && (
                  <div>
                    <span className="font-semibold">Source:</span> {msg.source}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;
