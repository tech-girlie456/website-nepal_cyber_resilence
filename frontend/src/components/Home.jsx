import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiUploadCloud, FiShield, FiGlobe, FiClock, FiUsers } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Free Security Check for Your Digital Life</h1>
          <p className="hero-subtitle">
            Scan for malicious files, check for data leaks, and secure your digital assets with Nepal Cyber Resilience.
          </p>
          <p className="hero-description">
            Our platform offers comprehensive security solutions to protect your files and personal information.
            Join us today and take the first step towards a safer digital experience.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn-primary">
              Get Started for Free
            </Link>
            <Link to="/login" className="btn btn-outline">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Start</h2>
          <p>Join thousands of users who trust Nepal Cyber Resilience</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
