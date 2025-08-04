// nepal-cyber-resilience-frontend/src/App.jsx
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import FileUpload from './components/Upload';
import Profile from './components/Profile';
import Quiz from './components/Quiz';
import PasswordChecker from './components/PasswordChecker';
import Footer from './components/Footer';
// Placeholder components for new features
const ThreatAlerts = () => <div className="py-10 text-center"><h2>Threat Alert Subscription (Coming Soon)</h2><p>Part of Nepal Cyber Resilience</p></div>;
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Set a small timeout to prevent flash of loading state
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Show loading state while checking auth
  if (isCheckingAuth || loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the children
  return children;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="main-content">
        <div className="container mx-auto px-4 py-6">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/quiz" element={<Quiz />} />
  <Route path="/password-checker" element={<PasswordChecker />} />
  <Route path="/threat-alerts" element={<ThreatAlerts />} />
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
  <Route
    path="/upload"
    element={
      <PrivateRoute>
        <FileUpload />
      </PrivateRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    }
  />
</Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;