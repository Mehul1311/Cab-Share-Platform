import React, { useState } from 'react';
import api from '../utils/api';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  User, 
  FileText, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  CreditCard,
  MessageCircle,
  Flag,
  Car,
  HelpCircle
} from 'lucide-react';
import { ContactIllustration } from '../components/Illustrations';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phoneNumber: '',
    subject: '',
    message: '' 
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');

    try {
      const messageBody = `Subject: ${formData.subject}\nPhone: ${formData.phoneNumber}\n\nMessage:\n${formData.message}`;

      const response = await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        message: messageBody
      });
      
      const data = response.data;
      if (data.success) {
        setStatus('Message Sent Successfully!');
        setFormData({ name: '', email: '', phoneNumber: '', subject: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('Failed to send: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      setStatus('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleHelpCardClick = (topic) => {
    alert(`Redirecting to support center for: ${topic}`);
  };

  const handleFloatingChatClick = () => {
    alert("Opening Live Chat Support... (Simulated)");
  };

  return (
    <div className="contact-page-wrapper animate-fade-in">
      
      {/* 🔮 Background Animated Blobs */}
      <div className="contact-bg-blob top-left"></div>
      <div className="contact-bg-blob bottom-right"></div>
      <div className="contact-bg-blob center-glow"></div>

      {/* 🌟 HERO SECTION */}
      <div className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">Get in Touch</h1>
            <p className="contact-hero-subtitle">We're here to help you travel smarter, safer, and cheaper.</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '-40px' }}>
        
        {/* 🏢 HORIZONTAL INFO CARDS */}
        <div className="contact-info-strip">
          <div className="contact-info-card glass-panel">
            <div className="info-icon">
              <MapPin size={24} />
            </div>
            <div className="info-content">
              <h4>Headquarters</h4>
              <p>Chandigarh, India</p>
            </div>
          </div>

          <div className="contact-info-card glass-panel">
            <div className="info-icon">
              <Mail size={24} />
            </div>
            <div className="info-content">
              <h4>Email Us</h4>
              <p>support@rideshare.com</p>
            </div>
          </div>

          <div className="contact-info-card glass-panel">
            <div className="info-icon">
              <Phone size={24} />
            </div>
            <div className="info-content">
              <h4>Call Us</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="contact-info-card glass-panel">
            <div className="info-icon">
              <Clock size={24} />
            </div>
            <div className="info-content">
              <h4>Working Hours</h4>
              <p>Mon - Sat, 9AM - 7PM</p>
            </div>
          </div>
        </div>

        {/* 💻 MAIN SPLIT GRID: Form + Map/Help */}
        <div className="contact-main-grid">
          
          {/* LEFT: Premium Contact Form */}
          <div className="contact-form-container glass-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="contact-form-header">
              <h2>Send a Message 👋</h2>
              <p>Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="modern-contact-form">
              <div className="form-row-2">
                <div className="input-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required 
                    />
                    <div className="input-icon-wrapper"><User size={18} /></div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <input 
                      type="email" 
                      className="input-field" 
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required 
                    />
                    <div className="input-icon-wrapper"><Mail size={18} /></div>
                  </div>
                </div>
              </div>

              <div className="form-row-2">
                <div className="input-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <input 
                      type="tel" 
                      className="input-field" 
                      placeholder="+91 9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      required 
                    />
                    <div className="input-icon-wrapper"><Phone size={18} /></div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Subject</label>
                  <div className="input-with-icon">
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required 
                    />
                    <div className="input-icon-wrapper"><FileText size={18} /></div>
                  </div>
                </div>
              </div>

              <div className="input-group" style={{ flexGrow: 1 }}>
                <label>Your Message</label>
                <div className="input-with-icon">
                  <textarea 
                    className="input-field" 
                    rows="5"
                    maxLength="500"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required 
                  ></textarea>
                  <div className="input-icon-wrapper" style={{ top: '20px' }}>
                    <MessageSquare size={18} />
                  </div>
                </div>
                <div className="char-counter">
                  <span>{formData.message.length} / 500 characters</span>
                </div>
              </div>

              <button type="submit" className="btn-premium-send" disabled={loading}>
                {loading ? (
                  <span>Sending...</span>
                ) : status === 'Message Sent Successfully!' ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>

              {status && status !== 'Message Sent Successfully!' && (
                <div className="form-error-status">
                  <AlertCircle size={18} />
                  <span>{status}</span>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT: Visuals & Support Cards */}
          <div className="contact-sidebar animate-slide-up" style={{ animationDelay: '0.2s' }}>
            
            {/* Interactive Mini Map */}
            <div className="visual-map-card glass-panel">
              <div className="map-grid-overlay"></div>
              <div className="map-viz-flow">
                <div className="map-node start">
                  <MapPin size={14} />
                  <div className="pulse start"></div>
                </div>
                
                <div className="map-route-connector">
                  <div className="map-moving-car">
                    <svg viewBox="0 0 48 30" width="28" height="18" style={{ overflow: 'visible' }}>
                      <path d="M 3,22 L 3,18 Q 5,18 8,13 Q 10,10 18,10 L 26,10 Q 31,10 35,16 L 43,16 Q 45,16 45,22 Z" fill="var(--vibrant-cyan)" />
                      <path d="M 10,12 L 17,12 L 17,15 L 8,15 Z" fill="#08111F" opacity="0.8" />
                      <path d="M 20,12 L 26,12 L 30,15 L 20,15 Z" fill="#08111F" opacity="0.8" />
                      <g className="spin-wheel">
                        <circle cx="12" cy="22" r="5" fill="#070A13" stroke="white" strokeWidth="1.5" />
                      </g>
                      <g className="spin-wheel">
                        <circle cx="32" cy="22" r="5" fill="#070A13" stroke="white" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="map-node dest">
                  <Flag size={14} />
                  <div className="pulse dest"></div>
                </div>
              </div>
              <div className="map-locations">
                <span>Chandigarh</span>
                <span>Delhi</span>
              </div>
            </div>

            {/* Support Desk Cards */}
            <h3 className="sidebar-heading">Dedicated Support Desks</h3>
            
            <div className="support-desk-card" onClick={() => handleHelpCardClick("Ride Issues")}>
              <div className="desk-icon blue"><Car size={20} /></div>
              <div className="desk-content">
                <h4>Ride & Safety Issues</h4>
                <p>Report delays, safety concerns, or match problems.</p>
              </div>
            </div>

            <div className="support-desk-card" onClick={() => handleHelpCardClick("Payments")}>
              <div className="desk-icon orange"><CreditCard size={20} /></div>
              <div className="desk-content">
                <h4>Payment & Refunds</h4>
                <p>Simulated refund claims and transaction issues.</p>
              </div>
            </div>

            <div className="support-desk-card" onClick={() => handleHelpCardClick("Partnerships")}>
              <div className="desk-icon purple"><HelpCircle size={20} /></div>
              <div className="desk-content">
                <h4>Business Partnerships</h4>
                <p>Integration API requests and B2B proposals.</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* FLOATING SUPPORT CHAT BUTTON */}
      <div className="floating-chat-container">
        <div className="chat-tooltip-bubble">Live Chat</div>
        <button className="floating-chat-btn" onClick={handleFloatingChatClick}>
          <MessageCircle size={24} />
        </button>
      </div>

    </div>
  );
};

export default Contact;
