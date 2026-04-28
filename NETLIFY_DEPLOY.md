# Netlify Frontend Deployment Guide (No GitHub Required)

This guide walks you through deploying the frontend to Netlify **without needing GitHub**, since your GitHub account is flagged.

Your frontend will be deployed at: `lil-chrisp-crypto-app.netlify.app`

---

## Prerequisites

- Netlify account (free) → sign up at [netlify.com](https://www.netlify.com/)
- Your **backend deployed on Render** with a live URL
- This project folder on your computer

---

## Step 1: Update the Backend URL

Before deploying, edit `public/js/config.js` and replace the placeholder with your actual Render backend URL:

```javascript
window.BACKEND_URL = 'https://your-render-backend-url.onrender.com';
```

**Example:**
```javascript
window.BACKEND_URL = 'https://coinbase-clone-api.onrender.com';
```

> **Important:** Make sure this matches your actual deployed Render backend URL.

---

## Step 2: Re-deploy Your Backend (Important!)

The backend CORS settings were updated to only allow requests from:
- `https://lil-chrisp-crypto-app.netlify.app`
- `http://localhost:5000` (local dev)
- `http://localhost:3000` (local dev)

Push your code to GitHub and trigger a new deploy on Render so these CORS changes take effect.

---

## Step 3: Deploy Frontend to Netlify (Choose One Method)

Since your GitHub is flagged, use **either Method A or B below** — both work without GitHub.

---

### ✅ Method A: Drag-and-Drop Deploy (Easiest — Recommended)

No terminal or CLI needed. Just your browser.

1. **Make sure `public/js/config.js` has your real Render backend URL**

2. **Create a ZIP file of the CONTENTS of the `public/` folder (NOT the folder itself):**
   - **On Windows:**
     1. Open the `public` folder
     2. Select **ALL** files and folders inside (`index.html`, `css/`, `js/`, `crypto/`, etc.)
     3. Right-click the selection → **Send to → Compressed (zipped) folder**
     4. Name it `frontend.zip`
   - **On Mac:**
     1. Open the `public` folder
     2. Select **ALL** files and folders inside
     3. Right-click the selection → **Compress X items**
     4. Rename to `frontend.zip`

   ⚠️ **IMPORTANT:** Do NOT zip the `public` folder itself. If `frontend.zip` contains a `public/` subfolder, Netlify will serve your site at `https://yoursite.netlify.app/public/` instead of the root, and you will get **"Page Not Found"**.

3. **Go to [Netlify Dashboard](https://app.netlify.com/)** and log in

4. **Drag and drop** your `frontend.zip` file onto the Netlify dashboard

5. Netlify will instantly deploy it and give you a random URL like `https://random-name-123.netlify.app`

6. **Set your custom site name:**
   - Go to **Site settings → Domain management**
   - Under **Custom domains**, click **Options → Edit site name**
   - Set it to: `lil-chrisp-crypto-app`
   - Your site will now be at: `https://lil-chrisp-crypto-app.netlify.app`

✅ **Done!** Your frontend is live.

---

### 💻 Method B: Netlify CLI Deploy (From Terminal)

If you prefer using the command line, you can deploy directly from your computer without GitHub.

#### Step B1: Install Netlify CLI

Open your terminal and run:

```bash
npm install -g netlify-cli
```

Or if you don't have admin rights:

```bash
npm install netlify-cli
npx netlify login
```

#### Step B2: Log in to Netlify

```bash
npx netlify login
```

This will open a browser tab to authorize. Click **Authorize** and close the tab.

#### Step B3: Link Your Project

From your project folder (`interim-assesment-Lil-Chrisp`), run:

```bash
npx netlify link
```

Choose **"Create & configure a new site"** when prompted.

#### Step B4: Deploy

Run this command to deploy the `public/` folder:

```bash
npx netlify deploy --prod --dir=public
```

After deploy, you'll see a URL. To set your custom name:

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Find your site
3. Go to **Site settings → Domain management**
4. Click **Options → Edit site name**
5. Set to: `lil-chrisp-crypto-app`

---

## Step 4: Verify Everything Works

Test these pages on your Netlify URL:

| Page | URL | What to Check |
|------|-----|---------------|
| Home | `https://lil-chrisp-crypto-app.netlify.app/` | Crypto list loads |
| Login | `https://lil-chrisp-crypto-app.netlify.app/login.html` | Can log in |
| Register | `https://lil-chrisp-crypto-app.netlify.app/register.html` | Can register |
| Profile | `https://lil-chrisp-crypto-app.netlify.app/profile.html` | Profile loads after login |
| Add Crypto | `https://lil-chrisp-crypto-app.netlify.app/add-crypto.html` | Can add new crypto |
| Top Gainers | `https://lil-chrisp-crypto-app.netlify.app/crypto/gainers.html` | Gainers load |
| New Listings | `https://lil-chrisp-crypto-app.netlify.app/crypto/new.html` | New listings load |

---

## Troubleshooting

### "Network error" or API calls failing
- Check `public/js/config.js` has the correct backend URL
- Open browser DevTools → Network tab → check the request URL
- Ensure your Render backend is awake (free tier sleeps after inactivity)

### CORS errors in console
- Make sure you re-deployed the backend after the CORS update
- Check that the Netlify URL exactly matches `https://lil-chrisp-crypto-app.netlify.app`

### Auth not persisting (logged out on refresh)
- This is expected: cross-origin cookies don't work without `SameSite=None; Secure`
- Your app uses `localStorage` for the JWT token, so auth should still work
- If it doesn't, check that `localStorage` has the `token` item after login

### "Page Not Found" when opening your Netlify URL
This is the most common deployment mistake. It means `index.html` is not at the root of your deployed site.

**Cause 1 — You zipped the `public/` folder instead of its contents:**
- If your ZIP contains a `public/` subfolder, Netlify serves the site at `https://yoursite.netlify.app/public/`
- **Fix:** Open the ZIP and check: `index.html` should be at the top level, not inside a `public/` folder
- **Fix:** Re-create the ZIP by selecting all files *inside* `public/` and zipping them

**Cause 2 — You dragged the entire project root instead of `public/`:**
- If you drop the root project folder, `index.html` is inside `public/` on Netlify
- **Fix:** Drag only the `public/` folder, or use a ZIP of its contents

**Cause 3 — You dragged the `public/` folder and Netlify created a `/public` path:**
- **Fix:** Make sure you drop the folder contents or use the ZIP method above

### Drag-and-drop not working
- Make sure you're dropping the **folder contents** or a **ZIP of the public folder**
- Do NOT drop the entire project root — only the `public/` folder

---

## File Changes Summary

| File | Change |
|------|--------|
| `public/js/config.js` | **Created** — holds backend API URL |
| `public/js/app.js` | **Modified** — uses `window.BACKEND_URL` instead of `window.location.origin` |
| `server.js` | **Modified** — CORS locked to Netlify origin |
| All HTML files | **Modified** — load `config.js` before `app.js` |
| `netlify.toml` (root) | **Created** — tells Netlify to publish `public/` folder for git deploys |
| `public/netlify.toml` | **Created** — Netlify config that travels with drag-and-drop deploys |
| `public/_redirects` | **Created** — redirect rules for clean URLs and SPA fallback |
| `NETLIFY_DEPLOY.md` | **Updated** — GitHub-free deployment instructions with 404 troubleshooting |

---

## Quick Reference

| Task | Command / Action |
|------|----------------|
| Deploy via drag-and-drop | Drop `public/` folder on Netlify dashboard |
| Deploy via CLI | `npx netlify deploy --prod --dir=public` |
| Update backend URL | Edit `public/js/config.js` |
| Check backend health | Visit `https://your-backend.onrender.com/health` |

---

**Questions?** Refer to [Netlify Docs](https://docs.netlify.com/) or check your browser's DevTools (F12 → Console/Network) for errors.
