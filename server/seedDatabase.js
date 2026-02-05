import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./src/models/Category.js";
import Post from "./src/models/Post.js";

dotenv.config();

const categories = [
  { name: "Luxury Hotels", slug: "luxury-hotels" },
  { name: "Business Hotels", slug: "business-hotels" },
  { name: "Boutique Hotels", slug: "boutique-hotels" },
  { name: "Resort Hotels", slug: "resort-hotels" },
  { name: "Budget Hotels", slug: "budget-hotels" },
];

const sampleHotels = [
  {
    title: "The Grand Taj Palace Mumbai",
    hotelLocation: "Mumbai, Maharashtra, India",
    description: "Experience luxury at its finest at The Grand Taj Palace. Located in the heart of Mumbai, this iconic hotel offers breathtaking views of the Arabian Sea, world-class dining, and impeccable service.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    ],
    isAvailable: true,
    guest: 4,
    price: 450,
    nearArea: ["Gateway of India", "Marine Drive", "Colaba Causeway"],
    rating: 4.8,
    facilities: ["Free WiFi", "Swimming Pool", "Spa", "Gym", "Restaurant"],
  },
  {
    title: "Oberoi Udaipur Palace",
    hotelLocation: "Udaipur, Rajasthan, India",
    description: "Nestled on the banks of Lake Pichola, Oberoi Udaipur is a majestic palace hotel offering stunning views, royal hospitality, and authentic Rajasthani cuisine.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 380,
    nearArea: ["City Palace", "Lake Pichola", "Jagdish Temple"],
    rating: 4.9,
  },
  {
    title: "The Leela Beach Resort Goa",
    hotelLocation: "Goa, India",
    description: "A beachfront paradise offering luxurious rooms, pristine beaches, water sports, and vibrant nightlife. Perfect for a tropical getaway.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ],
    isAvailable: true,
    guest: 6,
    price: 320,
    nearArea: ["Calangute Beach", "Baga Beach", "Anjuna Flea Market"],
    rating: 4.7,
  },
  {
    title: "ITC Maurya New Delhi",
    hotelLocation: "New Delhi, India",
    description: "A premium business hotel in the heart of India's capital. Modern amenities, conference facilities, and award-winning restaurants make it perfect for business travelers.",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 280,
    nearArea: ["India Gate", "Connaught Place", "Red Fort"],
    rating: 4.6,
  },
  {
    title: "Wildflower Hall Shimla Resort",
    hotelLocation: "Shimla, Himachal Pradesh, India",
    description: "A luxury mountain resort nestled in the Himalayas. Enjoy breathtaking mountain views, pine forests, and serene tranquility.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800",
    ],
    isAvailable: true,
    guest: 4,
    price: 420,
    nearArea: ["Mall Road", "Jakhoo Temple", "Kufri"],
    rating: 4.8,
  },
  {
    title: "Taj View Hotel Agra",
    hotelLocation: "Agra, Uttar Pradesh, India",
    description: "Stay near the iconic Taj Mahal at this elegant boutique hotel. Experience Mughal architecture, fine dining, and cultural richness.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 250,
    nearArea: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
    rating: 4.5,
  },
  {
    title: "Kumarakom Lake Resort Kerala",
    hotelLocation: "Kerala, India",
    description: "A serene backwater resort offering traditional Kerala houseboats, Ayurvedic spa treatments, and lush tropical gardens.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    ],
    isAvailable: true,
    guest: 4,
    price: 350,
    nearArea: ["Vembanad Lake", "Kumarakom Bird Sanctuary", "Backwaters"],
    rating: 4.9,
  },
  {
    title: "The Park Boutique Hotel Bangalore",
    hotelLocation: "Bangalore, Karnataka, India",
    description: "A trendy boutique hotel in India's tech capital. Modern design, rooftop bar, and proximity to IT hubs make it ideal for business and leisure.",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 200,
    nearArea: ["MG Road", "Cubbon Park", "Lalbagh Botanical Garden"],
    rating: 4.4,
  },
  {
    title: "Rambagh Palace Hotel Jaipur",
    hotelLocation: "Jaipur, Rajasthan, India",
    description: "Once the residence of the Maharaja of Jaipur, this palace hotel offers royal luxury, heritage architecture, and regal hospitality.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    ],
    isAvailable: true,
    guest: 5,
    price: 500,
    nearArea: ["Hawa Mahal", "City Palace", "Amber Fort"],
    rating: 4.9,
  },
  {
    title: "Budget Inn Heritage Kolkata",
    hotelLocation: "Kolkata, West Bengal, India",
    description: "An affordable yet comfortable hotel in the cultural capital of India. Clean rooms, friendly staff, and great location near historical sites.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 120,
    nearArea: ["Victoria Memorial", "Howrah Bridge", "Park Street"],
    rating: 4.2,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log("  Cleared old data");

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(` Created ${createdCategories.length} categories`);

    // Assign categories to hotels
    const hotelsWithCategories = sampleHotels.map((hotel, index) => {
      // Distribute hotels across categories
      const categoryIndex = index % createdCategories.length;
      return {
        ...hotel,
        category: createdCategories[categoryIndex]._id,
        slug: hotel.title.toLowerCase().replace(/ /g, "-"),
      };
    });

    // Insert hotels
    const createdHotels = await Post.insertMany(hotelsWithCategories);
    console.log(` Created ${createdHotels.length} hotels`);

    console.log("\n Database seeded successfully!");
    console.log(" Summary:");
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Hotels: ${createdHotels.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error(" Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
