import React, { useState, useEffect } from 'react';
import { FiFileText, FiCheckCircle, FiAlertCircle, FiBell } from 'react-icons/fi';
import './Quiz.css';

const quizQuestions = [
  {
    question: 'What is the safest way to create a password?',
    options: [
      'Use your birthdate',
      'Use a mix of letters, numbers, and symbols',
      'Use your pet’s name',
      'Use “password123”'
    ],
    answer: 1
  },
  {
    question: 'Which of the following is a sign of a phishing email?',
    options: [
      'Unexpected attachment',
      'Spelling mistakes',
      'Urgent requests for info',
      'All of the above'
    ],
    answer: 3
  },
  {
    question: 'What should you do if you receive a suspicious link?',
    options: [
      'Click to see what it is',
      'Ignore and delete it',
      'Forward to friends',
      'Reply to sender'
    ],
    answer: 1
  },
  {
    question: 'Two-factor authentication (2FA) is:',
    options: [
      'A password manager',
      'A second layer of security',
      'A type of virus',
      'A Wi-Fi protocol'
    ],
    answer: 1
  }
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifError, setNotifError] = useState(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (window.Notification.permission === 'default') {
          requestNotificationPermission().then(granted => {
            setNotifEnabled(granted);
          }).catch(() => setNotifEnabled(false));
        } else if (window.Notification.permission === 'granted') {
          setNotifEnabled(true);
        }
        // Schedule daily notification (local only; real daily would need service worker or backend)
        const now = new Date();
        const msUntilNext9am = (() => {
          const next = new Date(now);
          next.setHours(9, 0, 0, 0);
          if (now > next) next.setDate(next.getDate() + 1);
          return next - now;
        })();
        const timer = setTimeout(() => {
          sendQuizNotification();
          setInterval(sendQuizNotification, 24 * 60 * 60 * 1000);
        }, msUntilNext9am);
        return () => clearTimeout(timer);
      } else {
        setNotifEnabled(false);
      }
    } catch (err) {
      setNotifError('Notification feature is not supported in your environment.');
    }
  }, []);

  const handleOption = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === quizQuestions[current].answer) {
      setScore(score + 1);
    }
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">
        <FiFileText className="quiz-icon" /> Cybersecurity Quiz
      </h2>
      {!notifEnabled && (
        <button
          className="quiz-notif-btn"
          onClick={async () => {
            const granted = await requestNotificationPermission();
            setNotifEnabled(granted);
          }}
          style={{marginBottom: '1rem'}}
        >
          <FiBell style={{marginRight: 6}} /> Enable Daily Bonus Quiz Notifications
        </button>
      )}
      {notifEnabled && (
        <div className="quiz-notif-enabled">
          <FiBell style={{color: '#ffd700', marginRight: 4}} /> Daily bonus quiz notifications enabled!
        </div>
      )}
      {!showResult ? (
        <div className="quiz-question-section">
          <div className="quiz-question">{quizQuestions[current].question}</div>
          <div className="quiz-options">
            {quizQuestions[current].options.map((opt, idx) => (
              <button
                key={idx}
                className={`quiz-option-btn${selected === idx ? ' selected' : ''}`}
                onClick={() => handleOption(idx)}
                disabled={selected !== null}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <button className="quiz-next-btn" onClick={handleNext}>
              {current === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-result-section">
          <div className="quiz-score">
            <FiCheckCircle className="quiz-result-icon" />
            You scored {score} out of {quizQuestions.length}!
          </div>
          <button className="quiz-restart-btn" onClick={handleRestart}>
            Try Again
          </button>
        </div>
      )}
      <div className="quiz-progress">
        Question {current + 1} of {quizQuestions.length}
      </div>
    </div>
  );
};

export default Quiz;
