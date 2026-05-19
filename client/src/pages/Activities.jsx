import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaHiking,
  FaSwimmer,
  FaUmbrellaBeach,
  FaMountain,
  FaSkiing,
  FaBiking,
  FaCamera,
  FaUtensils,
  FaSpa,
  FaWater,
  FaGolfBall,
  FaHorse,
} from "react-icons/fa";

const Activities = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();

  const activities = [
    {
      id: 1,
      name: "Hiking & Trekking",
      icon: <FaHiking className="text-6xl mb-4" />,
      description:
        "Explore scenic trails and mountain paths. Experience nature at its finest with guided hiking tours through breathtaking landscapes.",
      features: [
        "Professional guides",
        "All skill levels",
        "Scenic routes",
        "Safety equipment included",
      ],
      duration: "Half-day to multi-day",
      difficulty: "Easy to Advanced",
    },
    {
      id: 2,
      name: "Water Sports",
      icon: <FaSwimmer className="text-6xl mb-4" />,
      description:
        "Dive into adventure with kayaking, snorkeling, and surfing. Perfect for water enthusiasts looking for an adrenaline rush.",
      features: [
        "Equipment provided",
        "Safety training",
        "Multiple locations",
        "Group discounts",
      ],
      duration: "2-4 hours",
      difficulty: "Beginner to Intermediate",
    },
    {
      id: 3,
      name: "Beach Activities",
      icon: <FaUmbrellaBeach className="text-6xl mb-4" />,
      description:
        "Relax on pristine beaches with volleyball, beach yoga, and sunset cruises. The perfect way to unwind and enjoy coastal beauty.",
      features: [
        "Beach equipment",
        "Yoga sessions",
        "Sunset tours",
        "Private cabanas",
      ],
      duration: "Flexible",
      difficulty: "Easy",
    },
    {
      id: 4,
      name: "Mountain Climbing",
      icon: <FaMountain className="text-6xl mb-4" />,
      description:
        "Challenge yourself with mountain climbing expeditions. Reach new heights with experienced instructors and top-grade equipment.",
      features: [
        "Expert instructors",
        "Safety gear",
        "Small groups",
        "Certificate included",
      ],
      duration: "Full day",
      difficulty: "Intermediate to Advanced",
    },
    {
      id: 5,
      name: "Skiing & Snowboarding",
      icon: <FaSkiing className="text-6xl mb-4" />,
      description:
        "Hit the slopes with skiing and snowboarding lessons. Enjoy winter wonderlands with state-of-the-art facilities.",
      features: [
        "Equipment rental",
        "Lessons available",
        "Multiple slopes",
        "Heated lodges",
      ],
      duration: "Half-day to full day",
      difficulty: "Beginner to Advanced",
    },
    {
      id: 6,
      name: "Cycling Tours",
      icon: <FaBiking className="text-6xl mb-4" />,
      description:
        "Pedal through picturesque countryside and urban landscapes. Discover hidden gems on our guided cycling tours.",
      features: [
        "Bike rental",
        "Guided tours",
        "Refreshments",
        "Photo stops",
      ],
      duration: "3-6 hours",
      difficulty: "Easy to Intermediate",
    },
    {
      id: 7,
      name: "Photography Tours",
      icon: <FaCamera className="text-6xl mb-4" />,
      description:
        "Capture stunning moments with professional photography tours. Learn techniques while exploring beautiful locations.",
      features: [
        "Pro photographer guide",
        "Best viewpoints",
        "Photo editing tips",
        "Small groups",
      ],
      duration: "4-8 hours",
      difficulty: "All levels",
    },
    {
      id: 8,
      name: "Culinary Experiences",
      icon: <FaUtensils className="text-6xl mb-4" />,
      description:
        "Savor local cuisine with cooking classes and food tours. Taste authentic flavors and learn traditional recipes.",
      features: [
        "Cooking classes",
        "Market tours",
        "Wine tasting",
        "Recipe booklet",
      ],
      duration: "3-5 hours",
      difficulty: "Easy",
    },
    {
      id: 9,
      name: "Spa & Wellness",
      icon: <FaSpa className="text-6xl mb-4" />,
      description:
        "Rejuvenate with spa treatments and wellness programs. Relax and restore your mind, body, and spirit.",
      features: [
        "Massage therapy",
        "Yoga & meditation",
        "Wellness programs",
        "Natural treatments",
      ],
      duration: "1-3 hours",
      difficulty: "Easy",
    },
    {
      id: 10,
      name: "Scuba Diving",
      icon: <FaWater className="text-6xl mb-4" />,
      description:
        "Explore underwater worlds with certified scuba diving courses. Discover marine life in crystal-clear waters.",
      features: [
        "PADI certified",
        "Equipment included",
        "Multiple dive sites",
        "Underwater photography",
      ],
      duration: "Half-day to full day",
      difficulty: "Beginner to Advanced",
    },
    {
      id: 11,
      name: "Golf",
      icon: <FaGolfBall className="text-6xl mb-4" />,
      description:
        "Tee off at world-class golf courses. Enjoy championship courses with stunning views and premium facilities.",
      features: [
        "18-hole courses",
        "Equipment rental",
        "Pro lessons",
        "Clubhouse access",
      ],
      duration: "4-5 hours",
      difficulty: "All levels",
    },
    {
      id: 12,
      name: "Horse Riding",
      icon: <FaHorse className="text-6xl mb-4" />,
      description:
        "Explore trails on horseback with guided riding tours. Perfect for nature lovers and adventure seekers.",
      features: [
        "Gentle horses",
        "Experienced guides",
        "Scenic trails",
        "Photo opportunities",
      ],
      duration: "2-4 hours",
      difficulty: "Beginner to Intermediate",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">
            Exciting Activities & Experiences
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Make your stay unforgettable with our curated selection of activities.
            From adventure sports to relaxing spa treatments, there's something for everyone.
          </p>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="text-blue-600 flex justify-center">
                {activity.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                {activity.name}
              </h3>
              <p className="text-gray-600 text-center text-sm mb-4">
                {activity.description.substring(0, 100)}...
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedActivity.name}
              </h2>
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="text-blue-600 flex justify-center mb-6">
              {selectedActivity.icon}
            </div>

            <p className="text-gray-700 mb-6">{selectedActivity.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Duration</h4>
                <p className="text-gray-600">{selectedActivity.duration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Difficulty</h4>
                <p className="text-gray-600">{selectedActivity.difficulty}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Features Included</h4>
              <ul className="grid grid-cols-2 gap-2">
                {selectedActivity.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                toast.info("Share your details and we will arrange this activity.");
                navigate("/contact", {
                  state: {
                    subject: `Activity Booking: ${selectedActivity.name}`,
                  },
                });
                setSelectedActivity(null);
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Book This Activity
            </button>
          </div>
        </div>
      )}

      {/* Why Choose Our Activities Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Our Activities?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Guides</h3>
              <p className="text-gray-600">
                All activities led by certified and experienced professionals
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Equipment</h3>
              <p className="text-gray-600">
                Top-quality gear and equipment for all activities
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-gray-600">
                Comprehensive safety measures and insurance coverage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
