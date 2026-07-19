import React from 'react';
import { 
  Rocket, 
  Globe, 
  Lightbulb, 
  BookOpen, 
  Users, 
  Laptop,
  Code,
  Server,
  PenTool,
  Smartphone,
  Megaphone,
  Mail,
  ArrowRight
} from 'lucide-react';
import './Careers.css';

const Careers = () => {
  return (
    <div className="careers-page animate-fade-in">
      
      {/* 🔮 Background Orbs */}
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>

      {/* Hero Section */}
      <section className="careers-hero container">
        <div className="careers-hero-content text-center">
          <div className="badge-pill">Careers at CabShare</div>
          <h1 className="gradient-text">Join Our Mission</h1>
          <h2 className="subtitle">Build the Future of Smarter Transportation</h2>
          <p className="hero-description">
            At CabShare, we're transforming daily commuting by making rides affordable, sustainable, and community-driven. Every line of code, every design decision, and every customer interaction helps thousands of people travel smarter.
          </p>
          <p className="hero-description text-highlight">
            If you're passionate about solving real-world problems with technology, we'd love to have you on our team.
          </p>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="container careers-section">
        <div className="section-header text-center careers-section-header">
          <h2>Why Work With Us?</h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card glass-panel">
            <div className="benefit-icon"><Rocket size={24} /></div>
            <h3>Fast-paced startup environment</h3>
          </div>
          <div className="benefit-card glass-panel">
            <div className="benefit-icon"><Globe size={24} /></div>
            <h3>Work on products impacting thousands</h3>
          </div>
          <div className="benefit-card glass-panel">
            <div className="benefit-icon"><Lightbulb size={24} /></div>
            <h3>Freedom to innovate & own ideas</h3>
          </div>
          <div className="benefit-card glass-panel">
            <div className="benefit-icon"><BookOpen size={24} /></div>
            <h3>Continuous learning & growth</h3>
          </div>
          <div className="benefit-card glass-panel">
            <div className="benefit-icon"><Users size={24} /></div>
            <h3>Collaborative & inclusive culture</h3>
          </div>
          <div className="benefit-card glass-panel">
            <div className="benefit-icon"><Laptop size={24} /></div>
            <h3>Flexible work environment</h3>
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="container careers-section">
        <div className="section-header text-center careers-section-header">
          <h2>Current Openings</h2>
        </div>
        <div className="openings-list">
          
          <div className="job-card glass-panel">
            <div className="job-info">
              <div className="job-icon"><Code size={24} /></div>
              <div>
                <h3>Frontend Developer</h3>
                <p>Build beautiful and responsive user interfaces using React.</p>
              </div>
            </div>
            <button className="apply-btn">Apply Now <ArrowRight size={16} /></button>
          </div>

          <div className="job-card glass-panel">
            <div className="job-info">
              <div className="job-icon"><Server size={24} /></div>
              <div>
                <h3>Backend Developer</h3>
                <p>Develop scalable APIs and cloud-based services.</p>
              </div>
            </div>
            <button className="apply-btn">Apply Now <ArrowRight size={16} /></button>
          </div>

          <div className="job-card glass-panel">
            <div className="job-info">
              <div className="job-icon"><PenTool size={24} /></div>
              <div>
                <h3>UI/UX Designer</h3>
                <p>Design intuitive experiences for riders and drivers.</p>
              </div>
            </div>
            <button className="apply-btn">Apply Now <ArrowRight size={16} /></button>
          </div>

          <div className="job-card glass-panel">
            <div className="job-info">
              <div className="job-icon"><Smartphone size={24} /></div>
              <div>
                <h3>Mobile Developer</h3>
                <p>Create seamless cross-platform applications.</p>
              </div>
            </div>
            <button className="apply-btn">Apply Now <ArrowRight size={16} /></button>
          </div>

          <div className="job-card glass-panel">
            <div className="job-info">
              <div className="job-icon"><Megaphone size={24} /></div>
              <div>
                <h3>Marketing Executive</h3>
                <p>Help grow our community and expand our reach.</p>
              </div>
            </div>
            <button className="apply-btn">Apply Now <ArrowRight size={16} /></button>
          </div>

        </div>
      </section>

      {/* Open Application Section */}
      <section className="container careers-section" style={{ paddingBottom: '120px' }}>
        <div className="general-application-card glass-panel text-center">
          <h2>Don't See Your Role?</h2>
          <p>We're always looking for talented individuals to join our mission.</p>
          <a href="mailto:careers@cabshare.com" className="email-pill">
            <Mail size={18} /> careers@cabshare.com
          </a>
        </div>
      </section>

    </div>
  );
};

export default Careers;
