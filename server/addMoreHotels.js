import mongoose from "mongoose";
import dotenv from "dotenv";
import slugify from "slugify";
import Category from "./src/models/Category.js";
import Post from "./src/models/Post.js";

dotenv.config();

const hotelsToAdd = [
  {
    title: "The Grand Taj Palace Mumbai",
    hotelLocation: "Mumbai, Maharashtra, India",
    description:
      "Experience refined luxury in Mumbai with sea views, signature dining, and elegant heritage interiors.",
    categoryName: "Luxury Hotels",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    ],
    isAvailable: true,
    guest: 4,
    price: 450,
    nearArea: ["Gateway of India", "Marine Drive", "Colaba Causeway"],
    facilities: ["Free WiFi", "Swimming Pool", "Spa", "Gym", "Restaurant"],
  },
  {
    title: "Oberoi Udaipur Palace",
    hotelLocation: "Udaipur, Rajasthan, India",
    description:
      "A lakeside palace-style stay with royal hospitality, curated dining, and serene views of Lake Pichola.",
    categoryName: "Business Hotels",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 380,
    nearArea: ["City Palace", "Lake Pichola", "Jagdish Temple"],
    facilities: ["Free WiFi", "Conference Room", "Airport Shuttle", "Restaurant"],
  },
  {
    title: "Harbor View Suites Sydney",
    hotelLocation: "Sydney, New South Wales, Australia",
    description:
      "Modern waterfront suites near the Opera House with panoramic harbor views and premium amenities.",
    categoryName: "Luxury Hotels",
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21034?w=800",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 520,
    nearArea: ["Sydney Opera House", "Circular Quay", "The Rocks"],
    facilities: ["Free WiFi", "Infinity Pool", "Gym", "Rooftop Bar"],
  },
  {
    title: "Shinjuku Skyline Hotel",
    hotelLocation: "Tokyo, Japan",
    description:
      "A sleek business-focused hotel in central Tokyo with direct rail access and productivity-friendly spaces.",
    categoryName: "Business Hotels",
    images: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=800",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 310,
    nearArea: ["Shinjuku Gyoen", "Tokyo Metropolitan Building", "Kabukicho"],
    facilities: ["Free WiFi", "Meeting Rooms", "Laundry", "24h Front Desk"],
  },
  {
    title: "Aegean Breeze Boutique Santorini",
    hotelLocation: "Santorini, Greece",
    description:
      "Cliffside boutique rooms with sunset terraces, Cycladic design, and views over the caldera.",
    categoryName: "Boutique Hotels",
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 410,
    nearArea: ["Oia", "Fira", "Red Beach"],
    facilities: ["Free WiFi", "Private Terrace", "Breakfast Included", "Spa"],
  },
  {
    title: "Andes Mist Lodge",
    hotelLocation: "Cusco, Peru",
    description:
      "A mountain retreat blending local charm with comfort, ideal for travelers heading to Machu Picchu.",
    categoryName: "Resort Hotels",
    images: [
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
    ],
    isAvailable: true,
    guest: 4,
    price: 295,
    nearArea: ["Plaza de Armas", "Sacsayhuaman", "Sacred Valley"],
    facilities: ["Free WiFi", "Guided Tours", "Restaurant", "Fireplace Lounge"],
  },
  {
    title: "Cape Coast Budget Stay",
    hotelLocation: "Cape Town, South Africa",
    description:
      "A comfortable and affordable stay with easy access to beaches, cafes, and city attractions.",
    categoryName: "Budget Hotels",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 170,
    nearArea: ["Table Mountain", "V&A Waterfront", "Camps Bay"],
    facilities: ["Free WiFi", "Breakfast", "Parking", "Airport Transfer"],
  },
  {
    title: "Old Town Harbor Inn Dubrovnik",
    hotelLocation: "Dubrovnik, Croatia",
    description:
      "A cozy coastal inn near the old city walls, perfect for scenic walks and Adriatic experiences.",
    categoryName: "Boutique Hotels",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 265,
    nearArea: ["City Walls", "Stradun", "Lokrum Island"],
    facilities: ["Free WiFi", "Sea View Rooms", "Breakfast", "24h Support"],
  },
  {
    title: "Blue Coast Retreat Auckland",
    hotelLocation: "Auckland, New Zealand",
    description:
      "A waterfront retreat in Auckland with modern rooms, marina views, and easy ferry access.",
    categoryName: "Resort Hotels",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
    ],
    isAvailable: true,
    guest: 4,
    price: 340,
    nearArea: ["Sky Tower", "Viaduct Harbour", "Waiheke Ferry"],
    facilities: ["Free WiFi", "Pool", "Spa", "Breakfast"],
  },
  {
    title: "Imperial Garden Hotel Beijing",
    hotelLocation: "Beijing, China",
    description:
      "A central Beijing stay with business facilities, curated local cuisine, and city landmark access.",
    categoryName: "Business Hotels",
    images: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
    ],
    isAvailable: true,
    guest: 2,
    price: 330,
    nearArea: ["Forbidden City", "Wangfujing", "Temple of Heaven"],
    facilities: ["Free WiFi", "Business Center", "Gym", "Restaurant"],
  },
  {
    title: "Sakura Bay Hotel Osaka",
    hotelLocation: "Osaka, Japan",
    description:
      "Contemporary bayside hotel in Osaka with fast transit links, family suites, and skyline views.",
    categoryName: "Luxury Hotels",
    images: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 390,
    nearArea: ["Osaka Castle", "Dotonbori", "Umeda Sky Building"],
    facilities: ["Free WiFi", "Spa", "Airport Shuttle", "Concierge"],
  },
  {
    title: "Gold Coast Skyline Hotel",
    hotelLocation: "Gold Coast, Queensland, Australia",
    description:
      "Beachfront high-rise stay on the Gold Coast with surfing access and ocean-facing suites.",
    categoryName: "Boutique Hotels",
    images: [
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800",
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21034?w=800",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
    ],
    isAvailable: true,
    guest: 3,
    price: 360,
    nearArea: ["Surfers Paradise", "Burleigh Heads", "SkyPoint"],
    facilities: ["Free WiFi", "Pool", "Gym", "Beach Access"],
  },
];

