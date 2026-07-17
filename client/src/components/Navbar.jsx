import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Remove role from local storage on logout
      localStorage.removeItem('userRole');
      localStorage.removeItem('uid');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPhoto');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const role = localStorage.getItem('userRole');
  const uid = localStorage.getItem('uid');
  const storedName = localStorage.getItem('userName');
  const userName = storedName || (user ? user.displayName || user.email : 'User');
  const userPhoto = localStorage.getItem('userPhoto') || (user ? user.photoURL : null);
  const isLoggedIn = user || uid;

  return (
    <nav className="navbar glass-panel">
      <div className="container nav-container">
        <Link to="/" className="nav-link nav-logo">
          <Car size={32} className="logo-icon" />
          <span>RideShare</span>
        </Link>

        <div className="desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/query" className="nav-link">Query</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {isLoggedIn ? (
            <>
              {role === 'Admin' && <Link to="/admin-dashboard" className="nav-link highlight" style={{ color: '#ef4444' }}>Admin Panel</Link>}
              {role === 'Driver' && <Link to="/driver-dashboard" className="nav-link highlight">Driver Dashboard</Link>}
              {role === 'User' && <Link to="/user-dashboard" className="nav-link highlight">Find a Ride</Link>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px' }}>
                {userPhoto ? (
                  <img src={userPhoto} alt="Profile" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
                ) : (
                  <UserCircle size={24} color="var(--primary)" />
                )}
                <span className="nav-link" style={{ fontWeight: 600, color: 'var(--primary)', padding: 0 }}>
                  Hi, {userName}
                </span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary nav-btn">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary nav-btn">Login / Signup</Link>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu glass-panel">
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/query" className="nav-link" onClick={() => setIsOpen(false)}>Query</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
          
          {isLoggedIn ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '8px' }}>
                {userPhoto ? (
                  <img src={userPhoto} alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
                ) : (
                  <UserCircle size={32} color="var(--primary)" />
                )}
                <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                  Logged in as: <br/>{userName}
                </div>
              </div>
              {role === 'Admin' && <Link to="/admin-dashboard" className="nav-link" onClick={() => setIsOpen(false)} style={{ color: '#ef4444' }}>Admin Panel</Link>}
              {role === 'Driver' && <Link to="/driver-dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Driver Dashboard</Link>}
              {role === 'User' && <Link to="/user-dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Find a Ride</Link>}
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="btn btn-secondary w-full mt-4">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary w-full mt-4" onClick={() => setIsOpen(false)}>Login / Signup</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
