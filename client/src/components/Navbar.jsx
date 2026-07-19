import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, 
  Menu, 
  X, 
  LogOut, 
  Bookmark, 
  Mail,
  HelpCircle,
  MapPin,
  Sun,
  Moon
} from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const getInitialTheme = () => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch (err) {
      return 'dark';
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.documentElement.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.documentElement.classList.remove('light-theme');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (err) {
      console.warn('localStorage access blocked:', err);
    }
  }, [theme]);

  const toggleTheme = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userRole');
      localStorage.removeItem('uid');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPhoto');
      setShowProfileMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const role = localStorage.getItem('userRole');
  const uid = localStorage.getItem('uid');
  const storedName = localStorage.getItem('userName');
  const userName = storedName || (user ? user.displayName || user.email : 'User');
  const userPhoto = localStorage.getItem('userPhoto') || (user ? user.photoURL : null);
  const isLoggedIn = user || uid;

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container nav-container">
        
        {/* Startup Brand Identity Logo */}
        <Link to="/" className="nav-logo-custom" onClick={handleLinkClick}>
          <div className="nav-logo-brand-block">
            <div className="nav-logo-main-row">
              <div className="nav-logo-graphic" style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '70px', height: '24px' }}>
                <svg width="70" height="24" viewBox="0 0 70 24" fill="none" style={{ overflow: 'visible' }}>
                  <path d="M 6,18 Q 35,4 64,18" stroke="url(#logoRouteGrad)" strokeWidth="2.5" strokeDasharray="3 3" />
                  <defs>
                    <linearGradient id="logoRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--electric-blue)" />
                      <stop offset="50%" stopColor="var(--vibrant-cyan)" />
                      <stop offset="100%" stopColor="var(--orange-accent)" />
                    </linearGradient>
                  </defs>
                </svg>
                <Car size={16} className="logo-vector-car" style={{ position: 'absolute', left: '0px', bottom: '-2px', color: 'var(--electric-blue)' }} />
                <MapPin size={14} className="logo-vector-pin" style={{ position: 'absolute', right: '0px', bottom: '-4px', color: 'var(--orange-accent)' }} />
              </div>
              <span className="nav-logo-text">RideShare</span>
            </div>
            <span className="nav-logo-tagline">Your Journey, Shared Smarter.</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-menu">
          <Link to="/" className={`nav-link-custom ${isActive('/')}`} onClick={handleLinkClick}>Home</Link>
          <Link to="/about" className={`nav-link-custom ${isActive('/about')}`} onClick={handleLinkClick}>About</Link>
          
          {/* Find Ride: Redirect to /auth if not logged in */}
          <Link 
            to={isLoggedIn ? "/user-dashboard" : "/auth"} 
            className={`nav-link-custom ${isActive('/user-dashboard')}`} 
            onClick={handleLinkClick}
          >
            Find Ride
          </Link>
          
          {/* Offer Ride: Only visible to Drivers when logged in */}
          {isLoggedIn && role === 'Driver' && (
            <Link to="/driver-dashboard" className={`nav-link-custom ${isActive('/driver-dashboard')}`} onClick={handleLinkClick}>Offer Ride</Link>
          )}

          <Link to="/contact" className={`nav-link-custom ${isActive('/contact')}`} onClick={handleLinkClick}>Contact</Link>
          
          {isLoggedIn ? (
            <div className="nav-profile-container" ref={profileRef}>
              <div 
                className="user-profile-nav" 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {userPhoto ? (
                  <img 
                    src={userPhoto} 
                    alt={userName} 
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--electric-blue)' }} 
                    referrerPolicy="no-referrer" 
                  />
                ) : (
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--electric-blue), var(--vibrant-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1rem', border: '2px solid rgba(255,255,255,0.1)' }}>
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="dropdown-user-header">
                    <span className="dropdown-user-name">{userName}</span>
                    <span className="dropdown-user-role">{role || 'Passenger'}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  
                  {role === 'Driver' ? (
                    <Link to="/driver-dashboard" className="dropdown-link" onClick={handleLinkClick}>
                      <Car size={16} />
                      <span>Driver Console</span>
                    </Link>
                  ) : (
                    <Link to="/user-dashboard" className="dropdown-link" onClick={handleLinkClick}>
                      <Bookmark size={16} />
                      <span>Rider Dashboard</span>
                    </Link>
                  )}

                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-logout-btn">
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="nav-cta-btn" onClick={handleLinkClick}>
              <span>Login / Signup</span>
            </Link>
          )}

          {/* Theme Toggle Button */}
          <button type="button" onClick={toggleTheme} className="theme-toggle-btn" title="Toggle theme" style={{ marginLeft: '8px' }}>
            {theme === 'dark' ? <Sun size={18} style={{ pointerEvents: 'none' }} /> : <Moon size={18} style={{ pointerEvents: 'none' }} />}
          </button>
        </div>

        {/* Mobile Menu Hamburg Menu toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} title="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Drawer layout for Responsive Mobile view */}
      {isOpen && (
        <>
          <div className="mobile-drawer-backdrop" onClick={() => setIsOpen(false)}></div>
          <div className="mobile-sidebar-drawer">
            <div className="mobile-drawer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <span className="mobile-drawer-logo">RideShare</span>
              <button className="mobile-drawer-close" onClick={() => setIsOpen(false)} title="Close menu">
                <X size={24} />
              </button>
            </div>

            <div className="mobile-drawer-links">
              <Link to="/" className={`nav-link-custom ${isActive('/')}`} onClick={handleLinkClick}>Home</Link>
              <Link to="/about" className={`nav-link-custom ${isActive('/about')}`} onClick={handleLinkClick}>About</Link>
              
              {/* Find Ride: Redirect to /auth if not logged in */}
              <Link 
                to={isLoggedIn ? "/user-dashboard" : "/auth"} 
                className={`nav-link-custom ${isActive('/user-dashboard')}`} 
                onClick={handleLinkClick}
              >
                Find Ride
              </Link>
              
              {/* Offer Ride: Only visible to Drivers when logged in */}
              {isLoggedIn && role === 'Driver' && (
                <Link to="/driver-dashboard" className={`nav-link-custom ${isActive('/driver-dashboard')}`} onClick={handleLinkClick}>Offer Ride</Link>
              )}

              <Link to="/contact" className={`nav-link-custom ${isActive('/contact')}`} onClick={handleLinkClick}>Contact</Link>
              
              {/* Mobile Theme Toggle Button */}
              <button type="button" onClick={toggleTheme} className="theme-toggle-btn mobile-theme-btn" title="Toggle theme">
                {theme === 'dark' ? <Sun size={18} style={{ pointerEvents: 'none' }} /> : <Moon size={18} style={{ pointerEvents: 'none' }} />}
                <span>{theme === 'dark' ? 'Bright Theme' : 'Dark Theme'}</span>
              </button>

              {isLoggedIn ? (
                <>
                  <div className="dropdown-divider"></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px' }}>
                    {userPhoto ? (
                      <img src={userPhoto} alt={userName} style={{ width: '38px', height: '38px', borderRadius: '50%' }} />
                    ) : (
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>{userName}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{role}</span>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="dropdown-logout-btn" style={{ padding: '12px 16px' }}>
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <Link to="/auth" className="nav-cta-btn w-full mt-4" style={{ justifyContent: 'center' }} onClick={handleLinkClick}>
                  <span>Login / Signup</span>
                </Link>
              )}
            </div>

            <div className="mobile-drawer-footer">
              <div className="mobile-socials-row">
                <a href="mailto:support@rideshare.com" className="mobile-social-icon"><Mail size={20} /></a>
                <a href="#help" className="mobile-social-icon" onClick={() => { setIsOpen(false); alert("Help Center loaded!"); }}><HelpCircle size={20} /></a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
