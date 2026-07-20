import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Star, 
  Globe, 
  Shield, 
  ArrowRight,
  Flag
} from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Footer.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user || !!localStorage.getItem('uid'));
    });
    return () => unsubscribe();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      alert(`Thank you for subscribing! We will send updates to ${newsletterEmail}`);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="footer-wrapper">
      {/* Wave Divider */}
      <div className="footer-wave-box">
        <svg className="footer-wave-svg" viewBox="0 0 1440 74" fill="none" preserveAspectRatio="none">
          <path d="M0,32 C240,70 480,74 720,48 C960,22 1200,-10 1440,6 L1440,74 L0,74 Z" />
        </svg>
      </div>

      {/* Background Glow Lights */}
      <div className="footer-light-glow glow-blue"></div>
      <div className="footer-light-glow glow-indigo"></div>

      {/* 🚀 CALL TO ACTION BANNER */}
      <div className="footer-cta-container">
        <div className="footer-cta-card">
          <h2>Ready for Your Next Journey?</h2>
          <p>Book a ride or offer one today and become part of India's fastest-growing ride-sharing community.</p>
          <div className="footer-cta-actions">
            {isLoggedIn ? (
              <>
                <Link to="/user-dashboard" className="btn btn-primary">
                  <Car size={18} />
                  <span>Find Ride</span>
                </Link>
                <Link to="/driver-dashboard" className="btn btn-secondary">
                  <span>Offer Ride</span>
                  <ArrowRight size={18} />
                </Link>
              </>
            ) : (
              <Link to="/auth" className="btn btn-primary">
                <span>Login / Signup</span>
                <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 📈 TRUST / STATISTICS CARDS */}
      <div className="footer-stats-container">
        <div className="stats-grid-wrapper">
          <div className="stat-glow-card">
            <div className="stat-glow-icon"><Car size={20} /></div>
            <span className="stat-glow-value">25K+</span>
            <span className="stat-glow-label">Successful Rides</span>
          </div>
          <div className="stat-glow-card">
            <div className="stat-glow-icon"><Star size={20} style={{ color: '#FBBF24' }} /></div>
            <span className="stat-glow-value">4.9/5</span>
            <span className="stat-glow-label">Average Rating</span>
          </div>
          <div className="stat-glow-card">
            <div className="stat-glow-icon"><Globe size={20} /></div>
            <span className="stat-glow-value">150+</span>
            <span className="stat-glow-label">Cities Covered</span>
          </div>
          <div className="stat-glow-card">
            <div className="stat-glow-icon"><Shield size={20} style={{ color: '#8B5CF6' }} /></div>
            <span className="stat-glow-value">100%</span>
            <span className="stat-glow-label">Verified Drivers</span>
          </div>
        </div>
      </div>

      {/* 💬 INSPIRATIONAL SECTION */}
      <div className="footer-quote-container">
        <div className="inspirational-quote-card">
          "Every shared ride reduces traffic, saves fuel, and builds a greener tomorrow."
        </div>
      </div>

      {/* 🚗 CREATIVE ROAD & SKYLINE ILLUSTRATION */}
      <div className="footer-skyline-box">
        {/* Mock City Skyline (SVG) */}
        <svg className="skyline-svg-graphics" viewBox="0 0 1200 80" fill="none" preserveAspectRatio="none">
          <path d="M 0,80 L 0,40 L 40,40 L 40,30 L 90,30 L 90,50 L 150,50 L 150,20 L 210,20 L 210,60 L 260,60 L 260,10 L 320,10 L 320,80 Z" fill="rgba(255,255,255,0.02)" />
          <path d="M 320,80 L 320,45 L 370,45 L 370,30 L 420,30 L 420,50 L 480,50 L 480,25 L 530,25 L 530,60 L 590,60 L 590,15 L 650,15 L 650,80 Z" fill="rgba(255,255,255,0.015)" />
          <path d="M 650,80 L 650,40 L 700,40 L 700,20 L 750,20 L 750,55 L 810,55 L 810,30 L 870,30 L 870,80 Z" fill="rgba(255,255,255,0.02)" />
          <path d="M 870,80 L 870,50 L 920,50 L 920,35 L 980,35 L 980,60 L 1040,60 L 1040,10 L 1100,10 L 1100,80 Z" fill="rgba(255,255,255,0.015)" />
          <path d="M 1100,80 L 1100,45 L 1150,45 L 1150,30 L 1200,30 L 1200,80 Z" fill="rgba(255,255,255,0.02)" />
        </svg>

        {/* Road layout */}
        <div className="skyline-road-track">
          <div className="skyline-road-dashes"></div>
          
          {/* Moving car illustration */}
          <div className="skyline-moving-car">
            <svg viewBox="0 0 48 30" width="28" height="18" style={{ overflow: 'visible' }}>
              <path d="M 3,22 L 3,18 Q 5,18 8,13 Q 10,10 18,10 L 26,10 Q 31,10 35,16 L 43,16 Q 45,16 45,22 Z" fill="var(--vibrant-cyan)" />
              <path d="M 10,12 L 17,12 L 17,15 L 8,15 Z" fill="#08111F" opacity="0.8" />
              <path d="M 20,12 L 26,12 L 30,15 L 20,15 Z" fill="#08111F" opacity="0.8" />
              <g className="spin-wheel">
                <circle cx="12" cy="22" r="5" fill="#070A13" stroke="white" strokeWidth="1.5" />
                <line x1="12" y1="17" x2="12" y2="27" stroke="white" strokeWidth="1" />
              </g>
              <g className="spin-wheel">
                <circle cx="32" cy="22" r="5" fill="#070A13" stroke="white" strokeWidth="1.5" />
                <line x1="32" y1="17" x2="32" y2="27" stroke="white" strokeWidth="1" />
              </g>
            </svg>
          </div>

          {/* Pulse target pin */}
          <div className="skyline-dest-pin">
            <Flag size={14} />
          </div>
        </div>
      </div>

      {/* MAIN FOOTER LINKS INFO GRID */}
      <div className="footer-main-grid">
        
        {/* LEFT COLUMN: Branding & tagline */}
        <div className="footer-left-info">
          <div className="footer-logo-title">RideShare</div>
          <div className="footer-tagline-multiline">
            {`Connecting Riders.
            Sharing Smiles.
            Building Greener Cities.`}
          </div>
          <p className="footer-paragraph-desc">
            RideShare is India's trusted ride-sharing platform helping thousands of travelers save money, reduce traffic, and travel together safely every day.
          </p>
          <div className="footer-trust-rating">
            <div style={{ display: 'flex', gap: '4px', color: '#FBBF24' }}>
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </div>
            <span>Trusted by 25,000+ Happy Riders</span>
          </div>
        </div>

        {/* CENTER COLUMN: Links (Quick links & Company) */}
        <div className="footer-links-columns">
          <div className="footer-link-group">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            {isLoggedIn && (
              <>
                <Link to="/user-dashboard">Find Ride</Link>
                <Link to="/driver-dashboard">Offer Ride</Link>
              </>
            )}
            <Link to="/contact">Contact</Link>
            <Link to="/query">FAQ</Link>
          </div>

          <div className="footer-link-group">
            <h4>Company</h4>
            <a href="#careers" onClick={() => alert("Careers page loaded!")}>Careers</a>
            <a href="#blog" onClick={() => alert("Blog page loaded!")}>Blog</a>
            <a href="#privacy" onClick={() => alert("Privacy policy loaded!")}>Privacy Policy</a>
            <a href="#terms" onClick={() => alert("Terms & conditions loaded!")}>Terms & Conditions</a>
            <a href="#support" onClick={() => alert("Support page loaded!")}>Support</a>
            <a href="#help" onClick={() => alert("Help Center loaded!")}>Help Center</a>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Details & Newsletter */}
        <div className="footer-right-contact">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>Phagwara, Punjab</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <span>rajputkomal7823@gmail.com</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>+91 6201912023</span>
            </div>
            <div className="footer-contact-item">
              <Clock size={18} />
              <span>Mon–Sat: 9 AM – 7 PM</span>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="newsletter-box">
            <h4>Stay Updated</h4>
            <p>Get the latest ride offers, travel tips, and exciting platform updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form-row">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

      </div>

      {/* 🌍 SOCIAL MEDIA CIRCULAR BUTTONS */}
      <div className="footer-socials-wrapper">
        <a 
          href="https://www.instagram.com/komal.singh.rajput?utm_source=qr&igsh=MTkwbWFpOGg3N3MwOQ==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-circle-btn instagram"
          data-tooltip="Follow us on Instagram"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        
        <a 
          href="https://www.linkedin.com/in/komalsingh1512/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-circle-btn linkedin"
          data-tooltip="Connect on LinkedIn"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>

        <a 
          href="https://telegram.org" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-circle-btn telegram"
          data-tooltip="Join Telegram Community"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </a>

        <a 
          href="https://x.com/komalsingh512" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-circle-btn twitter"
          data-tooltip="Follow us on X (Twitter)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
        </a>

        <a 
          href="https://github.com/Komalsingh1512" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-circle-btn github"
          data-tooltip="Star our GitHub Repository"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
      </div>

      {/* Copyright Row */}
      <div className="footer-bottom-row">
        <p>&copy; {new Date().getFullYear()} RideShare Platform. All rights reserved. Connecting People, One Ride at a Time.</p>
      </div>
    </footer>
  );
};

export default Footer;
