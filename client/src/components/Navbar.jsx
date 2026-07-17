import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, X, LogOut } from 'lucide-react';
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
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const role = localStorage.getItem('userRole');
  const uid = localStorage.getItem('uid');
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
