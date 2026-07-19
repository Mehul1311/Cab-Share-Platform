import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, ArrowLeft, Home } from 'lucide-react';
import './ComingSoon.css';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-wrapper animate-fade-in">
      {/* Background elements */}
      <div className="cs-blob cs-blob-1"></div>
      <div className="cs-blob cs-blob-2"></div>
      
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 175px)' }}>
        <div className="cs-card glass-panel animate-slide-up">
          <div className="cs-icon-wrapper">
            <div className="cs-icon-pulse"></div>
            <Wrench size={48} className="cs-icon" />
          </div>
          
          <h1 className="cs-title">We're Working On It! 🚧</h1>
          <p className="cs-description">
            This feature or page is currently under development. Our engineers are working hard to bring this to you very soon.
          </p>
          
          <div className="cs-actions">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
            <Link to="/" className="btn btn-primary">
              <Home size={18} />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
