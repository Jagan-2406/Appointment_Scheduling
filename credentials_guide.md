# Getting and Replacing Credentials

To take full ownership of this project, you need to set up your own free accounts for the various services the app uses and replace your friend's keys with yours. Here is a step-by-step guide on how to get every credential.

---

## 1. MongoDB (Database)
Your app needs a database to store users, appointments, and profiles. MongoDB Atlas provides a generous free tier.

**Where to go:** [mongodb.com/atlas](https://www.mongodb.com/atlas/database)

**How to get it:**
1. Sign up for a free account.
2. Click **Create a Cluster**. Choose the **FREE (M0)** cluster and select your preferred cloud provider and region (leave defaults if unsure). Click **Create**.
3. Under **Security > Database Access**, click **Add New Database User**.
   - Create a username (e.g., `admin`) and a secure password. **Save this password somewhere.**
   - Click **Add User**.
4. Under **Security > Network Access**, click **Add IP Address**.
   - Select **Allow Access From Anywhere** (`0.0.0.0/0`) and confirm. *(This is necessary for Render to connect to your DB).*
5. Go to **Database > Clusters** and click **Connect** on your cluster.
6. Choose **Drivers** (Node.js).
7. Copy the **connection string** provided. It will look like this:
   `mongodb+srv://<username>:<password>@cluster0...`

**Where to replace:**
- File: [backend/.env](file:///c:/Studies/My%20Projects/Appointment/Appointment/backend/.env)
- Key: `MONGODB_URI`
- *Make sure to replace `<username>` and `<password>` in the string with the ones you created in step 3 (remove the `<` and `>`).*

---

## 2. Google OAuth (Sign-in)
This allows users to log into your app using their Google accounts.

**Where to go:** [console.cloud.google.com](https://console.cloud.google.com/)

**How to get it:**
1. Sign in with your Google account and click **Create Project** at the top right. Name it (e.g., `Appointment App`).
2. Search for **APIs & Services** and go to the **OAuth consent screen** tab on the left.
   - Choose **External** and hit Create.
   - Fill in required fields (App name, support email, developer contact email). Click Save and Continue until done.
   - *Note: Add your own email as a "Test User" so you can log in while the app is in testing mode.*
3. Go to the **Credentials** tab on the left.
4. Click **+ CREATE CREDENTIALS** at the top and select **OAuth client ID**.
5. Application type: **Web application**. Name it something like `Web Client`.
6. **Authorized JavaScript origins**: Add `http://localhost:3000` (for local testing).
7. **Authorized redirect URIs**: Add `http://localhost:5000/api/auth/google/callback` (for local testing).
8. Click **Create**. You will be given a **Client ID** and a **Client Secret**.

**Where to replace:**
- File: [backend/.env](file:///c:/Studies/My%20Projects/Appointment/Appointment/backend/.env)
  - Key: `GOOGLE_CLIENT_ID` (Paste Client ID)
  - Key: `GOOGLE_CLIENT_SECRET` (Paste Client Secret)
- File: [frontend/.env](file:///c:/Studies/My%20Projects/Appointment/Appointment/frontend/.env)
  - Key: `VITE_GOOGLE_CLIENT_ID` (Paste Client ID)

---

## 3. Gmail App Password (Email Notifications)
Your backend uses Gmail to send verification emails and appointment updates. You cannot use your normal Google password; you need an "App Password".

**Where to go:** [myaccount.google.com/security](https://myaccount.google.com/security)

**How to get it:**
1. Make sure **2-Step Verification (2FA)** is turned ON for your Google account.
2. Go to the search bar at the top of your Google Account settings and search for **App passwords**.
3. Create a new App Password (name it "Appointment App").
4. Google will give you a 16-character password (e.g., `abcd efgh ijkl mnop`). Copy this.

**Where to replace:**
- File: [backend/.env](file:///c:/Studies/My%20Projects/Appointment/Appointment/backend/.env)
  - Key: `EMAIL_USER` (Your Gmail address)
  - Key: `EMAIL_PASS` (The 16-character password without spaces)
  - Key: `EMAIL_FROM` (Your name/app name and your Gmail address)

---

## 4. Hugging Face (AI Features)
This powers the AI chatbot functionality in the app.

**Where to go:** [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

**How to get it:**
1. Create a free Hugging Face account and verify your email.
2. Go to Settings > Access Tokens.
3. Click **New token**. Name it (e.g., `ai-chatbot`), select **Read** role, and generate it.
4. Copy the token (it starts with `hf_`).

**Where to replace:**
- File: [backend/.env](file:///c:/Studies/My%20Projects/Appointment/Appointment/backend/.env)
- Key: `HUGGINGFACE_API_KEY`

---

## 5. JWT Secret (Security Token)
This is used to encrypt user login sessions. It doesn't require an external service, just a random string of characters.

**How to get it:**
1. Just create a long, random string of numbers and letters, or use an online generator.
   - Example: `super_secret_appointment_key_2026_xyz123!`

**Where to replace:**
- File: [backend/.env](file:///c:/Studies/My%20Projects/Appointment/Appointment/backend/.env)
- Key: `JWT_SECRET`

---

> [!TIP]
> After replacing all these credentials locally and verifying the app works, remember to add these exact same credentials to the **Environment Variables** section in Render (for the backend) and Vercel (for the frontend) when you host the app!
