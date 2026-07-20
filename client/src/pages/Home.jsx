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
  Check,
  Search,
  Car,
  Calculator,
  PiggyBank,
  Leaf,
  Compass
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

  // Fare Estimator State
  const [distance, setDistance] = useState(120);
  const [vehicleType, setVehicleType] = useState('Sedan');
  const [passengers, setPassengers] = useState(2);
  const [activeRouteIndex, setActiveRouteIndex] = useState(1);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('uid'));
  }, []);

  const handleSearchClick = (src, dest) => {
    const finalSrc = src || searchSource;
    const finalDest = dest || searchDestination;
    const uid = localStorage.getItem('uid');
    if (!uid) {
      navigate('/auth');
    } else {
      navigate('/user-dashboard', { state: { source: finalSrc, destination: finalDest } });
    }
  };

  // Increment counter every 3 seconds simulating live bookings
  useEffect(() => {
    const timer = setInterval(() => {
      setRideCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Fare Estimator Calculations
  const ratePerKm = vehicleType === 'SUV' ? 7.5 : vehicleType === 'EV' ? 5.2 : 6.0;
  const totalCost = Math.round(distance * ratePerKm);
  const perSeatFare = Math.round(totalCost / (passengers + 1));
  const monthlySavings = Math.round(perSeatFare * 22 * 1.4);
  const co2Saved = Math.round(distance * 0.14);

  const popularRoutes = [
    { from: 'Delhi', to: 'Gurgaon', km: 32, fare: '₹90', time: '45 mins', badge: 'Commuter Hub' },
    { from: 'Mumbai', to: 'Pune', km: 148, fare: '₹350', time: '2.5 hrs', badge: 'Most Popular' },
    { from: 'Bangalore', to: 'Mysore', km: 144, fare: '₹320', time: '2.5 hrs', badge: 'Weekend Getaway' },
    { from: 'Chandigarh', to: 'Shimla', km: 112, fare: '₹280', time: '3.5 hrs', badge: 'Scenic Route' }
  ];

  const handleSelectRoute = (index, route) => {
    setActiveRouteIndex(index);
    setDistance(route.km);
    setSearchSource(route.from);
    setSearchDestination(route.to);
  };

  return (
    <div className="home animate-zoom-fade">
      
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
                <button className="glass-search-btn" onClick={() => handleSearchClick()} aria-label="Search Rides">
                  <span>Search Rides</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🤝 PARTNERS / TRUSTED COMPANIES STRIP */}
      <section className="partners-strip">
        <div className="container">
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '24px' }}>
            Collaborating with leading innovators
          </p>
          <div className="partners-logos-track">
            <div className="partners-logos-scroll">
              <span className="partner-logo-item">TESLA</span>
              <span className="partner-logo-item">GOOGLE</span>
              <span className="partner-logo-item">STRIPE</span>
              <span className="partner-logo-item">APPLE</span>
              <span className="partner-logo-item">UBER</span>
              {/* Duplicate for infinite marquee loop */}
              <span className="partner-logo-item">TESLA</span>
              <span className="partner-logo-item">GOOGLE</span>
              <span className="partner-logo-item">STRIPE</span>
              <span className="partner-logo-item">APPLE</span>
              <span className="partner-logo-item">UBER</span>
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
          <div className="step-card glass-panel step-card-1">
            <div className="step-card-header">
              <div className="step-icon-wrap icon-cyan">
                <Search size={22} />
              </div>
              <span className="step-number-tag tag-cyan">STEP 01</span>
            </div>
            <h3>Publish or Search</h3>
            <p>Drivers enter their route and schedule. Riders search for pickup coordinates along the path.</p>
            <div className="step-card-footer">
              <span className="step-hint">⚡ Instant Route Matching</span>
            </div>
          </div>

          <div className="step-card glass-panel step-card-2">
            <div className="step-card-header">
              <div className="step-icon-wrap icon-purple">
                <Users size={22} />
              </div>
              <span className="step-number-tag tag-purple">STEP 02</span>
            </div>
            <h3>Match & Connect</h3>
            <p>Review verified profiles, rating scores, vehicle specs, and confirm your seat in seconds.</p>
            <div className="step-card-footer">
              <span className="step-hint">🛡️ Identity & UPI Verified</span>
            </div>
          </div>

          <div className="step-card glass-panel step-card-3">
            <div className="step-card-header">
              <div className="step-icon-wrap icon-orange">
                <Car size={22} />
              </div>
              <span className="step-number-tag tag-orange">STEP 03</span>
            </div>
            <h3>Ride & Save</h3>
            <p>Meet at the pickup spot, enjoy a comfortable trip together, and split fuel costs automatically.</p>
            <div className="step-card-footer">
              <span className="step-hint">💰 Save Up To 50% Fare</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🧮 INTERACTIVE FARE ESTIMATOR & POPULAR ROUTES SECTION (WOW REPLACEMENT) */}
      <section className="fare-estimator-section container">
        <div className="estimator-wrapper glass-panel">
          <div className="estimator-grid">
            
            {/* Left Column: Interactive Calculator Form */}
            <div className="estimator-controls">
              <div className="section-pill pill-cyan" style={{ marginBottom: '16px' }}>
                <Calculator size={14} /> Instant Cost Calculator
              </div>
              <h2>Estimate Your Trip Savings</h2>
              <p>Calculate instant fare splits and see how much you save compared to solo cabs.</p>

              {/* Distance Slider */}
              <div className="estimator-input-group">
                <div className="input-group-header">
                  <label>Trip Distance</label>
                  <span className="highlight-val">{distance} km</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="300" 
                  step="5" 
                  value={distance} 
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="custom-range-slider"
                />
                <div className="range-marks">
                  <span>10 km</span>
                  <span>150 km</span>
                  <span>300 km</span>
                </div>
              </div>

              {/* Vehicle Type Selection */}
              <div className="estimator-input-group">
                <label style={{ marginBottom: '10px', display: 'block' }}>Vehicle Category</label>
                <div className="vehicle-selector-row">
                  {['Sedan', 'SUV', 'EV'].map((type) => (
                    <button
                      key={type}
                      className={`type-btn ${vehicleType === type ? 'active' : ''}`}
                      onClick={() => setVehicleType(type)}
                    >
                      {type === 'EV' ? '⚡ ' : type === 'SUV' ? '🚙 ' : '🚗 '}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passengers Count */}
              <div className="estimator-input-group">
                <div className="input-group-header">
                  <label>Sharing Passengers</label>
                  <span className="highlight-val">{passengers} Co-Riders</span>
                </div>
                <div className="passenger-selector-row">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      className={`passenger-btn ${passengers === num ? 'active' : ''}`}
                      onClick={() => setPassengers(num)}
                    >
                      {num} {num === 1 ? 'Person' : 'People'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Savings Calculation Cards */}
            <div className="estimator-results">
              <div className="savings-card-primary">
                <div className="savings-badge">ESTIMATED FARE</div>
                <div className="fare-display-row">
                  <span className="currency-symbol">₹</span>
                  <span className="fare-amount">{perSeatFare}</span>
                  <span className="fare-unit">/ seat</span>
                </div>
                <p className="fare-subnote">Split seamlessly between driver & co-riders</p>
                
                <div className="savings-metrics-grid">
                  <div className="metric-box">
                    <PiggyBank size={18} className="text-orange" />
                    <div>
                      <span className="metric-val">₹{monthlySavings.toLocaleString()}</span>
                      <span className="metric-lbl">Monthly Savings</span>
                    </div>
                  </div>
                  <div className="metric-box">
                    <Leaf size={18} className="text-green" />
                    <div>
                      <span className="metric-val">{co2Saved} kg</span>
                      <span className="metric-lbl">CO₂ Reduced</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-primary w-full btn-glow" 
                  style={{ marginTop: '24px', justifyContent: 'center' }}
                  onClick={() => handleSearchClick(searchSource || 'Delhi', searchDestination || 'Gurgaon')}
                >
                  <span>Book This Shared Ride</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Popular Intercity Routes Bar */}
          <div className="popular-routes-bar">
            <div className="routes-bar-header">
              <div className="routes-bar-title">
                <Compass size={16} className="text-cyan" />
                <span>Top Active Commute Routes</span>
              </div>
              <span className="routes-bar-subtitle">Click to auto-fill trip details</span>
            </div>

            <div className="routes-chip-grid">
              {popularRoutes.map((route, idx) => (
                <div 
                  key={idx} 
                  className={`route-chip ${activeRouteIndex === idx ? 'active' : ''}`}
                  onClick={() => handleSelectRoute(idx, route)}
                >
                  <div className="route-chip-top">
                    <span className="route-names">{route.from} ➔ {route.to}</span>
                    <span className="route-badge-small">{route.badge}</span>
                  </div>
                  <div className="route-chip-bottom">
                    <span>{route.km} km • {route.time}</span>
                    <span className="route-price-tag">{route.fare}/seat</span>
                  </div>
                </div>
              ))}
            </div>
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
              <Link to="/coming-soon" className="btn-store">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="btn-store-icon">
                  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <span style={{ fontSize: '0.55rem', display: 'block', color: '#c1c1c1' }}>Download on the</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, display: 'block', color: 'white', letterSpacing: '-0.2px' }}>App Store</span>
                </div>
              </Link>
              <Link to="/coming-soon" className="btn-store">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466 512" className="btn-store-icon">
                  <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"/>
                  <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"/>
                  <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"/>
                  <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <span style={{ fontSize: '0.52rem', display: 'block', color: '#c1c1c1', letterSpacing: '0.2px' }}>GET IT ON</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, display: 'block', color: 'white', letterSpacing: '-0.2px' }}>Google Play</span>
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
                <Star key={i} size={15} className="star-gold" fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="testimonial-quote">
              "Splitting Chandigarh-Delhi travel costs with other colleagues saved me over ₹4,000 last month. Highly recommended platform!"
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src="/images/komal.png" alt="Komal Singh" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4>Komal Singh</h4>
                <span>Daily Passenger • Phagwara</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="star-rating-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="star-gold" fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="testimonial-quote">
              "Finding verified, polite co-travelers has never been easier. I love the simple interface and prompt support from the team!"
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src="/images/anandu.png" alt="Anandu" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4>Anandu</h4>
                <span>Daily Commuter • Phagwara</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="star-rating-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="star-gold" fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="testimonial-quote">
              "Verifying riders gives me absolute peace of mind. Offering empty seats on my weekend trips pays for my fuel costs easily."
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src="/images/mehul.png" alt="Mehul" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4>Mehul</h4>
                <span>Verified Driver • Phagwara</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card glass-panel">
            <div className="star-rating-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="star-gold" fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="testimonial-quote">
              "No cash arguments, clear dashboard statistics, and eco-friendly cost sharing. The layout is beautiful and simple to navigate."
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src="/images/pritam.jpg" alt="Pritam" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4>Pritam</h4>
                <span>Regular Rider • Phagwara</span>
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
