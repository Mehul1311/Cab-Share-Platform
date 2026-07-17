import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, CreditCard, Clock } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home animate-fade-in">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Share the journey, <br/><span className="highlight-text">split the cost.</span></h1>
            <p>Connect with verified drivers heading your way. Enjoy a premium, safe, and comfortable ride sharing experience.</p>
            <div className="hero-actions">
              <Link to="/auth" className="btn btn-primary btn-lg">Get Started</Link>
              <Link to="/about" className="btn btn-secondary btn-lg">Learn More</Link>
            </div>
          </div>
          <div className="hero-image glass-panel">
            {/* Visual representation of a route */}
            <div className="route-viz">
              <div className="viz-point start">A</div>
              <div className="viz-line"></div>
              <div className="viz-point end">B</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="section-header text-center">
          <h2>Why Choose RideShare?</h2>
          <p>Experience the next generation of collaborative commuting.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon"><MapPin /></div>
            <h3>Smart Routing</h3>
            <p>Our algorithm matches you with drivers on your exact route to minimize detours.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Shield /></div>
            <h3>Verified Users</h3>
            <p>Every driver and passenger undergoes rigorous identity verification for your safety.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><CreditCard /></div>
            <h3>Cashless Payments</h3>
            <p>Seamless, secure, and instant in-app payments. No need to carry cash.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Clock /></div>
            <h3>Real-time Tracking</h3>
            <p>Track your ride in real-time and share your ETA with friends and family.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
