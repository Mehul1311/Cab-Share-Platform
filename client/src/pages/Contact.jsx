import React, { useState } from 'react';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');

    try {
      const response = await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      
      const data = response.data;
      if (data.success) {
        setStatus('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
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

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              className="input-field" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              className="input-field" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          <div className="input-group">
            <label>Message</label>
            <textarea 
              className="input-field" 
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required 
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {status && (
            <p style={{ marginTop: '16px', textAlign: 'center', color: status.includes('Failed') ? '#ef4444' : 'var(--secondary)' }}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
