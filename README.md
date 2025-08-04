# Nepal Cyber Resilience

## Overview
**Nepal Cyber Resilience** is a comprehensive, bilingual (English and Nepali) web platform dedicated to enhancing the digital safety of Nepali internet users. The project's mission is to create a resilient digital shield by educating users about prevalent cyber threats and equipping them with practical tools to defend against attacks.

The platform combines a rich set of educational resources with secure, user-centric utilities. It features a modern frontend built with React and Vite, and a robust backend powered by Node.js, Express, and Sequelize, ensuring a secure, scalable, and user-friendly experience. From interactive quizzes and phishing report forms to encrypted file storage, Nepal Cyber Resilience serves as a one-stop-shop for cybersecurity awareness and protection.

---

## Features
- **End-to-End Encryption:** Files are encrypted before storage; only users can decrypt their data.
- **Google OAuth & Email Authentication:** Secure login with Google or email/password.
- **File Upload & Management:** Upload, download, preview, and delete files (up to 50MB each).
- **User Dashboard:** Manage files, view storage usage, and update profile.
- **Profile Management:** Update user info and profile picture.
- **Password Reset:** Secure password reset via email.
- **Rate Limiting:** Protects against brute-force and abuse.
- **Responsive UI:** Modern, mobile-friendly interface with Bootstrap and custom styles.

---

## 3. Technology Stack

The **Nepal Cyber Resilience** platform is built using a modern and cohesive technology stack designed for scalability, performance, and security.

#### **Core Technologies**

*   **Frontend (React):** The user interface is a responsive single-page application built with **React** and **Vite**. React was chosen for its component-based architecture, which enables a modular and reusable UI, leading to an efficient and maintainable development experience.
*   **Backend (Node.js & Express):** The backend is powered by **Node.js** and the **Express.js** framework. Node.js was selected for its non-blocking, event-driven I/O model, making it highly efficient for handling concurrent requests and building a fast API.
*   **Database (Sequelize):** **Sequelize** is used as the ORM, providing a robust and reliable solution for managing structured data such as user accounts, roles, and file metadata. It offers flexibility by supporting PostgreSQL, MySQL, and SQLite.

#### **Key Libraries and Security Tools**

*   **Authentication:** For secure authentication, the platform uses **Passport.js** for Google OAuth and local email/password strategies. The **bcrypt** library is implemented for secure password hashing to prevent plaintext storage, while **JSON Web Tokens (JWT)** are used to manage secure, stateless user sessions.
*   **File Handling & Encryption:** **Multer** is used for handling file uploads. All user files are encrypted on the client-side using **AES-256-CBC** before being sent to the server, ensuring end-to-end security.
*   **API Security:** The backend is further secured using **Helmet** to set protective HTTP headers, **CORS** to manage cross-origin requests, and custom **rate-limiting** to prevent abuse.

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

## Database Schema and Table Design

The database schema, managed via Sequelize ORM for compatibility with PostgreSQL, MySQL, and SQLite, is designed for efficiency, data integrity, and scalability. The design is highly normalized to eliminate redundancy and maintain consistency across the system. It is organized around a set of core tables (`users`, `files`) and includes several specialized tables to support advanced functionality and robust audit trails.

### Core Tables

#### `users` Table
Securely stores user authentication details and profile information.

-   `id`: (Primary Key) Unique identifier for each user.
-   `email`: (Unique) User's email address for local authentication.
-   `password`: Hashed password for local authentication.
-   `googleId`: (Unique) ID from Google for OAuth users.
-   `profilePicture`: URL to the user's profile picture.
-   `createdAt`, `updatedAt`: Timestamps for record management.

#### `files` Table
Serves as the primary record for each uploaded file, linking it to the owner and storing essential metadata.

