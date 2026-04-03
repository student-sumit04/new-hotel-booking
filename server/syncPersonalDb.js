import mongoose from "mongoose";
import dotenv from "dotenv";
import slugify from "slugify";
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
    description:
      "Experience luxury at its finest at The Grand Taj Palace. Located in the heart of Mumbai, this iconic hotel offers breathtaking views of the Arabian Sea, world-class dining, and impeccable service.",
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
    description:
      "Nestled on the banks of Lake Pichola, Oberoi Udaipur is a majestic palace hotel offering stunning views, royal hospitality, and authentic Rajasthani cuisine.",
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
    facilities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
  },
  {
    title: "The Leela Beach Resort Goa",
    hotelLocation: "Goa, India",
    description:
      "A beachfront paradise offering luxurious rooms, pristine beaches, water sports, and vibrant nightlife. Perfect for a tropical getaway.",
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
    facilities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
  },
  {
    title: "ITC Maurya New Delhi",
    hotelLocation: "New Delhi, India",
    description:
      "A premium business hotel in the heart of India's capital. Modern amenities, conference facilities, and award-winning restaurants make it perfect for business travelers.",
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
    facilities: ["Free WiFi", "Conference Room", "Restaurant", "Gym"],
  },
  {
    title: "Wildflower Hall Shimla Resort",
    hotelLocation: "Shimla, Himachal Pradesh, India",
    description:
      "A luxury mountain resort nestled in the Himalayas. Enjoy breathtaking mountain views, pine forests, and serene tranquility.",
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
    facilities: ["Free WiFi", "Spa", "Gym", "Restaurant"],
  },
  {
    title: "Taj View Hotel Agra",
    hotelLocation: "Agra, Uttar Pradesh, India",
    description:
      "Stay near the iconic Taj Mahal at this elegant boutique hotel. Experience Mughal architecture, fine dining, and cultural richness.",
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
    facilities: ["Free WiFi", "Restaurant", "Room Service", "Parking"],
  },
  {
    title: "Kumarakom Lake Resort Kerala",
    hotelLocation: "Kerala, India",
    description:
      "A serene backwater resort offering traditional Kerala houseboats, Ayurvedic spa treatments, and lush tropical gardens.",
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
    facilities: ["Free WiFi", "Spa", "Restaurant", "Garden"],
  },
  {
    title: "The Park Boutique Hotel Bangalore",
    hotelLocation: "Bangalore, Karnataka, India",
    description:
      "A trendy boutique hotel in India's tech capital. Modern design, rooftop bar, and proximity to IT hubs make it ideal for business and leisure.",
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
    facilities: ["Free WiFi", "Rooftop Bar", "Gym", "Restaurant"],
  },
  {
    title: "Rambagh Palace Hotel Jaipur",
    hotelLocation: "Jaipur, Rajasthan, India",
    description:
      "Once the residence of the Maharaja of Jaipur, this palace hotel offers royal luxury, heritage architecture, and regal hospitality.",
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
    facilities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
  },
  {
    title: "Budget Inn Heritage Kolkata",
    hotelLocation: "Kolkata, West Bengal, India",
    description:
      "An affordable yet comfortable hotel in the cultural capital of India. Clean rooms, friendly staff, and great location near historical sites.",
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
    facilities: ["Free WiFi", "Parking", "Breakfast", "24h Front Desk"],
  },
  {
    title: "Harbor View Suites Sydney",
    hotelLocation: "Sydney, New South Wales, Australia",
    description:
      "Modern waterfront suites near the Opera House with panoramic harbor views and premium amenities.",
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21034?w=800",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 520,
    nearArea: ["Sydney Opera House", "Circular Quay", "The Rocks"],
    rating: 4.9,
    facilities: ["Free WiFi", "Infinity Pool", "Gym", "Rooftop Bar"],
  },
  {
    title: "Shinjuku Skyline Hotel",
    hotelLocation: "Tokyo, Japan",
    description:
      "A sleek business-focused hotel in central Tokyo with direct rail access and productivity-friendly spaces.",
    images: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=800",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 310,
    nearArea: ["Shinjuku Gyoen", "Tokyo Metropolitan Building", "Kabukicho"],
    rating: 4.6,
    facilities: ["Free WiFi", "Meeting Rooms", "Laundry", "24h Front Desk"],
  },
  {
    title: "Aegean Breeze Boutique Santorini",
    hotelLocation: "Santorini, Greece",
    description:
      "Cliffside boutique rooms with sunset terraces, Cycladic design, and views over the caldera.",
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 410,
    nearArea: ["Oia", "Fira", "Red Beach"],
    rating: 4.8,
    facilities: ["Free WiFi", "Private Terrace", "Breakfast Included", "Spa"],
  },
  {
    title: "Andes Mist Lodge",
    hotelLocation: "Cusco, Peru",
    description:
      "A mountain retreat blending local charm with comfort, ideal for travelers heading to Machu Picchu.",
    images: [
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
    ],
    isAvailable: true,
    guest: 4,
    price: 295,
    nearArea: ["Plaza de Armas", "Sacsayhuaman", "Sacred Valley"],
    rating: 4.7,
    facilities: ["Free WiFi", "Guided Tours", "Restaurant", "Fireplace Lounge"],
  },
  {
    title: "Cape Coast Budget Stay",
    hotelLocation: "Cape Town, South Africa",
    description:
      "A comfortable and affordable stay with easy access to beaches, cafes, and city attractions.",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 170,
    nearArea: ["Table Mountain", "V&A Waterfront", "Camps Bay"],
    rating: 4.3,
    facilities: ["Free WiFi", "Breakfast", "Parking", "Airport Transfer"],
  },
  {
    title: "Old Town Harbor Inn Dubrovnik",
    hotelLocation: "Dubrovnik, Croatia",
    description:
      "A cozy coastal inn near the old city walls, perfect for scenic walks and Adriatic experiences.",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 265,
    nearArea: ["City Walls", "Stradun", "Lokrum Island"],
    rating: 4.5,
    facilities: ["Free WiFi", "Sea View Rooms", "Breakfast", "24h Support"],
  },
  {
    title: "Blue Coast Retreat Auckland",
    hotelLocation: "Auckland, New Zealand",
    description:
      "A waterfront retreat in Auckland with modern rooms, marina views, and easy ferry access.",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
    ],
    isAvailable: true,
    guest: 4,
    price: 340,
    nearArea: ["Sky Tower", "Viaduct Harbour", "Waiheke Ferry"],
    rating: 4.6,
    facilities: ["Free WiFi", "Pool", "Spa", "Breakfast"],
  },
  {
    title: "Imperial Garden Hotel Beijing",
    hotelLocation: "Beijing, China",
    description:
      "A central Beijing stay with business facilities, curated local cuisine, and city landmark access.",
    images: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 330,
    nearArea: ["Forbidden City", "Wangfujing", "Temple of Heaven"],
    rating: 4.6,
    facilities: ["Free WiFi", "Business Center", "Gym", "Restaurant"],
  },
  {
    title: "Sakura Bay Hotel Osaka",
    hotelLocation: "Osaka, Japan",
    description:
      "Contemporary bayside hotel in Osaka with fast transit links, family suites, and skyline views.",
    images: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 390,
    nearArea: ["Osaka Castle", "Dotonbori", "Umeda Sky Building"],
    rating: 4.8,
    facilities: ["Free WiFi", "Spa", "Airport Shuttle", "Concierge"],
  },
  {
    title: "Gold Coast Skyline Hotel",
    hotelLocation: "Gold Coast, Queensland, Australia",
    description:
      "Beachfront high-rise stay on the Gold Coast with surfing access and ocean-facing suites.",
    images: [
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800",
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21034?w=800",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 360,
    nearArea: ["Surfers Paradise", "Burleigh Heads", "SkyPoint"],
    rating: 4.5,
    facilities: ["Free WiFi", "Pool", "Gym", "Beach Access"],
  },
];

