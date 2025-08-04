# Nepal Cyber Resilience - Backend

## Overview
This is the backend component of the Nepal Cyber Resilience project, built with Node.js and Express. It provides the API services for secure file storage, user authentication, and management, supporting the cybersecurity awareness platform.

## Features
- User Authentication (Email/Password, Google OAuth)
- File Upload and Management (Encryption/Decryption)
- API for user profiles and file operations
- Rate Limiting
- Swagger API Documentation

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Sequelize (supports PostgreSQL/MySQL/SQLite)
- **Authentication:** JWT, Passport.js, Google OAuth
- **File Handling:** Multer
- **Encryption:** AES-256-CBC
- **API Documentation:** Swagger/OpenAPI

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL/MySQL/SQLite (for production; SQLite works for dev)

### Installation
```bash
cd backend
npm install
```

### Environment Variables (`.env`)
Create a `.env` file in the `backend` directory with the following variables:

- `PORT=5000` (or your desired port)
- `DATABASE_URL=...` (e.g., `sqlite::memory:` for development, or your PostgreSQL/MySQL connection string)
- `JWT_SECRET=your_jwt_secret_key` (a strong, random string)
- `ENCRYPTION_KEY=your_64_char_hex_key` (use `openssl rand -hex 32` to generate)
- `IV=your_32_char_hex_iv` (use `openssl rand -hex 16` to generate)
- `GOOGLE_CLIENT_ID=...` (Your Google OAuth Client ID)
- `GOOGLE_CLIENT_SECRET=...` (Your Google OAuth Client Secret)
- `EMAIL_USER=...` (for password reset, e.g., your Gmail address)
- `EMAIL_PASS=...` (for password reset, e.g., your Gmail app password)

### Running the Development Server
```bash
npm start
```
This will start the backend server, usually at `http://localhost:5000`.

## API Documentation
Access the API documentation via Swagger UI at `http://localhost:5000/api-docs` when the server is running.

## Deployment
This backend can be deployed to any Node.js server (e.g., Heroku, Render, AWS EC2).
Ensure all environment variables are properly configured for your production environment.

## Contribution
1. Fork the repo and create your branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

## License
MIT License. See [LICENSE](LICENSE) for details.