-   `id`: (Primary Key) Unique identifier for each file.
-   `userId`: (Foreign Key) References the `users` table to establish ownership.
-   `originalName`: The original filename as uploaded by the user.
-   `storedName`: The unique name used for storing the file on the server.
-   `fileType`: The MIME type of the file (e.g., `image/jpeg`).
-   `fileSize`: The size of the file in bytes.
-   `iv`: The hex-encoded Initialization Vector (IV) used for AES-256-CBC encryption, ensuring that each file's encryption is unique.
-   `createdAt`, `updatedAt`: Timestamps for record management.

### Extended Schema Design

To support enhanced functionality, the following tables are part of the conceptual design:

-   **`file_versions`**: Enables version control, allowing users to track and revert to previous versions of their files.
-   **`activity_logs`**: Provides a granular audit trail by recording every significant user action within the platform.
-   **`file_accesses`**: Monitors every file interaction (view, download), logging details like IP address and timestamp for security and analytics.
-   **`file_shares`**: Manages secure file sharing through unique, time-limited, and revocable tokens.

This comprehensive schema ensures that all data is structured logically, linked by foreign keys, and ready for secure and scalable operations.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL/MySQL/SQLite (for production; SQLite works for dev)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/DropSafe.git
cd DropSafe
```

### 2. Setup the Backend
```bash
cd my-backend
npm install
# Copy and edit environment variables
cp .env.example .env
# Edit .env with your DB, JWT, and ENCRYPTION_KEY
# Run migrations (if using Sequelize CLI)
# npx sequelize-cli db:migrate
npm start
```

#### Backend Environment Variables (`my-backend/.env`)
- `PORT=5000`
- `DATABASE_URL=...` (or DB config variables)
- `JWT_SECRET=your_jwt_secret`
- `ENCRYPTION_KEY=your_64_char_hex_key` (use `openssl rand -hex 32`)
- `GOOGLE_CLIENT_ID=...`
- `GOOGLE_CLIENT_SECRET=...`
- `EMAIL_USER=...` (for password reset)
- `EMAIL_PASS=...`

### 3. Setup the Frontend
```bash
cd ../dropsafe-frontend
npm install
npm run dev
```

#### Frontend Environment Variables (`dropsafe-frontend/.env`)
- `VITE_BACKEND_URL=http://localhost:5000`
- `VITE_GOOGLE_CLIENT_ID=...`

---

## Usage
- Visit `http://localhost:5173` (or as shown in terminal)
- Register or login (Google or email)
- Upload, preview, download, and delete files from the dashboard
- Update your profile and password

---

## API Overview (Backend)
- `POST   /api/auth/register` — Register new user
- `POST   /api/auth/login` — Login with email/password
- `POST   /api/auth/google-auth` — Login with Google
- `POST   /api/auth/request-password-reset` — Request password reset
- `POST   /api/auth/reset-password` — Reset password
- `GET    /api/files` — List user files
- `POST   /api/files/upload` — Upload file (multipart/form-data)
- `GET    /api/files/view/:id` — View/decrypt file (inline or download)
- `DELETE /api/files/:id` — Delete file
- `GET    /api/user/profile` — Get user profile
- `PUT    /api/user/profile` — Update profile
- `POST   /api/user/profile-picture` — Upload profile picture

> All file and user routes require authentication (JWT in `Authorization: Bearer ...` header).

---

## Security Notes
- **Encryption:** Files are encrypted with AES-256-CBC using a per-file IV and a server-side key. Only authenticated users can access their files.
- **Authentication:** JWT tokens for session management; Google OAuth supported.
- **Rate Limiting:** Prevents brute-force and abuse.
- **Input Validation:** All user input is validated and sanitized.

---

## Deployment
- Frontend can be deployed to Vercel, Netlify, or any static host.
- Backend can be deployed to any Node.js server (Heroku, Render, etc.).
- Set environment variables for production in both frontend and backend.

---

## Contribution
1. Fork the repo and create your branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

---

## License
MIT License. See [LICENSE](LICENSE) for details.
