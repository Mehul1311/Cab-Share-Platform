import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import './StaticPages.css';

const Blog = () => {
  return (
    <div className="static-page animate-fade-in">
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>
      
      <div className="container">
        <div className="static-hero">
          <div className="badge-pill mb-4" style={{ margin: '0 auto 16px' }}>CabShare Insights</div>
          <h1 className="static-title">The CabShare Blog</h1>
          <p className="static-subtitle">
            News, stories, and tips for smarter commuting and greener living.
          </p>
        </div>

        <div className="static-grid">
          {/* Post 1 */}
          <div className="static-grid-card glass-panel">
            <div className="static-card-icon" style={{ padding: '0', background: 'transparent' }}>
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=300&h=200" alt="Electric vehicle" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> 5 min read</span>
            </div>
            <h3>The Future of Urban Mobility</h3>
            <p>How ride-sharing and electric vehicles are reshaping the landscape of our major cities.</p>
            <a href="#read" className="static-link-btn" onClick={e => e.preventDefault()}>Read Article <ArrowRight size={16} /></a>
          </div>

          {/* Post 2 */}
          <div className="static-grid-card glass-panel">
            <div className="static-card-icon" style={{ padding: '0', background: 'transparent' }}>
              <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=300&h=200" alt="Friends laughing" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> 3 min read</span>
            </div>
            <h3>Carpooling Etiquette 101</h3>
            <p>The golden rules of sharing a ride: from music choices to managing pick-up times.</p>
            <a href="#read" className="static-link-btn" onClick={e => e.preventDefault()}>Read Article <ArrowRight size={16} /></a>
          </div>

          {/* Post 3 */}
          <div className="static-grid-card glass-panel">
            <div className="static-card-icon" style={{ padding: '0', background: 'transparent' }}>
              <img src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&q=80&w=300&h=200" alt="Forest" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> 6 min read</span>
            </div>
            <h3>Understanding Your Carbon Footprint</h3>
            <p>Learn how to calculate and offset your daily commute emissions with practical steps.</p>
            <a href="#read" className="static-link-btn" onClick={e => e.preventDefault()}>Read Article <ArrowRight size={16} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
