import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Dashboard.css';
import {
  FiDownload,
  FiTrash2,
  FiEye,
  FiGrid,
  FiList,
  FiFile,
  FiImage,
  FiUpload,
  FiLock,
  FiLink,
  FiShield,
  FiAlertTriangle,
  FiCheck,
  FiX
} from 'react-icons/fi';

// Format bytes into human-readable strings
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Icon based on mimeType
const FileIcon = ({ mimeType, className = '' }) => {
  if (mimeType?.startsWith('image/')) {
    return <FiImage className={className} />;
  } else if (mimeType === 'application/pdf') {
    return <FiFile className={className} />;
  }
  return <FiFile className={className} />;
};

// Dynamic backend URL for production or development
const BACKEND_URL = 'http://localhost:5000';

const getProfilePicUrl = (user, picOverride) => {
  const pic = picOverride || user?.profilePicture;
  if (pic) {
    return `${BACKEND_URL}${pic}`;
  }
  if (user?.picture) return user.picture;
  return "/default-profile.jpg";
};

// Password Checker Component
const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');

  const checkPasswordStrength = (value) => {
    let score = 0;
    let feedback = [];
    
    // Length check
    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    
    // Complexity checks
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    
    // Set feedback
    if (value.length === 0) {
      feedback = 'Enter a password to check its strength';
    } else if (value.length < 8) {
      feedback = 'Too short';
    } else if (score < 3) {
      feedback = 'Weak';
    } else if (score < 5) {
      feedback = 'Moderate';
    } else {
      feedback = 'Strong';
    }
    
    setStrength(Math.min(score, 5));
    setFeedback(feedback);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          <FiLock className="me-2" /> Password Strength Checker
        </h5>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Check password strength..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
          />
        </div>
        {password && (
          <div>
            <div className="progress mb-2" style={{ height: '8px' }}>
              <div
                className={`progress-bar ${
                  strength < 3 ? 'bg-danger' : strength < 5 ? 'bg-warning' : 'bg-success'
                }`}
                role="progressbar"
                style={{ width: `${(strength / 5) * 100}%` }}
              ></div>
            </div>
            <small className={`text-${
              strength < 3 ? 'danger' : strength < 5 ? 'warning' : 'success'
            }`}>
              {feedback}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

// Phishing Link Detector Component
const PhishingLinkDetector = () => {
  const [url, setUrl] = useState('');
  const [isSafe, setIsSafe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkUrl = () => {
    if (!url) return;
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This is a mock check - in a real app, you'd call an API
      const isPhishing = url.includes('phish') || 
                        url.includes('scam') || 
                        url.includes('hack');
      
      setIsSafe(!isPhishing);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">
          <FiLink className="me-2" /> Phishing Link Detector
        </h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter URL to check..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            className="btn btn-primary" 
            onClick={checkUrl}
            disabled={!url || isLoading}
          >
            {isLoading ? 'Checking...' : 'Check'}
          </button>
        </div>
        {isSafe !== null && (
          <div className={`alert alert-${isSafe ? 'success' : 'danger'}`}>
            <div className="d-flex align-items-center">
              {isSafe ? (
                <>
                  <FiCheck className="me-2" size={20} />
                  <span>This link appears to be safe</span>
                </>
              ) : (
                <>
                  <FiX className="me-2" size={20} />
                  <span>Warning: This link may be a phishing attempt</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Security Tips Component
const SecurityTips = () => {
  const tips = [
    "Always enable two-factor authentication for your accounts.",
    "Never share your passwords or OTPs with anyone.",
    "Regularly update your software and applications.",
    "Be cautious of unsolicited emails asking for personal information.",
    "Use a password manager to generate and store strong, unique passwords.",
    "Verify website security by checking for 'https://' and the padlock icon."
  ];
  
  const [currentTip, setCurrentTip] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [tips.length]);
  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <FiShield className="me-2" /> Security Tip of the Moment
        </h5>
        <div className="alert alert-info">
          <p className="mb-0">{tips[currentTip]}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Fetch and normalize files
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/files');
      let fetched = [];

      if (Array.isArray(response)) {
        fetched = response;
      } else if (response.files && Array.isArray(response.files)) {
        fetched = response.files;
      } else if (
        response.data?.files &&
        Array.isArray(response.data.files)
      ) {
        fetched = response.data.files;
      } else if (response.data && Array.isArray(response.data)) {
        fetched = response.data;
      } else {
        console.warn('Unexpected files response:', response);
      }

      // API returns size as string in MB → convert to bytes
      const normalized = fetched.map((f) => ({
        ...f,
        size: f.size ? parseFloat(f.size) * 1024 * 1024 : 0
      }));
      setFiles(normalized);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load files');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Download handler
  const handleDownload = async (file) => {
    try {
      const blob = await api.get(`/files/view/${file.id}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.displayName || file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(`Downloaded ${file.name}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Download failed');
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this file?'
      )
    ) {
      try {
        await api.delete(`/files/${id}`);
        setFiles((fs) => fs.filter((f) => f.id !== id));
        toast.success('File deleted');
        if (selectedFile?.id === id) {
          setShowPreviewModal(false);
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  // Preview handler
  const handlePreview = async (file) => {
    try {
      setSelectedFile(file);
      if (file.mimeType?.startsWith('image/') || file.mimeType === 'application/pdf') {
        const blob = await api.get(`/files/view/${file.id}`, {
          responseType: 'blob'
        });
        setSelectedFile((prev) => ({
          ...prev,
          downloadUrl: URL.createObjectURL(blob)
        }));
      } else {
        setSelectedFile((prev) => ({ ...prev, downloadUrl: null }));
      }
      setShowPreviewModal(true);
    } catch (err) {
      console.error(err);
      toast.error('Preview failed');
    }
  };


  
  // Filtered list
  const filtered = files.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.mimeType
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Redirect if unauthenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchFiles();
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="dashboard-container">
      {/* Welcome */}
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <img
            src={getProfilePicUrl(user)}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover
              border-4 border-white shadow-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600">
          Manage your secure files and account
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Profile Settings
          </h3>
          <p className="text-gray-600 mb-4">
            Update your account details and preferences
          </p>
          <Link
            to="/profile"
            className="inline-flex items-center px-4 py-2
              bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            View Profile
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Storage Usage
          </h3>
          <p className="text-gray-600 mb-2">
            {files.length} files •{' '}
            {formatFileSize(
              files.reduce((acc, f) => acc + f.size, 0)
            )}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${Math.min(100, files.length * 10)}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;