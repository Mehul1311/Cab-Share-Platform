import React from 'react';
import { Car, Github, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Car size={28} className="logo-icon" />
            <span>RideShare</span>
          </div>
          <p className="footer-desc">
            The premium cab sharing platform connecting drivers and riders safely and efficiently. Built by an awesome team.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>Company</h3>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/query">FAQ & Queries</a>
          </div>
          <div className="link-group">
            <h3>Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className="link-group social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><Github size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RideShare Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
