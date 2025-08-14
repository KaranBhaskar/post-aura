# Aura

**An all-in-one AI workspace for creators**

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

---

## 🌟 Overview

**Aura** is a comprehensive AI-powered content creation platform built to empower creators with cutting-edge AI tools. From generating viral articles and catchy titles to creating stunning images and processing resumes, Aura brings together multiple AI capabilities in one seamless interface.

## Features

Aura is a full-stack web application that provides:
- **AI Content Generation**: Articles, titles, and images powered by Google Gemini AI
- **Image Processing**: Background removal and object removal using advanced AI
- **Resume Analysis**: AI-powered resume parsing and feedback
- **Community Features**: Share and discover AI-generated content
- **User Management**: Secure authentication with Clerk and tier-based usage plans

---

## 🛠 Tech Stack

### Frontend

```
React 19.2          - UI Framework
Vite                - Build Tool & Dev Server
Tailwind CSS 4      - Styling
React Router 7      - Client-side Routing
Clerk React         - Authentication
Axios               - HTTP Client
React Hot Toast     - Notifications
React Markdown      - Markdown Rendering
Lucide React        - Icons
```

### Backend

```
Node.js 23+         - Runtime
Express 5           - Web Framework
Google Gemini AI    - AI/ML Models
Drizzle ORM         - Type-safe Database ORM
PostgreSQL (Neon)   - Database
Cloudinary          - Image Storage
Clerk Express       - Authentication Middleware
Multer              - File Upload Handling
```

### DevOps & Tools

```
Git                 - Version Control
GitHub              - Code Repository
```

## 🚀 Getting Started

### Prerequisites

- Node.js 23+ and npm 
- PostgreSQL database ([Neon](https://neon.tech) , the one I used)
- Clerk account for authentication
- Google Gemini API key
- Cloudinary account for image storage

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/karanbhaskar/post-aura.git
   cd post-aura
   ```

2. **Install dependencies**

   ```bash
   # Install server(Backend) dependencies
   cd server
   npm install

   # Install client(frontend) dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in both `server/` and `client/` directories:

   ```bash
   # In server/
   cp .env.example .env

   # In client/
   cp .env.example .env
   ```

   Fill in your credentials (see `.env.example` files for details)

4. **Set up the database**

   ```bash
   cd server
   npm run db:push
   npm run db:migrate
   ```

5. **Run the application**

   ```bash
   # Terminal 1 - Start server (from server/)
   npm run server

   # Terminal 2 - Start client (from client/)
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

---

## 📁 Project Structure

```
Aura/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/         # Route pages
│   │   ├── components/    # Reusable components
│   │   ├── assets/        # Static assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── server/                 # Express backend
│   ├── controllers/       # Business logic
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── db/              # Database schema & connection
│   ├── configs/         # Configuration files
│   ├── utils/           # Utility functions
│   ├── server.js        # App setup
│   ├── index.js         # Entry point
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md              # This file
```

### Authentication

All API endpoints (except `/health`) require a Clerk JWT token:

## 👨‍💻 Author

**Karan Bhaskar**

- LinkedIn: [@karanbhaskarr](https://www.linkedin.com/in/karanbhaskarr/)
- GitHub: [@karanbhaskar](https://github.com/karanbhaskar)

---

## 🙏 Acknowledgments

- Google Gemini AI for powerful AI capabilities
- Clerk for seamless authentication
- Neon for managed PostgreSQL
- Cloudinary for image hosting
- The open-source community

---


**Built with ❤️ and ☕ by Karan Bhaskar**

Looking for Summer 2026 SWE Internship - DMs open! 👇

</div>
