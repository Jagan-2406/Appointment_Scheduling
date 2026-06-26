# Hosting Guide for Appointment Scheduling Application

Hosting a full-stack application involves deploying your **Frontend** and **Backend** separately so they can communicate seamlessly. For this project, we'll use popular, free-tier friendly services: **Render** for the Backend and **Vercel** for the Frontend.

> [!IMPORTANT]
> Ensure you have replaced all of your friend's credentials with your own (like MongoDB URI, Google OAuth, and Email) and pushed the latest changes to your GitHub repository before proceeding.

---

## Step 1: Deploy the Backend on Render
Render is a great platform for hosting Node.js applications.

1. Create a free account at [Render.com](https://render.com/).
2. Click on **New +** and select **Web Service**.
3. Choose **Build and deploy from a Git repository** and connect your GitHub account.
4. Select your `Appointment_Scheduling` repository.
5. Configure the Web Service with the following details:
   - **Name:** `appointment-backend` (or anything you prefer)
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js` (or `npm start` if defined in package.json)
6. Scroll down to **Environment Variables** and add all the keys from your `backend/.env` file. 
   - *Note: You do not need to add the `PORT` variable, as Render handles this automatically.*
7. Click **Create Web Service**. 
8. Render will now build and deploy your backend. Once completed, you will get a live URL (e.g., `https://appointment-backend-xxxx.onrender.com`). **Copy this URL.**

---

## Step 2: Update Frontend Configuration
Now that your backend is live, you need to tell your frontend where to find it.

1. Open your code editor and go to [frontend/.env](file:///c:/Studies/My%20Projects/Appointment/Appointment/frontend/.env).
2. Change the `VITE_API_BASE_URL` to point to your new Render backend URL.
   ```env
   VITE_API_BASE_URL=https://appointment-backend-xxxx.onrender.com/api
   ```
3. Commit this change and push it to GitHub:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

---

## Step 3: Deploy the Frontend on Vercel
Vercel is optimized for Vite and React applications.

1. Create a free account at [Vercel.com](https://vercel.com/).
2. Click **Add New...** -> **Project**.
3. Import your `Appointment_Scheduling` GitHub repository.
4. In the configuration screen, adjust the following:
   - **Project Name:** `appointment-frontend`
   - **Root Directory:** Click Edit and select `frontend`.
   - **Framework Preset:** Vercel should auto-detect **Vite**.
   - **Build and Output Settings:** Leave as default (`npm run build` and `dist`).
5. Open the **Environment Variables** section and add the variables from your `frontend/.env` file:
   - `VITE_API_BASE_URL`: `https://appointment-backend-xxxx.onrender.com/api`
   - `VITE_GOOGLE_CLIENT_ID`: Your Google Client ID
   - `VITE_ENVIRONMENT`: `production`
6. Click **Deploy**. Vercel will build and host your frontend. Once done, **copy your live Vercel URL**.

---

## Step 4: Update Google OAuth and Backend CORS
Since your application is now hosted on new domains, you must authorize them.

### 1. Update Google Cloud Console
1. Go to your [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services > Credentials** and edit your OAuth 2.0 Client ID.
3. Under **Authorized JavaScript origins**, add your live Vercel frontend URL (e.g., `https://appointment-frontend.vercel.app`).
4. Under **Authorized redirect URIs**, add your live backend URL (e.g., `https://appointment-backend-xxxx.onrender.com/api/auth/google/callback` - adjust based on your specific route).
5. Save the changes.

### 2. Update Backend CORS on Render
1. Go back to your [Render Dashboard](https://dashboard.render.com/).
2. Open your backend web service and go to the **Environment** tab.
3. Update (or add) the `FRONTEND_ORIGIN` environment variable to match your new Vercel URL:
   - `FRONTEND_ORIGIN` = `https://appointment-frontend.vercel.app`
4. Save the changes. Render will automatically restart your backend.

---

> [!TIP]
> **Database Security:** Ensure your MongoDB Atlas Network Access is set up securely. During development, it might be set to `0.0.0.0/0` (allow all). In production, you might want to restrict this, though Render IPs can be dynamic.

Your application is now fully hosted and live! Test the authentication and basic features to ensure the frontend and backend are communicating successfully.
