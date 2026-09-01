# SubTrack – Personal Subscription & Expense Tracker (PWA)

SubTrack is a Progressive Web Application designed to track, forecast, and manage recurring personal subscription expenses. Built with React (Vite), Firebase, and Tailwind CSS, it features real-time Firestore synchronization, multi-currency live conversions, offline caching, and responsive device support.

---

## 🌐 Live Deployment & Project Links

- **Live Hosted Application:** [https://subscription-tracker-2e719.web.app/](https://subscription-tracker-2e719.web.app/)
- **GitHub Repository:** [https://github.com/Nimesh-Dilushan/WDResitAssignment2521](https://github.com/Nimesh-Dilushan/WDResitAssignment2521)

---

## 🛠️ Tech Stack & Key Technologies

- **Frontend:** React 18, Vite, Tailwind CSS
- **Icons & UI:** Lucide React
- **Backend-as-a-Service:** Google Firebase (Authentication, Cloud Firestore, Firebase Storage, Firebase Hosting)
- **PWA Capabilities:** `vite-plugin-pwa`, Service Workers (`workbox`), Web App Manifest
- **State Management:** React Context API (`AuthContext`, `SubscriptionContext`)

---

## 💻 Local Setup & Installation Instructions

Follow these steps to clone, configure, and run the project locally on your machine:

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- [Git](https://git-scm.com/)

---

### 2. Clone the Repository
```bash
git clone [https://github.com/Nimesh-Dilushan/WDResitAssignment2521.git](https://github.com/Nimesh-Dilushan/WDResitAssignment2521.git)
cd WDResitAssignment2521

---
3. Install Dependencies
Bash
npm install

4. Configure Environment Variables

Create a .env file in the root directory and add your Firebase credentials:  

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

5. Run the Local Development Server
Bash
npm run dev
Open your browser and navigate to http://localhost:5173 to interact with the application.

6. Build for Production
To create an optimized, minified production build:

Bash
npm run build

7. Deploy to Firebase Hosting
Bash
# Login to Firebase (first-time only)
npx firebase login

# Deploy production hosting
npx firebase deploy --only hosting
✨ Features Implemented
User Authentication: Email/Password registration and login with Firebase Auth session persistence.

Real-Time CRUD: Instant Cloud Firestore document synchronization without manual page refreshes.

Live Currency Conversion: Real-time exchange rate calculation across USD, EUR, GBP, and LKR.

PWA Support: Installable as a standalone desktop/mobile app with custom maskable icons.

Responsive Layout: Dynamic grid reflows across mobile (single-column), tablet (2-column), and desktop (3-column).

Theme Support: Dark and Light mode toggles persisted via localStorage.

📁 Project Directory Structure
Plaintext
├── public/
│   ├── favicon.ico
│   ├── maskable_icon_x192.png
│   └── maskable_icon_x512.png
├── src/
│   ├── components/
│   │   ├── authscreen.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── SubscriptionCard.jsx
│   │   ├── Subscriptionform.jsx
│   │   └── SummaryCards.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── SubscriptionContext.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── firebase.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── firebase.json
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js