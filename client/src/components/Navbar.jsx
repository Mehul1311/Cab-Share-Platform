import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, 
  Menu, 
  X, 
  LogOut, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Globe, 
  User, 
  Bookmark, 
  Settings, 
  Mail,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [lang, setLang] = useState('EN');

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      alert(`Searching routes for: "${searchVal}"`);
      setSearchVal('');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    alert("Theme mode toggled! (Simulated)");
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
        
        {/* Startup Brand Logo */}
        <Link to="/" className="nav-logo-custom" onClick={() => setIsOpen(false)}>
          <div className="nav-logo-graphic">
            <Car size={24} className="logo-vector-car" />
            <div className="logo-vector-route"></div>
            <MapPin size={18} className="logo-vector-pin" />
          </div>
          <span className="nav-logo-text">RideShare</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-menu">
          <Link to="/" className={`nav-link-custom ${isActive('/')}`}>Home</Link>
          <Link to="/about" className={`nav-link-custom ${isActive('/about')}`}>About</Link>
          <Link to="/user-dashboard" className={`nav-link-custom ${isActive('/user-dashboard')}`}>Find Ride</Link>
          <Link to="/driver-dashboard" className={`nav-link-custom ${isActive('/driver-dashboard')}`}>Offer Ride</Link>
          <Link to="/query" className={`nav-link-custom ${isActive('/query')}`}>Query</Link>
          <Link to="/contact" className={`nav-link-custom ${isActive('/contact')}`}>Contact</Link>
          
          {/* Expandable Search Button */}
          <form onSubmit={handleSearchSubmit} className="nav-search-wrapper">
            <Search size={16} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search routes..." 
              className="nav-search-input"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </form>

          {/* Dark Mode toggle */}
          <button className="nav-util-btn" onClick={toggleDarkMode} title="Toggle Theme">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={16} color="var(--text-secondary)" />
            <select 
              className="lang-select-custom" 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="EN">EN</option>
              <option value="ES">ES</option>
              <option value="FR">FR</option>
            </select>
          </div>

          {/* Notification Bell */}
          <div className="nav-profile-container" ref={notifRef}>
            <button 
              className="nav-bell-btn" 
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={18} />
              <span className="bell-badge">3</span>
            </button>

            {showNotifications && (
              <div className="bell-dropdown">
                <div className="bell-dropdown-header">System Notifications</div>
                <div className="bell-notif-item">🚗 Driver Alex matching your route now active!</div>
                <div className="bell-notif-item">💳 Payment verified successfully. Receipt synced.</div>
                <div className="bell-notif-item">✨ Welcome back! 12 new shared rides posted today.</div>
              </div>
            )}
          </div>

          {/* Profile Section or Login CTA */}
          {isLoggedIn ? (
            <div className="nav-profile-container" ref={profileRef}>
              <div 
                className="user-profile-nav" 
                style={{ cursor: 'pointer' }}
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

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="dropdown-user-header">
                    <span className="dropdown-user-name">{userName}</span>
                    <span className="dropdown-user-role">{role || 'Rider'} Account</span>
                  </div>
                  
                  <Link to={role === 'Admin' ? '/admin-dashboard' : role === 'Driver' ? '/driver-dashboard' : '/user-dashboard'} className="dropdown-link" onClick={() => setShowProfileMenu(false)}>
                    <User size={16} />
                    <span>My Dashboard</span>
                  </Link>
                  
                  <Link to="/user-dashboard" className="dropdown-link" onClick={() => setShowProfileMenu(false)}>
                    <Bookmark size={16} />
                    <span>My Bookings</span>
                  </Link>

                  <div className="dropdown-link" onClick={() => { alert("Settings page simulated!"); setShowProfileMenu(false); }}>
                    <Settings size={16} />
                    <span>Settings</span>
                  </div>

                  <div className="dropdown-divider"></div>
                  
                  <button onClick={handleLogout} className="dropdown-logout-btn">
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="nav-cta-btn">
              <span>Login / Signup</span>
              <ArrowRight size={16} style={{ marginTop: '1px' }} />
            </Link>
          )}
        </div>

        {/* Mobile controls & hamburger button */}
        <div className="mobile-controls">
          {/* Notification bell on mobile */}
          {isLoggedIn && (
            <div className="nav-profile-container" ref={notifRef}>
              <button className="nav-bell-btn" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={18} />
                <span className="bell-badge">3</span>
              </button>
              {showNotifications && (
                <div className="bell-dropdown" style={{ right: '-50px' }}>
                  <div className="bell-dropdown-header">Notifications</div>
                  <div className="bell-notif-item">🚗 Driver matching Chandigarh is active!</div>
                  <div className="bell-notif-item">💳 Payment verified. Receipt synced.</div>
                </div>
              )}
            </div>
          )}

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Drawer Sidebar */}
      {isOpen && (
        <div className="mobile-sidebar-drawer">
          <div className="mobile-drawer-header">
            <button className="mobile-drawer-close" onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <div className="mobile-drawer-links">
            <Link to="/" className={`nav-link-custom ${isActive('/')}`} onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className={`nav-link-custom ${isActive('/about')}`} onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/user-dashboard" className={`nav-link-custom ${isActive('/user-dashboard')}`} onClick={() => setIsOpen(false)}>Find Ride</Link>
            <Link to="/driver-dashboard" className={`nav-link-custom ${isActive('/driver-dashboard')}`} onClick={() => setIsOpen(false)}>Offer Ride</Link>
            <Link to="/query" className={`nav-link-custom ${isActive('/query')}`} onClick={() => setIsOpen(false)}>Query</Link>
            <Link to="/contact" className={`nav-link-custom ${isActive('/contact')}`} onClick={() => setIsOpen(false)}>Contact</Link>
            
            {isLoggedIn ? (
              <>
                <div className="dropdown-divider"></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px' }}>
                  {userPhoto ? (
                    <img src={userPhoto} alt={userName} style={{ width: '38px', height: '38px', borderRadius: '50%' }} />
                  ) : (
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--electric-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                      {userName.charAt(0).toUpperCase()}
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
              <Link to="/auth" className="nav-cta-btn w-full mt-4" style={{ justifyContent: 'center' }} onClick={() => setIsOpen(false)}>
                <span>Login / Signup</span>
              </Link>
            )}
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-socials-row">
              <a href="mailto:support@rideshare.com" className="mobile-social-icon"><Mail size={20} /></a>
              <a href="#help" className="mobile-social-icon" onClick={() => alert("Help Center loaded!")}><HelpCircle size={20} /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Simple Arrow Right icon for button CTA
const ArrowRight = ({ size, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default Navbar;
