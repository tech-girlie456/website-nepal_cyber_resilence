import React from 'react';
import { FiShield, FiLock, FiUsers, FiGlobe, FiAward, FiAlertTriangle, FiBook, FiBarChart2, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { value: '19,730+', label: 'Cybercrime Cases (2023-24)', icon: <FiAlertTriangle size={24} /> },
    { value: '1,800+', label: 'Online Fraud Cases', icon: <FiLock size={24} /> },
    { value: '2x', label: 'Increase in Cybercrime', icon: <FiBarChart2 size={24} /> },
    { value: 'Bilingual', label: 'Nepali & English Content', icon: <FiBook size={24} /> }
  ];

  const features = [
    {
      icon: <FiShield size={32} className="text-primary" />,
      title: "Cybersecurity Awareness",
      description: "Educational content on phishing, malware, and online safety in both Nepali and English."
    },
    {
      icon: <FiLock size={32} className="text-primary" />,
      title: "Password Security",
      description: "Test and improve your password strength with our interactive checker."
    },
    {
      icon: <FiUsers size={32} className="text-primary" />,
      title: "Community Reporting",
      description: "Report suspicious activities and help protect others in the community."
    },
    {
      icon: <FiGlobe size={32} className="text-primary" />,
      title: "Localized Content",
      description: "Relevant cybersecurity information tailored for Nepali users and businesses."
    }
  ];

  const resources = [
    { name: 'Phishing Guide', description: 'Identify and avoid phishing attempts' },
    { name: 'Password Security', description: 'Create strong, memorable passwords' },
    { name: 'Mobile Safety', description: 'Secure your mobile banking' },
    { name: 'Social Media', description: 'Protect your online identity' },
    { name: 'Business Security', description: 'Checklist for small businesses' }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Cybersecurity Expert',
      role: 'Security Specialist',
      bio: '10+ years in cybersecurity and threat analysis',
      expertise: 'Threat Intelligence',
      photo: 'https://randomuser.me/api/portraits/lego/1.jpg'
    },
    {
      id: 2,
      name: 'Ethical Hacker',
      role: 'Penetration Tester',
      bio: 'Specializes in identifying vulnerabilities',
      expertise: 'Security Assessment',
      photo: 'https://randomuser.me/api/portraits/lego/2.jpg'
    },
    {
      id: 3,
      name: 'Security Analyst',
      role: 'Incident Responder',
      bio: 'Expert in handling security breaches',
      expertise: 'Incident Response',
      photo: 'https://randomuser.me/api/portraits/lego/3.jpg'
    },
    {
      id: 4,
      name: 'Security Educator',
      role: 'Training Specialist',
      bio: 'Passionate about cybersecurity awareness',
      expertise: 'Security Training',
      photo: 'https://randomuser.me/api/portraits/lego/4.jpg'
    }
  ];

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <section className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold mb-4">Securing Nepal's Digital Future</h1>
          <p className="lead text-muted mb-4">
            Nepal Cyber Resilience is a web-based initiative to educate, inform, and protect Nepali internet users from 
            cyber threats. In a country where cybercrime cases more than doubled from 9,013 in 2022-23 to 19,730 in 2023-24, 
            our mission is to provide a resilient digital shield through education and practical tools.
          </p>
          
          <div className="row g-4 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="d-flex align-items-center">
                  <div className="me-2 text-primary">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="fw-bold fs-5">{stat.value}</div>
                    <div className="text-muted small">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="d-flex gap-3">
            <Link to="/register" className="btn btn-primary px-4">
              Join Our Mission
            </Link>
            <Link to="/resources" className="btn btn-outline-primary px-4">
              Explore Resources
            </Link>
          </div>
        </div>
        <div className="col-lg-6 mt-5 mt-lg-0">
          <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Cybersecurity in Nepal" 
              className="img-fluid object-fit-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-5 my-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h2 className="fw-bold mb-4">Our Mission</h2>
            <p className="lead text-muted mb-4">
              Nepal Cyber Resilience is more than just a website - it's a movement towards creating a 
              digitally secure and aware society in Nepal. We address the core problems of unawareness, 
              poor reporting, and lack of access to cybersecurity resources.
            </p>
            <div className="d-flex gap-3">
              <Link to="/about" className="btn btn-outline-primary">
                Learn More
              </Link>
              <Link to="/contact" className="btn btn-link text-decoration-none">
                Get Involved <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">Key Objectives</h5>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex">
                    <FiAward className="text-primary mt-1 me-2" size={20} />
                    <div>
                      <h6 className="mb-1">Spread Cybersecurity Awareness</h6>
                      <p className="text-muted small mb-0">Educate on essential topics like phishing, malware, and password safety in simple Nepali and English.</p>
                    </div>
                  </li>
                  <li className="mb-3 d-flex">
                    <FiShield className="text-primary mt-1 me-2" size={20} />
                    <div>
                      <h6 className="mb-1">Address Real Cyber Threats</h6>
                      <p className="text-muted small mb-0">Highlight common scams and teach recognition and reporting of threats.</p>
                    </div>
                  </li>
                  <li className="d-flex">
                    <FiUsers className="text-primary mt-1 me-2" size={20} />
                    <div>
                      <h6 className="mb-1">Build a Cyber-Resilient Community</h6>
                      <p className="text-muted small mb-0">Engage schools, businesses, and communities across Nepal in online safety.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 my-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">What We Offer</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Comprehensive tools and resources to protect Nepali internet users from cyber threats
            </p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{width: '64px', height: '64px'}}>
                      {feature.icon}
                    </div>
                    <h5 className="mb-3">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-5 my-5 bg-light rounded-3">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Trusted Technologies</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
              We leverage industry-standard cryptographic libraries and protocols
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { name: 'AES-256', description: 'Encryption standard' },
              { name: 'RSA-4096', description: 'Key exchange' },
              { name: 'TLS 1.3', description: 'Secure transport' },
              { name: 'OAuth 2.0', description: 'Authentication' },
              { name: 'SHA-3', description: 'Hashing algorithm' },
            ].map((tech, index) => (
              <div key={index} className="col-auto">
                <div className="card border-0 bg-white shadow-sm">
                  <div className="card-body text-center p-3">
                    <div className="fw-bold text-primary">{tech.name}</div>
                    <small className="text-muted">{tech.description}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Our Security Team</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Experts in cryptography, distributed systems, and privacy-preserving technologies
          </p>
        </div>
        <div className="row g-4">
          {teamMembers.map(member => (
            <div key={member.id} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                <div className="card-img-top" style={{ height: '200px' }}>
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="img-fluid h-100 w-100 object-fit-cover"
                  />
                </div>
                <div className="card-body">
                  <h5 className="mb-1">{member.name}</h5>
                  <p className="text-primary small mb-2">{member.role}</p>
                  <p className="text-muted small mb-3">{member.bio}</p>
                  <div className="d-flex align-items-center">
                    <FiShield className="me-2 text-muted" size={14} />
                    <small className="text-muted">{member.expertise}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 my-5 bg-primary bg-opacity-10 rounded-3">
        <div className="container text-center py-4">
          <h2 className="fw-bold mb-4">Ready to Experience True Security?</h2>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Join thousands of security-conscious users who trust their data with SecureCloud
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/upload" className="btn btn-primary px-4">
              Get Started
            </Link>
            <Link to="/contact" className="btn btn-outline-primary px-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;