import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Shield, 
  CreditCard, 
  Clock, 
  ArrowRight,
  PhoneCall,
  Star
} from 'lucide-react';
import { MobileAppIllustration } from '../components/Illustrations';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  
  // Live ride counter state starting at 2347
  const [rideCount, setRideCount] = useState(2347);
  // Active step state for the interactive route timeline
  const [activeStep, setActiveStep] = useState(0);

  // Search state for Quick Search Box
  const [searchSource, setSearchSource] = useState('');
  const [searchDestination, setSearchDestination] = useState('');

  // Auth state for dynamic button rendering
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('uid'));
  }, []);

  const handleSearchClick = () => {
    const uid = localStorage.getItem('uid');
    if (!uid) {
      navigate('/auth');
    } else {
      navigate('/user-dashboard', { state: { source: searchSource, destination: searchDestination } });
    }
  };

  // Increment counter every 3 seconds simulating live bookings
  useEffect(() => {
    const timer = setInterval(() => {
      setRideCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const timelineSteps = [
    {
      title: "1. Match Ride",
      desc: "Algorithm immediately pairs you with drivers or riders traveling on your precise route coordinates."
    },
    {
      title: "2. Verify Details",
      desc: "Review profiles, verified driver details, UPI handles, and safety ratings before climbing in."
    },
    {
      title: "3. Share Fare",
      desc: "Split the cost automatically. No cash carrying required. Safe and eco-friendly commuting."
    }
  ];

  return (
    <div className="home animate-fade-in">
      
      {/* 🔮 Animated Floating Orbs / Moving Elements */}
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>
      <div className="moving-orb orb-3"></div>
      
      {/* 🚀 HERO SECTION */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            
            {/* Live Counter Pill */}
            <div className="live-counter-pill" style={{ marginBottom: '24px' }}>
              <div className="pulse-dot-cyan"></div>
              <span>🚗 {rideCount.toLocaleString()} rides completed today</span>
            </div>

            <h1>
              Share the journey, <br/>
              <span className="gradient-text">split the cost.</span>
            </h1>
            
            <p>Connect with verified drivers heading your way. Enjoy a premium, safe, and comfortable ride sharing experience built on collaboration.</p>
            
            <div className="hero-actions">
              {isLoggedIn ? (
                <Link to="/user-dashboard" className="btn btn-primary">
                  <span>Go to Dashboard</span>
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <Link to="/auth" className="btn btn-primary">
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </Link>
              )}
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>

            {/* 3D Dashboard Mockup Preview */}
            <div className="dashboard-mockup-3d">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-search">
                  <MapPin size={12} className="text-muted" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Location → Destination</span>
                </div>
              </div>
              <div className="mockup-body">
                <div className="mockup-sidebar"></div>
                <div className="mockup-main">
                  <div className="mockup-card">
                    <div className="mockup-card-title"></div>
                    <div className="mockup-card-line"></div>
                    <div className="mockup-card-line w-75"></div>
                  </div>
                  <div className="mockup-card">
                    <div className="mockup-card-title"></div>
                    <div className="mockup-card-line"></div>
                    <div className="mockup-card-line w-50"></div>
                  </div>
                </div>
              </div>
              
              {/* Glassmorphism Quick Search Box Overlay */}
              <div className="quick-search-glass">
                <div className="glass-input-wrapper">
                  <div className="glass-input-label">Leaving from</div>
                  <input 
                    type="text" 
                    placeholder="Enter City" 
                    className="glass-input-clean" 
                    value={searchSource}
                    onChange={(e) => setSearchSource(e.target.value)}
                  />
                </div>
                <div className="glass-input-divider"></div>
                <div className="glass-input-wrapper">
                  <div className="glass-input-label">Going to</div>
                  <input 
                    type="text" 
                    placeholder="Enter City" 
                    className="glass-input-clean" 
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                  />
                </div>
                <button className="glass-search-btn" onClick={handleSearchClick}>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ⚙️ FEATURE SECTION */}
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

      {/* ⚙️ HOW IT WORKS SECTION */}
      <section className="container" style={{ marginBottom: '30px', marginTop: '20px' }}>
        <div className="section-header text-center">
          <h2>How RideShare Works</h2>
          <p>Three simple steps to start saving money and cutting down traffic.</p>
        </div>

        <div className="how-it-works-grid">
          <div className="step-card">
            <div className="step-number-badge">1</div>
            <h3 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '12px', marginTop: '10px' }}>Publish or Search</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Drivers enter routes, schedules, and costs. Riders search for coordinates matching their pickup.</p>
          </div>

          <div className="step-card">
            <div className="step-number-badge">2</div>
            <h3 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '12px', marginTop: '10px' }}>Lock & Match</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Connect instantly through messaging, review ratings, verify driver IDs and reserve your seats.</p>
          </div>

          <div className="step-card">
            <div className="step-number-badge">3</div>
            <h3 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '12px', marginTop: '10px' }}>Travel Together</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Meet at the pickup, share fuel and toll costs, and reduce emission levels globally.</p>
          </div>
        </div>
      </section>


      {/* 📱 DOWNLOAD APP MOCKUPS SECTION */}
      <section className="download-app-section container">
        <div className="download-split">
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>Take RideShare Everywhere</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Download our mobile app to track matching drivers on-the-go, receive instant push notifications, view real-time maps, and manage secure digital payments.
            </p>
            
            <div className="download-badges-row">
              <Link to="/coming-soon" className="btn-store">
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Get it on</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800 }}>Google Play</span>
                </div>
              </Link>
              <Link to="/coming-soon" className="btn-store">
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Download on the</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800 }}>App Store</span>
                </div>
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MobileAppIllustration />
          </div>
        </div>
      </section>
      {/* 💬 TESTIMONIALS SECTION */}
      <section className="testimonials-section container">
        <div className="section-header text-center">
          <h2>Loved by Commuters Everywhere</h2>
          <p>Join thousands of happy riders and drivers saving time and money daily.</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-quote">
              "RideShare completely changed how I commute to work. I'm saving almost ₹4000 a month on fuel, and I've made some great friends along the way!"
            </div>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">A</div>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: '700', margin: '0 0 2px 0' }}>Aarav Patel</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Commuter</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-quote">
              "As a driver, I love the verified profiles. It makes me feel safe knowing exactly who is getting in my car. The instant payment feature is a lifesaver."
            </div>
            <div className="testimonial-profile">
              <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, var(--orange-accent), var(--vibrant-cyan))' }}>N</div>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: '700', margin: '0 0 2px 0' }}>Neha Sharma</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Driver</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-quote">
              "The live map tracking is flawless. It feels exactly like booking a premium cab, but at a fraction of the cost. Highly recommend this for weekend trips!"
            </div>
            <div className="testimonial-profile">
              <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, var(--vibrant-cyan), var(--electric-blue))' }}>R</div>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: '700', margin: '0 0 2px 0' }}>Rohan Desai</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Weekend Traveler</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌿 ECO-FRIENDLY IMPACT SECTION */}
      <section className="eco-friendly-section container">
        <div className="section-header text-center">
          <h2>Our Environmental Impact</h2>
          <p>Every shared ride contributes to a greener, cleaner planet for future generations.</p>
        </div>

        <div className="eco-impact-grid">
          <div className="eco-impact-card">
            <h4>500+</h4>
            <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Tons of CO2 Saved</span>
          </div>
          <div className="eco-impact-card">
            <h4>12,000+</h4>
            <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Trees Planted Equivalent</span>
          </div>
          <div className="eco-impact-card">
            <h4>15M+</h4>
            <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Liters of Fuel Saved</span>
          </div>
        </div>
      </section>

      {/* 🛡️ SAFETY & TRUST SECTION */}
      <section className="safety-trust-section container">
        <div className="section-header text-center">
          <h2>Safety First. Always.</h2>
          <p>Your well-being is our top priority. We've built industry-leading safety features into every ride.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Shield size={24} /></div>
            <h3>Verified Community</h3>
            <p>Every driver and rider must pass a stringent ID and liveness check before using the platform.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon"><MapPin size={24} /></div>
            <h3>Live GPS Tracking</h3>
            <p>Share your live route with friends and family. We track every ride from start to finish.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon"><PhoneCall size={24} /></div>
            <h3>24/7 Incident Support</h3>
            <p>Our dedicated safety team is available around the clock to assist you with any emergencies.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon"><Star size={24} /></div>
            <h3>Strict Rating System</h3>
            <p>We monitor post-ride ratings closely to ensure only the best drivers and riders stay active.</p>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Home;