const addMoreHotels = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const categories = await Category.find({});
    const categoryByName = new Map(categories.map((cat) => [cat.name, cat]));

    const missingCategories = [...new Set(hotelsToAdd.map((h) => h.categoryName))].filter(
      (name) => !categoryByName.has(name)
    );

    if (missingCategories.length > 0) {
      console.error("Missing categories in DB:", missingCategories);
      process.exit(1);
    }

    let created = 0;
    let skipped = 0;

    for (const hotel of hotelsToAdd) {
      const exists = await Post.findOne({ title: hotel.title });
      if (exists) {
        skipped += 1;
        continue;
      }

      const categoryDoc = categoryByName.get(hotel.categoryName);

      await Post.create({
        title: hotel.title,
        hotelLocation: hotel.hotelLocation,
        description: hotel.description,
        category: categoryDoc._id,
        images: hotel.images,
        slug: slugify(hotel.title, { lower: true, strict: true }),
        isAvailable: hotel.isAvailable,
        guest: hotel.guest,
        price: hotel.price,
        nearArea: hotel.nearArea,
        facilities: hotel.facilities,
      });

      created += 1;
    }

    console.log(`Added ${created} hotels`);
    console.log(`Skipped ${skipped} hotels (already existed)`);

    const totalHotels = await Post.countDocuments({});
    console.log(`Total hotels in DB: ${totalHotels}`);

    process.exit(0);
  } catch (error) {
    console.error("Failed to add hotels:", error);
    process.exit(1);
  }
};

addMoreHotels();
