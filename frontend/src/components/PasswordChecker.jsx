import React, { useState } from 'react';
import { FiLock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './PasswordChecker.css';

const strengthLevels = [
  { label: 'Very Weak', color: '#ef4444' },
  { label: 'Weak', color: '#f59e42' },
  { label: 'Moderate', color: '#fbbf24' },
  { label: 'Strong', color: '#3b82f6' },
  { label: 'Very Strong', color: '#10b981' }
];

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;
  return score;
}

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const strength = calculateStrength(password);
  const { label, color } = strengthLevels[strength] || strengthLevels[0];

  return (
    <div className="password-checker-container">
      <h2 className="checker-title">
        <FiLock className="checker-icon" /> Password Strength Checker
      </h2>
      <div className="checker-form">
        <input
          type="password"
          className="checker-input"
          placeholder="Enter your password"
          value={password}
          onChange={e => { setPassword(e.target.value); setTouched(true); }}
        />
        {touched && (
          <div className="strength-indicator" style={{ color }}>
            {strength >= 3 ? <FiCheckCircle /> : <FiAlertCircle />} {label}
          </div>
        )}
        <div className="strength-bar-bg">
          <div
            className="strength-bar"
            style={{ width: `${(strength + 1) * 20}%`, background: color }}
          />
        </div>
        <ul className="checker-tips">
          <li>At least 8 characters</li>
          <li>Upper and lower case letters</li>
          <li>Numbers (0-9)</li>
          <li>Special symbols (!@#$...)</li>
          <li>12+ characters for best security</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordChecker;
