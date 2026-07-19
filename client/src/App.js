import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Query from './pages/Query';
import Auth from './pages/Auth';
import DriverDashboard from './pages/DriverDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Global Scroll to Top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollWidth((window.scrollY / totalScroll) * 100);
      } else {
        setScrollWidth(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="page-wrapper">
        {/* Scroll Progress tracker styled like a route with a tiny car */}
        <div className="scroll-route-tracker" style={{ width: `${scrollWidth}%` }}>
          <div className="scroll-route-car">🚗</div>
        </div>

        {/* Cursor Glow */}
        <div 
          className="mouse-follower-glow" 
          style={{ 
            left: `${coords.x}px`, 
            top: `${coords.y}px`
          }}
        ></div>

        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/query" element={<Query />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
