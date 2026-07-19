import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Shield, 
  CreditCard, 
  Clock, 
  ArrowRight,
  PhoneCall,
  Star,
  Zap,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Award,
  Navigation,
  Check
} from 'lucide-react';
import { MobileAppIllustration } from '../components/Illustrations';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  
  // Live ride counter state starting at 2347
  const [rideCount, setRideCount] = useState(2347);

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

  return (
    <div className="home animate-fade-in">
      
      {/* 🔮 Animated Floating Ambient Orbs */}
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>
      <div className="moving-orb orb-3"></div>
      
      {/* 🚀 HERO SECTION */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            
            {/* Live Counter & Badge Pill */}
            <div className="hero-badge-group">
              <div className="live-counter-pill">
                <div className="pulse-dot-cyan"></div>
                <span>🚗 {rideCount.toLocaleString()} rides completed today</span>
              </div>
              <div className="hero-tag-badge">
                <Sparkles size={13} className="text-cyan" />
                <span>Next-Gen Ride Sharing</span>
              </div>
            </div>

            <h1 className="hero-heading">
              Share the journey, <br/>
              <span className="gradient-text hero-gradient-glow">split the cost.</span>
            </h1>
            
            <p className="hero-subtext">
              Connect with verified drivers heading your way. Enjoy a premium, safe, and comfortable ride sharing experience built on instant collaboration and transparent pricing.
            </p>
            
            <div className="hero-actions">
              {isLoggedIn ? (
                <Link to="/user-dashboard" className="btn btn-primary btn-glow">
                  <span>Go to Dashboard</span>
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <Link to="/auth" className="btn btn-primary btn-glow">
                  <span>Get Started Free</span>
                  <ArrowRight size={18} />
                </Link>
              )}
              <Link to="/about" className="btn btn-secondary glass-btn">
                <span>Learn How It Works</span>
              </Link>
            </div>

            {/* Quick Hero Stats Strip */}
            <div className="hero-stats-strip">
              <div className="hero-stat-item">
                <div className="hero-stat-icon"><Users size={16} /></div>
                <div className="hero-stat-info">
                  <span className="hero-stat-value">50,000+</span>
                  <span className="hero-stat-label">Active Commuters</span>
                </div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <div className="hero-stat-icon text-orange"><Star size={16} /></div>
                <div className="hero-stat-info">
                  <span className="hero-stat-value">4.9 / 5.0</span>
                  <span className="hero-stat-label">User Rating</span>
                </div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <div className="hero-stat-icon text-cyan"><Shield size={16} /></div>
                <div className="hero-stat-info">
                  <span className="hero-stat-value">100%</span>
                  <span className="hero-stat-label">Verified Profiles</span>
                </div>
              </div>
            </div>

            {/* 3D Dashboard Mockup Preview */}
            <div className="dashboard-mockup-3d">
              {/* Floating Tech Chips around Mockup */}
              <div className="floating-chip chip-left">
                <CheckCircle2 size={14} className="text-cyan" />
                <span>Verified Match Found</span>
              </div>
              <div className="floating-chip chip-right">
                <Zap size={14} className="text-orange" />
                <span>Save ~50% Fare</span>
              </div>

              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-search">
                  <Navigation size={12} className="text-cyan" />
                  <span className="mockup-url-text">rideshare.app/live-matching</span>
                </div>
                <div className="mockup-badge">LIVE</div>
              </div>
              
              <div className="mockup-body">
                <div className="mockup-sidebar">
                  <div className="mockup-sidebar-item active"></div>
                  <div className="mockup-sidebar-item"></div>
                  <div className="mockup-sidebar-item"></div>
                </div>
                <div className="mockup-main">
                  <div className="mockup-card">
                    <div className="mockup-card-header">
                      <div className="mockup-card-avatar"></div>
                      <div className="mockup-card-title"></div>
                    </div>
                    <div className="mockup-card-line"></div>
                    <div className="mockup-card-line w-75"></div>
                  </div>
                  <div className="mockup-card">
                    <div className="mockup-card-header">
                      <div className="mockup-card-avatar orange"></div>
                      <div className="mockup-card-title"></div>
                    </div>
                    <div className="mockup-card-line"></div>
                    <div className="mockup-card-line w-50"></div>
                  </div>
                </div>
              </div>
              
              {/* Glassmorphism Quick Search Box Overlay */}
              <div className="quick-search-glass">
                <div className="glass-input-wrapper">
                  <div className="glass-input-label">
                    <MapPin size={12} className="inline-icon" /> Leaving from
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Pickup City" 
                    className="glass-input-clean" 
                    value={searchSource}
                    onChange={(e) => setSearchSource(e.target.value)}
                  />
                </div>
                <div className="glass-input-divider"></div>
                <div className="glass-input-wrapper">
                  <div className="glass-input-label">
                    <MapPin size={12} className="inline-icon text-cyan" /> Going to
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Destination" 
                    className="glass-input-clean" 
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                  />
                </div>
                <button className="glass-search-btn" onClick={handleSearchClick} aria-label="Search Rides">
                  <span>Search Rides</span>
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
          <div className="section-pill">
            <Zap size={14} /> Key Advantages
          </div>
          <h2>Why Choose RideShare?</h2>
          <p>Experience the next generation of collaborative commuting, designed for convenience, safety, and savings.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card glass-panel highlight-hover">
            <div className="feature-icon icon-cyan"><MapPin size={24} /></div>
            <h3>Smart Route Matching</h3>
            <p>Our intelligent algorithm matches you with drivers on your exact route to minimize detours and travel time.</p>
            <div className="feature-card-glow"></div>
          </div>
          
          <div className="feature-card glass-panel highlight-hover">
            <div className="feature-icon icon-purple"><Shield size={24} /></div>
            <h3>100% Verified Community</h3>
            <p>Every driver and passenger undergoes multi-level identity verification for complete peace of mind.</p>
            <div className="feature-card-glow"></div>
          </div>
          
          <div className="feature-card glass-panel highlight-hover">
            <div className="feature-icon icon-orange"><CreditCard size={24} /></div>
            <h3>Instant Cashless Payments</h3>
            <p>Seamless, transparent, and secure digital split payments directly inside the app with zero hidden fees.</p>
            <div className="feature-card-glow"></div>
          </div>
          
          <div className="feature-card glass-panel highlight-hover">
            <div className="feature-icon icon-blue"><Clock size={24} /></div>
            <h3>Real-time Live Updates</h3>
            <p>Communicate instantly with your matched driver, view live GPS updates, and coordinate pickups seamlessly.</p>
            <div className="feature-card-glow"></div>
          </div>
        </div>
      </section>

      {/* ⚙️ HOW IT WORKS SECTION */}
      <section className="how-it-works-section container">
        <div className="section-header text-center">
          <div className="section-pill">
            <TrendingUp size={14} /> Simple Process
          </div>
          <h2>How RideShare Works</h2>
          <p>Three simple steps to start saving money and cutting down traffic congestion.</p>
        </div>

        <div className="how-it-works-grid">
          <div className="step-card glass-panel">
            <div className="step-number-badge">1</div>
            <h3>Publish or Search</h3>
            <p>Drivers enter their route and schedule. Riders search for pickup coordinates along the path.</p>
          </div>

          <div className="step-card glass-panel">
            <div className="step-number-badge">2</div>
            <h3>Match & Connect</h3>
            <p>Review verified profiles, rating scores, vehicle specs, and confirm your seat in seconds.</p>
          </div>

          <div className="step-card glass-panel">
            <div className="step-number-badge">3</div>
            <h3>Ride & Save</h3>
            <p>Meet at the pickup spot, enjoy a comfortable trip together, and split fuel costs automatically.</p>
          </div>
        </div>
      </section>

      {/* 📱 DOWNLOAD APP SECTION */}
      <section className="download-app-section container">
        <div className="download-split">
          <div className="download-text-content">
            <div className="section-pill pill-cyan" style={{ marginBottom: '16px' }}>
              <Sparkles size={14} /> Mobile App Available
            </div>
            <h2>Take RideShare Everywhere</h2>
            <p>
              Download our mobile app to track matching drivers on-the-go, receive instant push notifications, view real-time maps, and manage secure digital payments effortlessly.
            </p>
            
            <div className="app-feature-list">
              <div className="app-feature-item">
                <Check size={16} className="text-cyan" />
                <span>Live GPS Driver Tracking</span>
              </div>
              <div className="app-feature-item">
                <Check size={16} className="text-cyan" />
                <span>Instant Push Alerts for Bookings</span>
              </div>
              <div className="app-feature-item">
                <Check size={16} className="text-cyan" />
                <span>One-Tap UPI & Card Payments</span>
              </div>
            </div>

            <div className="download-badges-row">
              <Link to="/coming-soon" className="btn-store glow-on-hover">
                <div style={{ textAlign: 'left' }}>
                  <span className="store-sub">Get it on</span>
                  <span className="store-title">Google Play</span>
                </div>
              </Link>
              <Link to="/coming-soon" className="btn-store glow-on-hover">
                <div style={{ textAlign: 'left' }}>
                  <span className="store-sub">Download on the</span>
                  <span className="store-title">App Store</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="download-illustration-wrap">
            <MobileAppIllustration />
          </div>
        </div>
      </section>

      {/* 💬 TESTIMONIALS SECTION */}
      <section className="testimonials-section container">
        <div className="section-header text-center">
          <div className="section-pill">
            <Award size={14} /> Loved By Thousands
          </div>
          <h2>Loved by Commuters Everywhere</h2>
          <p>Join thousands of happy riders and drivers saving time and money daily across the city.</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card glass-panel">
            <div className="star-rating-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-gold" fill="#F59E0B" />
              ))}
            </div>
            <div className="testimonial-quote">
              "RideShare completely changed how I commute to work. I'm saving almost ₹4,000 a month on fuel, and I've made great friends along the way!"
            </div>
            <div className="testimonial-profile">
              <div className="testimonial-avatar avatar-cyan">A</div>
              <div>
                <h4>Aarav Patel</h4>
                <span>Daily Commuter • Bangalore</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="star-rating-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-gold" fill="#F59E0B" />
              ))}
            </div>
            <div className="testimonial-quote">
              "As a driver, I love the verified profiles. It gives complete safety knowing who is riding with me. The instant payments are smooth and reliable."
            </div>
            <div className="testimonial-profile">
              <div className="testimonial-avatar avatar-orange">N</div>
              <div>
                <h4>Neha Sharma</h4>
                <span>Verified Driver • Mumbai</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="star-rating-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-gold" fill="#F59E0B" />
              ))}
            </div>
            <div className="testimonial-quote">
              "The live map tracking is flawless! It feels like booking a luxury cab, but at half the price. Highly recommended for weekend intercity travel."
            </div>
            <div className="testimonial-profile">
              <div className="testimonial-avatar avatar-blue">R</div>
              <div>
                <h4>Rohan Desai</h4>
                <span>Weekend Traveler • Pune</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌿 ECO-FRIENDLY IMPACT SECTION */}
      <section className="eco-friendly-section container">
        <div className="eco-banner-card glass-panel">
          <div className="section-header text-center" style={{ marginBottom: '32px' }}>
            <div className="section-pill pill-cyan">
              🌿 Environmental Commitment
            </div>
            <h2>Our Environmental Impact</h2>
            <p>Every shared ride contributes directly to a greener, cleaner planet for future generations.</p>
          </div>

          <div className="eco-impact-grid">
            <div className="eco-impact-card">
              <h4>500+</h4>
              <span>Tons of CO₂ Emissions Saved</span>
            </div>
            <div className="eco-impact-card">
              <h4>12,000+</h4>
              <span>Trees Planted Equivalent</span>
            </div>
            <div className="eco-impact-card">
              <h4>15M+</h4>
              <span>Liters of Fuel Preserved</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ SAFETY & TRUST SECTION */}
      <section className="safety-trust-section container" style={{ marginBottom: '80px' }}>
        <div className="section-header text-center">
          <div className="section-pill">
            <Shield size={14} /> Uncompromising Safety
          </div>
          <h2>Safety First. Always.</h2>
          <p>Your well-being is our highest priority. We've built industry-leading security protocols into every trip.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon icon-purple"><Shield size={24} /></div>
            <h3>Verified Identity Checks</h3>
            <p>Every driver and rider completes mandatory ID checks and liveness verification before booking.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon icon-cyan"><MapPin size={24} /></div>
            <h3>Live GPS Tracking</h3>
            <p>Share your trip progress in real-time with family or emergency contacts with a single tap.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon icon-blue"><PhoneCall size={24} /></div>
            <h3>24/7 Incident Support</h3>
            <p>Our rapid-response safety team is on standby 24/7 to assist with any journey emergency.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon icon-orange"><Star size={24} /></div>
            <h3>Strict Mutual Ratings</h3>
            <p>Continuous feedback monitoring ensures high-quality standards and respectful behavior on every ride.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
