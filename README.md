# 🏨 Hotel Booking System

A full-stack MERN hotel booking application with Stripe payment integration.

## 🚀 Features

- ✅ Browse 10+ luxury Indian hotels
- ✅ Advanced search and category filtering (Luxury, Business, Boutique, Resort, Budget)
- ✅ User authentication (Register/Login with JWT)
- ✅ Hotel booking with date and guest selection
- ✅ Secure payments with Stripe (supports all major cards)
- ✅ Responsive design with Tailwind CSS
- ✅ Image uploads with Cloudinary
- ✅ Order history and booking management

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router DOM v6
- Axios
- React DatePicker
- Stripe Elements
- React Toastify

**Backend:**
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Stripe API
- Cloudinary
- Bcrypt

## 📁 Project Structure

```
new-hotel-booking/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context
│   │   └── routes/        # Route protection
│   └── .env               # Frontend environment variables
│
└── server/                # Backend Node.js API
    ├── src/
    │   ├── controller/    # Route controllers
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   ├── middlewares/   # Auth & other middlewares
    │   └── config/        # Database config
    └── .env              # Backend environment variables
```

## ⚙️ Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/student-sumit04/new-hotel-booking.git
cd new-hotel-booking
```

### 2. Install dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3. Environment Variables

Create `.env` files in both client and server folders:

**client/.env:**
```env
VITE_BASE_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**server/.env:**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Seed the Database
```bash
cd server
node seedDatabase.js
```

### 5. Run the Application

**Backend (Terminal 1):**
```bash
cd server
npm start
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

Visit: http://localhost:5173

## 🧪 Testing Payments

Use Stripe test cards:
- Visa: `4242 4242 4242 4242`
- Mastercard: `5555 5555 5555 4444`
- Expiry: Any future date (e.g., 12/30)
- CVC: Any 3 digits (e.g., 123)

## 📦 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

**Quick Deploy:**
- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: MongoDB Atlas

## 🏨 Sample Hotels

The application comes with 10 pre-seeded Indian hotels:
1. The Grand Taj Palace Mumbai
2. Oberoi Udaipur Palace
3. The Leela Beach Resort Goa
4. ITC Maurya New Delhi
5. Wildflower Hall Shimla Resort
6. Taj View Hotel Agra
7. Kumarakom Lake Resort Kerala
8. The Park Boutique Hotel Bangalore
9. Rambagh Palace Hotel Jaipur
10. Budget Inn Heritage Kolkata

## 🔐 Security

- JWT authentication for secure user sessions
- Password hashing with bcrypt
- Environment variables for sensitive data
- CORS protection
- Input validation and sanitization

## 📝 API Endpoints

### Authentication
- `POST /auth/api/register` - Register new user
- `POST /auth/api/login` - Login user
- `GET /auth/api/user-auth` - Verify user token

### Hotels
- `GET /api/post/get-all-post` - Get all hotels
- `GET /api/post/get-post/:slug` - Get single hotel
- `GET /api/category/get-category` - Get all categories

### Booking
- `POST /api/booking/create-payment-intent` - Create Stripe payment
- `POST /api/booking/create-booking` - Create booking (Protected)
- `PATCH /api/booking/update-availability` - Update hotel availability (Protected)

## 📄 License

MIT

## 👤 Author

**Sumit**
- GitHub: [@student-sumit04](https://github.com/student-sumit04)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!
