# 🧭 BharatYatra - Travel Agency Website

A modern, fully responsive travel agency website built with **React**, **Vite**, **Tailwind CSS**, and **Firebase**. Explore incredible Indian destinations, book tour packages, and manage your bookings seamlessly.

## 🌟 Live Demo

[View Live Site](https://deepak-travel.netlify.app)

## ✨ Features

### Core Features
- ✅ **5+ Pages** - Home, About, Destinations, Packages, Contact, My Bookings
- ✅ **Full Responsiveness** - Optimized for mobile, tablet, and desktop
- ✅ **Modern UI/UX** - Clean design with smooth animations
- ✅ **Navigation Bar & Footer** - Consistent across all pages
- ✅ **Contact Form** - With validation and Firebase storage

### Advanced Features
- 🔍 **Search & Filter Destinations** - Filter by region (North, South, East, West)
- 📦 **Package Listings** - View all packages with pricing details
- 📸 **Image Slider** - Auto-playing hero slider on homepage
- ⭐ **Testimonials Section** - Real traveler experiences
- 🎯 **Call-to-Action Buttons** - Book Now, Enquire Now
- 📱 **Mobile-Friendly Menu** - Hamburger menu on small screens

### Booking System
- 📅 **Package Details Page** - Complete itinerary, inclusions, exclusions
- 💳 **Booking Modal** - Multi-step booking form with validation
- 📋 **My Bookings Page** - View, track, and cancel bookings
- 🔥 **Firebase Integration** - Real-time data storage (Firestore)

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Styling (no custom CSS) |
| **React Router DOM** | Client-side routing |
| **Firebase Firestore** | Database for bookings & enquiries |
| **Netlify** | Hosting and deployment |

## 📁 Project Structure
```
Travel-Agency/
├── public/
│ └── _redirects # Netlify redirects for SPA
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ ├── HeroSlider.jsx
│ │ └── Testimonials.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── About.jsx
│ │ ├── Destinations.jsx
│ │ ├── DestinationDetail.jsx
│ │ ├── Packages.jsx
│ │ ├── PackageDetail.jsx
│ │ ├── Contact.jsx
│ │ └── MyBookings.jsx
│ ├── data/
│ │ ├── packagesData.json
│ │ ├── destinationsData.json
│ │ ├── sliderData.json
│ │ └── testimonialsData.json
│ ├── lib/
│ │ └── firebase.js # Firebase configuration
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── .env # Environment variables
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```


## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for database)

### Installation

1. **Clone the repository**
```
git clone https://github.com/deepakmaharana278/Travel-Agency-SPCL.git
cd Travel-Agency-SPCL
```
2. **Install dependencies**
```
npm install
```
3. **Set up environment variables**
Create a .env file in the root directory:
```
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```
4. **Start development server**
```
npm run dev
```

### 🔥 Firebase Setup
```
Create a project at Firebase Console

Enable Firestore Database (start in test mode)

Register a web app to get your config credentials

Copy the config to your .env file

Create collections: bookings and enquiries
```

### 👨‍💻 Author
**Deepak Maharana**

- 📧 Email: deepakmaharana3500@gmail.com  
- 💼 LinkedIn: https://www.linkedin.com/in/deepak-maharana-3a7728325  
- 🌐 Portfolio: https://my-portfolio-chi-nine-4vbjyr31n2.vercel.app/  
- 🐙 GitHub: https://github.com/deepakmaharana278