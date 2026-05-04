# Coinbase Backend API

Node.js + Express + MongoDB REST API for cryptocurrency platform.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:5000`

## Environment Variables

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | - | Create user |
| POST | `/login` | - | Login user |
| GET | `/profile` | ✅ | Get profile |
| GET | `/crypto` | - | All crypto |
| GET | `/crypto/gainers` | - | Top gainers |
| POST | `/crypto` | - | Add crypto |

## Deploy to Render
1. Push to GitHub
2. Connect Render
3. Set env vars
4. Deploy
