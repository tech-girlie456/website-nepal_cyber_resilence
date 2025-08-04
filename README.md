---

## Project Structure

### Backend (`backend/`)
The backend follows a standard MVC-like (Model-View-Controller) pattern, organized for clarity and scalability.

```
backend/
├── config/               # Configuration files (database, passport.js)
│   ├── config.json       # Sequelize database credentials
│   └── passport.js       # Passport.js strategies (Google OAuth, JWT)
├── controllers/          # Handles request logic
│   ├── authController.js   # Logic for user registration, login, password reset
│   ├── fileController.js   # Logic for file uploads, downloads, deletion
│   └── userController.js   # Logic for profile management
├── middleware/           # Express middleware
│   ├── auth.js           # JWT authentication and authorization
│   └── rateLimiter.js    # Request rate limiting
├── models/               # Sequelize data models
│   ├── file.js           # File model definition
│   └── user.js           # User model definition
├── routes/               # API route definitions
│   ├── auth.js           # Authentication routes (/api/auth)
│   ├── files.js          # File management routes (/api/files)
│   └── user.js           # User profile routes (/api/user)
├── services/             # Business logic (e.g., email sending)
│   └── emailService.js   # Nodemailer setup and email functions
├── uploads/              # Directory for storing user-uploaded files (in .gitignore)
├── .env                  # Environment variables (DB, JWT secret, etc.)
├── .env.example          # Example environment file
└── server.js             # Main Express server entry point
```

### Frontend (`frontend/`)
The frontend is a modern React application structured for component reusability and state management.

```
frontend/
├── public/               # Static assets (favicon, etc.)
├── src/
│   ├── assets/           # Images, icons, and other static assets
│   ├── components/       # Reusable UI components (Navbar, Button, etc.)
│   │   ├── auth/         # Components for login/register forms
│   │   └── layout/       # Components like Navbar, Footer
│   ├── contexts/         # React Context for global state (e.g., Auth)
│   │   └── AuthContext.js  # Manages user authentication state
│   ├── hooks/            # Custom React hooks
│   │   └── useAuth.js      # Hook for accessing auth context
│   ├── pages/            # Top-level page components for each route
│   │   ├── Dashboard.jsx # User dashboard for file management
│   │   ├── Home.jsx      # Landing page
│   │   ├── Login.jsx     # Login page
│   │   └── ...           # Other pages (Quiz, Phishing Report, etc.)
│   ├── services/         # API interaction layer
│   │   └── api.js        # Axios instance and API call functions
│   ├── utils/            # Utility and helper functions
│   │   └── crypto.js     # Client-side file encryption/decryption logic
│   ├── App.jsx           # Main component with React Router setup
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables (backend URL)
└── index.html            # Main HTML template
```

---


