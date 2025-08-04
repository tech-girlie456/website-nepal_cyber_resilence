# Nepal Cyber Resilience - Frontend

## Overview
This is the frontend component of the Nepal Cyber Resilience project, built with React and Vite. It provides the user interface for interacting with the secure file storage and sharing platform, offering cybersecurity awareness resources in both English and Nepali.

## Features
- User Registration and Login
- Nepali Cybersecurity Tips
- Password Strength Checker
- Phishing Report Form
- Cybersecurity Quiz
- Local Business Security Checklist
- Threat Alert Subscription
- Resource Library
- Feedback Forum
- Workshop Finder
- Responsive UI

## Tech Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Styling:** Bootstrap, Tailwind (via CDN), Custom CSS

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Running the Development Server
```bash
npm run dev
```
This will start the development server, usually at `http://localhost:5173`.

### Frontend Environment Variables (`.env`)
- `VITE_BACKEND_URL=http://localhost:5000` (or your backend URL)
- `VITE_GOOGLE_CLIENT_ID=...` (Your Google OAuth Client ID)

## Deployment
This frontend can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Contribution
1. Fork the repo and create your branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

## License
MIT License. See [LICENSE](LICENSE) for details.