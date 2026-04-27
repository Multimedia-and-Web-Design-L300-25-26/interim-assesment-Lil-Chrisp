# Deployment Guide - Step by Step

## Step 1: Create MongoDB Atlas Database (Cloud MongoDB)

1. Go to https://www.mongodb.com/products/platform/atlas-database
2. Sign up for a free account
3. Create a new cluster (free tier is fine)
4. In Database Access, create a new database user with password
5. In Network Access, add IP address `0.0.0.0/0` (allows access from anywhere - needed for Render)
6. Go to Clusters → Click "Connect" → Choose "Drivers" → Copy the connection string
7. Replace `<password>` with your database user password

**Example MongoDB Atlas URI:**
```
mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/coinbase_clone?retryWrites=true&w=majority
```

Keep this URI safe - you'll need it for Render.

---

## Step 2: Deploy Backend to Render

1. Go to https://render.com and sign up (free account)
2. Click "New +" → Select "Web Service"
3. Connect your GitHub account and select this repository
4. Configure the service:
   - **Name**: `coinbase-clone-api` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Click "Advanced" and add Environment Variables:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Any long random string (e.g., `your-super-secret-jwt-key-12345`)
   - `NODE_ENV` = `production`
6. Click "Create Web Service"

Wait for deployment to finish. Copy the deployed URL (e.g., `https://coinbase-clone-api.onrender.com`).

---

## Step 3: Test Your Deployed API

Open these URLs in your browser to verify they work:
- `https://your-app-url.onrender.com/crypto` - Should show crypto JSON data
- `https://your-app-url.onrender.com/` - Should show the homepage

---

## Step 4: Update Frontend API URL (if needed)

If you deploy frontend separately from backend, update `public/js/app.js`:
Change all API calls from relative paths (e.g., `/register`) to your full deployed URL (e.g., `https://coinbase-clone-api.onrender.com/register`).

**However**, since our frontend is served from the same Express server (`public/` folder), both frontend and backend are already deployed together on Render. No changes needed!

---

## Step 5: Verify Everything Works

Test these features on your deployed URL:
1. ✅ Homepage loads with crypto data
2. ✅ Can register a new account
3. ✅ Can login
4. ✅ Profile page shows user data (and redirects if not logged in)
5. ✅ Top Gainers page works
6. ✅ New Listings page works
7. ✅ Can add new cryptocurrency

---

## Step 6: Submit Links

Submit these links via the Google Form:
1. **Deployed Backend URL**: `https://your-app-url.onrender.com`
2. **Deployed Frontend URL**: `https://your-app-url.onrender.com` (same as backend since frontend is served from Express)
3. **GitHub Repository URL**: Your repo URL

---

## Troubleshooting

**MongoDB Connection Error on Render:**
- Make sure your MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Double-check your MongoDB URI has the correct password
- Ensure the database user has read/write permissions

**CORS Errors:**
- The CORS config in server.js should work with `origin: true, credentials: true`

**JWT Token Not Working:**
- Make sure `JWT_SECRET` environment variable is set in Render dashboard

**Static Files Not Loading:**
- API routes are already before static middleware in server.js (this is correct)
- Check that `public/` folder files are committed to GitHub

