import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Shield, 
  CreditCard, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { MobileAppIllustration } from '../components/Illustrations';
import './Home.css';

const Home = () => {
  // Live ride counter state starting at 2347
  const [rideCount, setRideCount] = useState(2347);
  // Active step state for the interactive route timeline
  const [activeStep, setActiveStep] = useState(0);

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
    <div className="home animate-zoom-fade">
      
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
              <Link to="/auth" className="btn btn-primary">
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>

            {/* Interactive Route Timeline Section */}
            <div className="timeline-interactive-box">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', marginBottom: '20px' }}>Interactive Journey Flow</h3>
              <div className="timeline-nav-row">
                <div className="timeline-bar-line"></div>
                <div 
                  className="timeline-bar-fill" 
                  style={{ width: `${activeStep * 40}%` }}
                ></div>

                {timelineSteps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`timeline-node-step ${activeStep === idx ? 'active' : ''}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div className="timeline-node-circle">{idx + 1}</div>
                    <span className="timeline-node-lbl">Step {idx + 1}</span>
                  </div>
                ))}
              </div>

              <div className="timeline-detail-card">
                <strong style={{ display: 'block', color: 'white', marginBottom: '6px', fontSize: '0.95rem' }}>
                  {timelineSteps[activeStep].title}
                </strong>
                <span>{timelineSteps[activeStep].desc}</span>
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
      <section className="container" style={{ marginBottom: '100px' }}>
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

      {/* 🌱 ECO-FRIENDLY ENVIRONMENTAL SAVINGS SECTION */}
      <section className="eco-friendly-section container">
        <div className="glass-panel" style={{ padding: '48px 40px' }}>
          <div className="section-header text-center" style={{ marginBottom: '24px' }}>
            <h2 style={{ color: 'var(--vibrant-cyan)' }}>Our Eco-Friendly Impact</h2>
            <p>By traveling together, we save fuel and restore clean air to our cities.</p>
          </div>

          <div className="eco-impact-grid">
            <div className="eco-impact-card">
              <h4>12,450 kg</h4>
              <strong style={{ display: 'block', color: 'white', margin: '6px 0' }}>CO₂ Emissions Saved</strong>
              <p style={{ fontSize: '0.85rem' }}>Equal to planting over 500 mature trees in urban cities.</p>
            </div>
            
            <div className="eco-impact-card">
              <h4>4,890 Liters</h4>
              <strong style={{ display: 'block', color: 'white', margin: '6px 0' }}>Fuel Conserved</strong>
              <p style={{ fontSize: '0.85rem' }}>Reducing fuel usage and lowering travel costs for everyone.</p>
            </div>

            <div className="eco-impact-card">
              <h4>25,000+</h4>
              <strong style={{ display: 'block', color: 'white', margin: '6px 0' }}>Shared Kilometers</strong>
              <p style={{ fontSize: '0.85rem' }}>Shortening traffic queues and cleaning up main roads.</p>
            </div>
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
              <a href="#appstore" className="btn-store" onClick={(e) => { e.preventDefault(); alert("App Store Link simulated!"); }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="btn-store-icon">
                  <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <span style={{ fontSize: '0.55rem', display: 'block', color: '#c1c1c1' }}>Download on the</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, display: 'block', color: 'white', letterSpacing: '-0.2px' }}>App Store</span>
                </div>
              </a>
              <a href="#playstore" className="btn-store" onClick={(e) => { e.preventDefault(); alert("App Store Link simulated!"); }}>
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
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MobileAppIllustration />
          </div>
        </div>
      </section>

      {/* 🗣 CLIENT TESTIMONIALS */}
      <section className="testimonials-section container">
        <div className="section-header text-center">
          <h2>Loved by Travelers</h2>
          <p>Read what our riders and drivers say about the RideShare experience.</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Splitting Chandigarh-Delhi travel costs with other colleagues saved me over ₹4,000 last month. Highly recommended platform!"
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src="/images/komal.png" alt="Komal Singh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Komal Singh</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Daily Passenger</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Finding verified, polite co-travelers has never been easier. I love the simple interface and prompt support from the team!"
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src="/images/anandu.png" alt="Anandu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Anandu</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Daily Commuter</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Verifying riders gives me absolute peace of mind. Offering empty seats on my weekend trips pays for my fuel costs easily."
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src="/images/mehul.png" alt="Mehul" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Mehul</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified Driver</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "No cash arguments, clear dashboard statistics, and eco-friendly cost sharing. The layout is beautiful and simple to navigate."
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">
                <img src="/images/pritam.jpg" alt="Pritam" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Pritam</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Regular Rider</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