const categoryByHotel = {
  "The Grand Taj Palace Mumbai": "Luxury Hotels",
  "Oberoi Udaipur Palace": "Business Hotels",
  "The Leela Beach Resort Goa": "Boutique Hotels",
  "ITC Maurya New Delhi": "Resort Hotels",
  "Wildflower Hall Shimla Resort": "Budget Hotels",
  "Taj View Hotel Agra": "Luxury Hotels",
  "Kumarakom Lake Resort Kerala": "Business Hotels",
  "The Park Boutique Hotel Bangalore": "Boutique Hotels",
  "Rambagh Palace Hotel Jaipur": "Resort Hotels",
  "Budget Inn Heritage Kolkata": "Budget Hotels",
  "Harbor View Suites Sydney": "Luxury Hotels",
  "Shinjuku Skyline Hotel": "Business Hotels",
  "Aegean Breeze Boutique Santorini": "Boutique Hotels",
  "Andes Mist Lodge": "Resort Hotels",
  "Cape Coast Budget Stay": "Budget Hotels",
  "Old Town Harbor Inn Dubrovnik": "Boutique Hotels",
  "Blue Coast Retreat Auckland": "Resort Hotels",
  "Imperial Garden Hotel Beijing": "Business Hotels",
  "Sakura Bay Hotel Osaka": "Luxury Hotels",
  "Gold Coast Skyline Hotel": "Boutique Hotels",
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const categoryDocs = {};
    for (const category of categories) {
      const doc = await Category.findOneAndUpdate(
        { name: category.name },
        { $set: { slug: category.slug } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      categoryDocs[category.name] = doc;
    }

    let createdOrUpdated = 0;
    for (const hotel of sampleHotels) {
      const categoryName = categoryByHotel[hotel.title];
      const categoryDoc = categoryDocs[categoryName];

      await Post.findOneAndUpdate(
        { title: hotel.title },
        {
          $set: {
            ...hotel,
            category: categoryDoc._id,
            slug: slugify(hotel.title, { lower: true, strict: true }),
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      createdOrUpdated += 1;
    }

    console.log(`Synced ${Object.keys(categoryDocs).length} categories`);
    console.log(`Synced ${createdOrUpdated} hotels`);

    const categoryCount = await Category.countDocuments({});
    const hotelCount = await Post.countDocuments({});
    console.log(`Total categories: ${categoryCount}`);
    console.log(`Total hotels: ${hotelCount}`);

    process.exit(0);
  } catch (error) {
    console.error("Error syncing personal DB:", error);
    process.exit(1);
  }
};

run();