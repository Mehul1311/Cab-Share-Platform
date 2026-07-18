import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, CreditCard, Clock, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home animate-fade-in">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              Share the journey, <br/>
              <span className="gradient-text">split the cost.</span>
            </h1>
            <p>Connect with verified drivers heading your way. Enjoy a premium, safe, and comfortable ride sharing experience built on collaboration.</p>
            <div className="hero-actions">
              <Link to="/auth" className="btn btn-primary">
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>
          </div>
          <div className="hero-image glass-panel">
            <div className="dashboard-mockup">
              <div className="mockup-header">
                <div className="mockup-title">
                  <div className="mockup-dot"></div>
                  <span>Smart Route Matcher</span>
                </div>
                <div className="mockup-status">System Active</div>
              </div>
              
              {/* Route Visualization */}
              <div className="route-viz">
                <div className="viz-point start">A</div>
                <div className="viz-line"></div>
                <div className="viz-point end">B</div>
              </div>
              
              <div className="mockup-footer">
                <div className="mockup-stat">
                  <span className="mockup-stat-val">12 Mins</span>
                  <span className="mockup-stat-lbl">Average Match</span>
                </div>
                <div className="mockup-stat">
                  <span className="mockup-stat-val">₹150</span>
                  <span className="mockup-stat-lbl">Est. Avg Fare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="section-header text-center">
          <h2>Why Choose RideShare?</h2>
          <p>Experience the next generation of collaborative commuting, designed for convenience and safety.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon"><MapPin size={24} /></div>
            <h3>Smart Routing</h3>
            <p>Our algorithm matches you with drivers on your exact route to minimize detours and travel times.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Shield size={24} /></div>
            <h3>Verified Users</h3>
            <p>Every driver and passenger undergoes identity verification for a secure community.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><CreditCard size={24} /></div>
            <h3>Cashless Payments</h3>
            <p>Seamless, secure, and instant peer-to-peer payments. No need to carry cash.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Clock size={24} /></div>
            <h3>Real-time Updates</h3>
            <p>Communicate instantly with matching rides and track updates as they occur.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
