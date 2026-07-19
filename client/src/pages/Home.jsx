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
              <a href="#playstore" className="btn-store" onClick={(e) => { e.preventDefault(); alert("App Store Link simulated!"); }}>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Get it on</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800 }}>Google Play</span>
                </div>
              </a>
              <a href="#appstore" className="btn-store" onClick={(e) => { e.preventDefault(); alert("App Store Link simulated!"); }}>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Download on the</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800 }}>App Store</span>
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
              <div className="testimonial-avatar">RK</div>
              <div>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Rohan Kapoor</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Daily Passenger</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Verifying riders gives me absolute peace of mind. Offering empty seats on my weekend trips pays for my fuel costs easily."
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">AS</div>
              <div>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Ananya Sharma</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified Driver</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "No cash arguments, clear dashboard statistics, and eco-friendly cost sharing. The layout is beautiful and simple to navigate."
            </p>
            <div className="testimonial-profile">
              <div className="testimonial-avatar">MD</div>
              <div>
                <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Manish Das</strong>
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
