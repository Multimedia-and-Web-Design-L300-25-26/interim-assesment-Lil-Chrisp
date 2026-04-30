# Coinbase Clone - Full-Stack Cryptocurrency Platform

A full-stack cryptocurrency platform built with Node.js, Express, MongoDB, and a React-like frontend that integrates with a RESTful API backend.

## 🚀 Features

- **User Authentication** - Register, Login, Logout with JWT tokens
- **Protected Profile Page** - View user dashboard (requires authentication)
- **Crypto Data Display** - View all cryptocurrencies with live prices
- **Top Gainers** - View cryptocurrencies with highest 24h price increase
- **New Listings** - View most recently added cryptocurrencies
- **Add New Crypto** - Create new cryptocurrency entries (admin feature)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Deployment:** Render (backend), Netlify (frontend)

## 📁 Project Structure

```
├── controllers/          # Request handlers
│   ├── authController.js # Auth logic (register, login, logout, profile)
│   └── cryptoController.js
├── middleware/           # Express middleware
│   └── auth.js          # JWT authentication middleware
├── models/               # Mongoose schemas
│   ├── User.js          # User model (name, email, password)
│   └── Crypto.js       # Crypto model (name, symbol, price, image, change24h)
├── public/               # Frontend static files
│   ├── index.html      # Home page
│   ├── login.html    # Login page
│   ├── register.html # Registration page
│   ├── profile.html  # User profile (protected)
│   ├── add-crypto.html
│   ├── crypto/       # Crypto pages
│   ├── css/         # Stylesheets
│   └── js/          # JavaScript files
├── routes/              # Express routes
│   ├── authRoutes.js  # /register, /login, /logout, /profile
│   └── cryptoRoutes.js # /crypto, /crypto/gainers, /crypto/new
├── server.js           # Express server entry point
├── seed.js           # Database seeding
├── package.json     # Dependencies
├── Procfile         # Render deployment
├── render.yaml     # Render config
└── netlify.toml   # Netlify config
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
NODE_ENV=production
```

## 📦 Installation

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server runs on `http://localhost:5000`.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login user |
| GET | `/logout` | Logout user |
| GET | `/profile` | Get user profile (protected) |

### Cryptocurrencies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/crypto` | Get all cryptocurrencies |
| GET | `/crypto/gainers` | Get top gainers (sorted by 24h change) |
| GET | `/crypto/new` | Get new listings (sorted by date) |
| POST | `/crypto` | Add new cryptocurrency |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health status |

## 🔐 API Request/Response Examples

### Register User
```bash
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1...",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
```bash
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1...",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get All Crypto
```bash
GET /crypto

Response (200):
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 67540.23,
      "image": "https://...",
      "change24h": 2.45,
      "createdAt": "..."
    },
    ...
  ]
}
```

### Add Crypto (Protected)
```bash
POST /crypto
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Dogecoin",
  "symbol": "DOGE",
  "price": 0.15,
  "image": "https://...",
  "change24h": 5.2
}

Response (201):
{
  "success": true,
  "message": "Cryptocurrency added successfully",
  "data": {
    "_id": "...",
    "name": "Dogecoin",
    "symbol": "DOGE",
    "price": 0.15,
    "image": "https://...",
    "change24h": 5.2,
    "createdAt": "..."
  }
}
```

## 🚢 Deployment

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com/)
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure secret key
4. Deploy command: `npm start`
5. Build command: `npm install`

### Frontend (Netlify)

1. Create a new site on [Netlify](https://netlify.com/)
2. Drag and drop the `public/` folder, or connect to GitHub
3. Update `public/js/config.js` with your Render backend URL

## 📄 License

ISC
