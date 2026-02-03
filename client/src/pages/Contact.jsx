import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call - Replace with actual API endpoint when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-3xl text-blue-600" />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"],
    },
    {
      icon: <FaEnvelope className="text-3xl text-blue-600" />,
      title: "Email",
      details: ["support@mydreamplace.com", "info@mydreamplace.com"],
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-blue-600" />,
      title: "Address",
      details: ["123 MG Road, Connaught Place", "New Delhi, Delhi 110001, India"],
    },
    {
      icon: <FaClock className="text-3xl text-blue-600" />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">Get In Touch</h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{info.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Contact Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Send Us A Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div>
            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.91060891314!2d77.04417449999999!3d28.527554400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi%2C%20India!5e0!3m2!1sen!2s!4v1645564891234!5m2!1sen!2s"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    How quickly will I receive a response?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Can I call for urgent matters?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes! Our phone lines are open during business hours for urgent inquiries.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Do you offer live chat support?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Live chat is available Mon-Fri from 9 AM to 6 PM EST.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Follow Us On Social Media</h2>
          <p className="text-lg mb-8">
            Stay connected and get the latest updates, travel tips, and exclusive offers
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 w-14 h-14 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-400 w-14 h-14 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-pink-600 w-14 h-14 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-700 w-14 h-14 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
