import React from 'react';
import "../styles/MotivationPage.css";
import { FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';

const MotivationSection = () => {
  const quotes = [
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ];

  const tips = [
    "Set small, achievable goals each week.",
    "Stay curious and keep experimenting with new ideas.",
    "Reach out to others in the community for advice and support.",
    "Celebrate your progress, no matter how small!"
  ];

  return (
    <div className="motivation-section">
      <h2 className="motivation-title">Stay Motivated!</h2>
      
      <div className="content-wrapper">
        <div className="quote-section">
          <h3>Quotes to Inspire You</h3>
          {quotes.map((quote, index) => (
            <div key={index} className="quote">
              <FaQuoteLeft className="quote-icon" />
              <p>{quote}</p>
            </div>
          ))}
        </div>
        
        <div className="tips-section">
          <h3>Success Tips</h3>
          {tips.map((tip, index) => (
            <div key={index} className="tip">
              <FaCheckCircle className="tip-icon" />
              <p>{tip}</p>
            </div>
          ))}
        </div>
        
        <div className="progress-tracker">
          <h3>Track Your Progress</h3>
          <p>You're just steps away from mastering LPWAN! Keep going and reach your goals.</p>
        </div>
      </div>
    </div>
  );
};

export default MotivationSection;
