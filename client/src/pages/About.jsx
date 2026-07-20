import React from 'react';
import { Shield, Users, Leaf } from 'lucide-react';

const About = () => {
  return (
    <div className="container about-page-container animate-slide-left" style={{ paddingTop: '20px', paddingBottom: '90px', position: 'relative' }}>
      
      {/* Decorative blurred background blobs */}
      <div className="contact-blob contact-blob-1" style={{ top: '-100px', left: '-100px', width: '300px', height: '300px' }}></div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, color: 'white', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
            About RideShare
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Building the next generation of shared mobility, making daily commutes seamless, affordable, and eco-friendly.
          </p>
        </div>

        {/* Mission Statement Panel */}
        <div className="glass-panel" style={{ padding: '40px', marginBottom: '56px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>Our Mission</h3>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Welcome to RideShare, the premium cab sharing platform designed to make your daily commute seamless, affordable, and eco-friendly. Built by a dedicated team of developers, our mission is to connect drivers with empty seats to passengers heading the same way.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
            Whether you are an Admin managing the platform, a Driver looking to share your route, or a Rider in need of a quick ride, we provide a unified and secure environment for everyone.
          </p>
        </div>

        {/* Values Section */}
        <div style={{ marginBottom: '56px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '32px', textAlign: 'center' }}>Our Core Pillars</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="pillar-grid">
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
              <div style={{ color: 'var(--electric-blue)', marginBottom: '12px' }}><Shield size={24} /></div>
              <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Absolute Security</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>Cryptographically verified user accounts and sync safeguards on all profiles.</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
              <div style={{ color: 'var(--electric-blue)', marginBottom: '12px' }}><Leaf size={24} /></div>
              <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Eco Mobility</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>Lowering CO₂ emissions and cleaning up urban traffic queues through cost sharing.</p>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><Users size={24} /></div>
              <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Collaborative Economy</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>Transparent peer-to-peer fuel cost splits to save money for all participants.</p>
            </div>
          </div>
        </div>

        {/* Team block */}
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>The Tech Team</h3>
          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 40px auto' }}>
            We are a group of passionate technologists who believe in the power of shared mobility to reduce traffic congestion and carbon footprints. Join us in our journey to revolutionize transportation!
          </p>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar-container">
                <img src="/images/komal.png" alt="Komal Singh" className="team-avatar" />
              </div>
              <h4 className="team-name">Komal Singh</h4>
              <p className="team-role">Frontend Engineer & UI Designer</p>
            </div>

            <div className="team-card">
              <div className="team-avatar-container">
                <img src="/images/anandu.png" alt="Anandu" className="team-avatar" />
              </div>
              <h4 className="team-name">Anandu</h4>
              <p className="team-role">Full Stack Developer & Architect</p>
            </div>

            <div className="team-card">
              <div className="team-avatar-container">
                <img src="/images/mehul.png" alt="Mehul" className="team-avatar" />
              </div>
              <h4 className="team-name">Mehul</h4>
              <p className="team-role">Backend & Database Engineer</p>
            </div>

            <div className="team-card">
              <div className="team-avatar-container">
                <img src="/images/pritam.jpg" alt="Pritam" className="team-avatar" />
              </div>
              <h4 className="team-name">Pritam</h4>
              <p className="team-role">DevOps & System Administrator</p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .pillar-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 32px;
        }
        @media (min-width: 576px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 992px) {
          .team-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .team-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px 16px;
          transition: transform 0.3s ease, background 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .team-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .team-avatar-container {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 16px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .team-card:hover .team-avatar-container {
          border-color: var(--primary);
        }
        .team-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .team-name {
          color: white;
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 6px 0;
        }
        .team-role {
          color: var(--text-secondary);
          font-size: 0.8rem;
          margin: 0;
        }
      `}</style>

    </div>
  );
};

export default About;
