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
  HelpCircle, 
  AlertCircle, 
  CreditCard,
  MessageCircle,
  Flag,
  Car
} from 'lucide-react';
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
      // Append Phone and Subject into the message payload for backend compatibility
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
    <div className="container contact-page-container animate-fade-in">
      
      {/* Background Blobs */}
      <div className="contact-blob contact-blob-1"></div>
      <div className="contact-blob contact-blob-2"></div>

      <div className="contact-split-grid">
        
        {/* LEFT COLUMN: Info Panel (40%) */}
        <div className="contact-info-panel glass-panel animate-slide-up">
          <div className="contact-info-header">
            <h2>Contact Information</h2>
            <p>Reach out through any of our channels or visit our regional office.</p>
          </div>

          <div className="info-items-list">
            <div className="info-card-item">
              <div className="info-icon-box">
                <MapPin size={20} />
              </div>
              <div className="info-text-box">
                <span className="info-label">Office Location</span>
                <span className="info-val">Chandigarh, India</span>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-box">
                <Mail size={20} />
              </div>
              <div className="info-text-box">
                <span className="info-label">Email</span>
                <span className="info-val">support@rideshare.com</span>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-box">
                <Phone size={20} />
              </div>
              <div className="info-text-box">
                <span className="info-label">Phone</span>
                <span className="info-val">+91 98765 43210</span>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-box">
                <Clock size={20} />
              </div>
              <div className="info-text-box">
                <span className="info-label">Working Hours</span>
                <span className="info-val">Mon – Sat, 9 AM – 7 PM</span>
              </div>
            </div>
          </div>

          {/* Interactive Mini Map Illustration */}
          <div className="mini-map-card">
            <div className="mini-map-grid"></div>
            
            <div className="map-viz-flow">
              {/* Chandigarh Pin */}
              <div className="map-node">
                <MapPin size={14} />
                <div className="map-node-pulse"></div>
              </div>
              
              {/* Moving Car */}
              <div className="map-route-connector">
                <div className="map-moving-car">
                  <Car size={16} />
                </div>
              </div>

              {/* Delhi Pin */}
              <div className="map-node destination">
                <Flag size={14} />
                <div className="map-node-pulse destination"></div>
              </div>
            </div>

            <div className="map-footer-label">
              <span>📍 Chandigarh</span>
              <span>🏁 Delhi</span>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textAlign: 'center', margin: 0 }}>
            Our support team usually replies within 24 hours.
          </p>
        </div>

        {/* RIGHT COLUMN: Contact Form (60%) */}
        <div className="contact-form-panel glass-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="contact-form-header">
            <h1>Contact Our Team 👋</h1>
            <p>Have a question, feedback, or partnership inquiry? We're always happy to help.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
                <div className="input-icon-wrapper">
                  <User size={18} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <div className="input-group" style={{ marginBottom: '16px' }}>
                <label>Email Address</label>
                <div className="input-with-icon">
                  <input 
                    type="email" 
                    className="input-field" 
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                  <div className="input-icon-wrapper">
                    <Mail size={18} />
                  </div>
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '16px' }}>
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
                  <div className="input-icon-wrapper">
                    <Phone size={18} />
                  </div>
                </div>
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
                <div className="input-icon-wrapper">
                  <FileText size={18} />
                </div>
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '8px' }}>
              <label>Message</label>
              <div className="input-with-icon">
                <textarea 
                  className="input-field" 
                  rows="4"
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
            </div>

            {/* Character Counter */}
            <div className="character-counter-row">
              <span>{formData.message.length} / 500</span>
            </div>

            <button type="submit" className="btn-send" disabled={loading}>
              {loading ? (
                <span>Sending...</span>
              ) : status === 'Message Sent Successfully!' ? (
                <>
                  <CheckCircle size={18} />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
            </button>

            {status && status !== 'Message Sent Successfully!' && (
              <p style={{ marginTop: '16px', textAlign: 'center', color: status.includes('Failed') ? '#f87171' : 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <AlertCircle size={16} />
                <span>{status}</span>
              </p>
            )}
          </form>
        </div>
      </div>

      {/* CREATIVE QUICK HELP SECTION */}
      <div className="quick-help-section">
        <div className="quick-help-title">
          <h3>Need Quick Help?</h3>
          <p>Skip the form queue and connect directly with specialized desks.</p>
        </div>

        <div className="help-grid-cards">
          <div className="help-glass-card" onClick={() => handleHelpCardClick("Ride Issues")}>
            <div className="help-card-icon-box">
              <Car size={24} />
            </div>
            <h4>Ride Issues</h4>
            <p>Problems with a current match, delay reports, or passenger feedback.</p>
          </div>

          <div className="help-glass-card" onClick={() => handleHelpCardClick("Payment Support")}>
            <div className="help-card-icon-box">
              <CreditCard size={24} />
            </div>
            <h4>Payment Support</h4>
            <p>Simulated refund claims, transaction history details, or fare splits.</p>
          </div>

          <div className="help-glass-card" onClick={() => handleHelpCardClick("Partnership")}>
            <div className="help-card-icon-box">
              <HelpCircle size={24} />
            </div>
            <h4>Partnership</h4>
            <p>Business queries, integration API requests, and marketing proposals.</p>
          </div>
        </div>
      </div>

      {/* FLOATING SUPPORT CHAT BUTTON */}
      <div className="floating-chat-container">
        <div className="chat-tooltip-bubble">Need Help?</div>
        <button className="floating-chat-btn" onClick={handleFloatingChatClick}>
          <MessageCircle size={24} />
        </button>
      </div>

    </div>
  );
};

export default Contact;
