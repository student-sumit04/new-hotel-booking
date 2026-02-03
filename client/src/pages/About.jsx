import React from "react";
import {
  FaHotel,
  FaGlobeAmericas,
  FaUsers,
  FaAward,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  const stats = [
    { number: "500+", label: "Hotels Worldwide" },
    { number: "1M+", label: "Happy Guests" },
    { number: "150+", label: "Countries" },
    { number: "24/7", label: "Customer Support" },
  ];

  const values = [
    {
      icon: <FaHeart className="text-5xl text-red-500" />,
      title: "Customer First",
      description:
        "We prioritize your comfort and satisfaction above all else, ensuring every stay is memorable.",
    },
    {
      icon: <FaGlobeAmericas className="text-5xl text-blue-500" />,
      title: "Global Reach",
      description:
        "Access to premium hotels and destinations across the globe, all at your fingertips.",
    },
    {
      icon: <FaAward className="text-5xl text-yellow-500" />,
      title: "Excellence",
      description:
        "Committed to providing world-class service and unforgettable experiences.",
    },
    {
      icon: <FaCheckCircle className="text-5xl text-green-500" />,
      title: "Trust & Safety",
      description:
        "Secure bookings with verified properties and 24/7 customer support.",
    },
  ];

  const team = [
    {
      name: "Priya Sharma",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahul Verma",
      role: "Chief Technology Officer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Anjali Patel",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Arjun Singh",
      role: "Customer Experience Director",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">About Us</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Creating unforgettable travel experiences since 2010. Your dream vacation is our mission.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded in 2010, My Dream Place began with a simple vision: to make dream vacations accessible to everyone. What started as a small boutique travel agency has grown into a global platform connecting millions of travelers with their perfect destinations.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We believe that travel has the power to transform lives, broaden perspectives, and create lasting memories. Our team of dedicated travel experts works tirelessly to curate the finest selection of hotels, resorts, and unique accommodations around the world.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're proud to serve over a million guests annually, offering personalized service, competitive prices, and an unwavering commitment to making every journey extraordinary.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500"
              alt="Luxury Hotel"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500"
              alt="Hotel Room"
              className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500"
              alt="Beach Resort"
              className="rounded-lg shadow-lg w-full h-64 object-cover -mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500"
              alt="Mountain Resort"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-5xl font-bold mb-2">{stat.number}</h3>
                <p className="text-xl">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our passionate team of travel experts is dedicated to making your dream vacation a reality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-12 text-center">
          <FaHotel className="text-6xl mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed">
            To inspire and enable people to explore the world, creating meaningful connections and unforgettable memories through exceptional travel experiences. We strive to be your trusted partner in every journey, offering personalized service, competitive prices, and access to the world's finest accommodations.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Properties</h3>
              <p className="text-gray-600">
                Every hotel is carefully vetted to ensure quality and authenticity
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-4xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always here to assist you, anytime
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-4xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                Competitive rates and exclusive deals for our valued customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
