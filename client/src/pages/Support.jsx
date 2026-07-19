import React from 'react';
import { Mail, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import './StaticPages.css';

const Support = () => {
  return (
    <div className="static-page animate-fade-in">
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>
      
      <div className="container">
        <div className="static-hero">
          <div className="badge-pill mb-4" style={{ margin: '0 auto 16px' }}>Customer Service</div>
          <h1 className="static-title">How can we help you?</h1>
          <p className="static-subtitle">
            Our support team is available around the clock to assist you with any issues or inquiries.
          </p>
        </div>

        <div className="static-grid" style={{ maxWidth: '900px' }}>
          {/* Email Support */}
          <div className="static-grid-card glass-panel" style={{ alignItems: 'center', textAlign: 'center' }}>
            <div className="static-card-icon">
              <Mail size={24} />
            </div>
            <h3>Email Support</h3>
            <p style={{ textAlign: 'center' }}>Send us an email anytime and our team will get back to you within 24 hours.</p>
            <a href="mailto:support@cabshare.com" className="static-link-btn" style={{ margin: '0 auto' }}>support@cabshare.com <ArrowRight size={16} /></a>
          </div>

          {/* Phone Support */}
          <div className="static-grid-card glass-panel" style={{ alignItems: 'center', textAlign: 'center' }}>
            <div className="static-card-icon">
              <Phone size={24} />
            </div>
            <h3>Phone Support</h3>
            <p style={{ textAlign: 'center' }}>Available Monday to Saturday, 9 AM to 7 PM for urgent issues.</p>
            <a href="tel:+919876543210" className="static-link-btn" style={{ margin: '0 auto' }}>+91 98765 43210 <ArrowRight size={16} /></a>
          </div>

          {/* Live Chat */}
          <div className="static-grid-card glass-panel" style={{ alignItems: 'center', textAlign: 'center' }}>
            <div className="static-card-icon">
              <MessageSquare size={24} />
            </div>
            <h3>Live Chat</h3>
            <p style={{ textAlign: 'center' }}>Chat instantly with our support agents right from your dashboard.</p>
            <button className="static-link-btn" style={{ margin: '0 auto', background: 'transparent', border: 'none', cursor: 'pointer' }}>Start Chat <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
