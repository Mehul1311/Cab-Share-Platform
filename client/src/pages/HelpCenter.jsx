import React from 'react';
import { Search, MapPin, Shield, CreditCard, User, ArrowRight } from 'lucide-react';
import './StaticPages.css';

const HelpCenter = () => {
  return (
    <div className="static-page animate-fade-in">
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>
      
      <div className="container">
        <div className="static-hero">
          <div className="badge-pill mb-4" style={{ margin: '0 auto 16px' }}>Resources</div>
          <h1 className="static-title">Help Center</h1>
          <p className="static-subtitle">
            Find answers to common questions, tutorials, and guides to get the most out of CabShare.
          </p>
          
          <div className="search-box">
            <Search className="search-icon-absolute" size={20} />
            <input type="text" placeholder="Search for articles, topics, or issues..." />
          </div>
        </div>

        <div className="static-grid">
          {/* Category 1 */}
          <div className="static-grid-card glass-panel">
            <div className="static-card-icon">
              <User size={24} />
            </div>
            <h3>Account & Profile</h3>
            <p>Manage your account settings, update your verification documents, and reset your password.</p>
            <a href="#help" className="static-link-btn" onClick={e => e.preventDefault()}>View Articles <ArrowRight size={16} /></a>
          </div>

          {/* Category 2 */}
          <div className="static-grid-card glass-panel">
            <div className="static-card-icon">
              <MapPin size={24} />
            </div>
            <h3>Rides & Booking</h3>
            <p>Learn how to publish a ride, search for matching routes, and manage your bookings.</p>
            <a href="#help" className="static-link-btn" onClick={e => e.preventDefault()}>View Articles <ArrowRight size={16} /></a>
          </div>

          {/* Category 3 */}
          <div className="static-grid-card glass-panel">
            <div className="static-card-icon">
              <CreditCard size={24} />
            </div>
            <h3>Payments & Pricing</h3>
            <p>Everything you need to know about secure UPI payments, service fees, and refunds.</p>
            <a href="#help" className="static-link-btn" onClick={e => e.preventDefault()}>View Articles <ArrowRight size={16} /></a>
          </div>

          {/* Category 4 */}
          <div className="static-grid-card glass-panel">
            <div className="static-card-icon">
              <Shield size={24} />
            </div>
            <h3>Trust & Safety</h3>
            <p>Our community guidelines, safety features, and how to report an issue during a ride.</p>
            <a href="#help" className="static-link-btn" onClick={e => e.preventDefault()}>View Articles <ArrowRight size={16} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
