import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Search, CreditCard, X, AlertCircle } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);
  
  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [userUpiId, setUserUpiId] = useState('');

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await api.get('/rides/available');
      setRides(response.data.rides);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const initiateBooking = (ride) => {
    const userUid = localStorage.getItem('uid');
    if (!userUid) {
      alert("Please login first to book a ride.");
      return;
    }
    setSelectedRide(ride);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus({ id: selectedRide._id, status: 'processing' });
    
    // Simulate payment gateway delay
    setTimeout(async () => {
      try {
        const userUid = localStorage.getItem('uid');
        
        // Actually call the backend to book the ride and decrease seats
        const response = await api.post(`/rides/book/${selectedRide._id}`, {
          userUid: userUid
        });

        if (response.data.success) {
          setBookingStatus({ id: selectedRide._id, status: 'success' });
          setRides(rides.map(r => r._id === selectedRide._id ? { ...r, availableSeats: r.availableSeats - 1 } : r));
          setShowPaymentModal(false);
          setUserUpiId('');
          
          setTimeout(() => setBookingStatus(null), 3000);
        }
      } catch (err) {
        console.error("Booking error:", err);
        alert(err.response?.data?.message || "Failed to book ride.");
        setBookingStatus(null);
      }
    }, 1500);
  };

  const filteredRides = rides.filter(ride => 
    ride.destination.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ride.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '120px', paddingBottom: '80px', position: 'relative' }}>
      <h1 style={{ marginBottom: '32px' }}>Find a Ride</h1>
      
      {/* Redesigned Search Input bar */}
      <div className="dashboard-search-container">
        <Search size={22} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
        <input 
          type="text" 
          placeholder="Where do you want to start or head to?" 
          className="dashboard-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px 0' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.05)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s infinite linear' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Retrieving available active rides...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div className="rides-grid">
          {filteredRides.map(ride => (
            <div key={ride._id} className="ride-card glass-panel">
              {/* Route Timeline Header */}
              <div className="ride-card-header">
                <div className="ride-route-timeline">
                  <div className="route-step">
                    <span>Origin</span> <br/>
                    <strong>{ride.origin}</strong>
                  </div>
                  <div className="route-step destination">
                    <span>Destination</span> <br/>
                    <strong>{ride.destination}</strong>
                  </div>
                </div>
                
                <div className="ride-price-tag">
                  ₹{ride.price}
                </div>
              </div>
              
              {/* Driver Details Row */}
              <div className="driver-info-row">
                <div className="driver-avatar-circle">
                  {ride.driverId?.name ? ride.driverId.name.charAt(0).toUpperCase() : 'D'}
                </div>
                <div className="driver-details-text">
                  <span className="driver-name-label">{ride.driverId?.name || 'Verified Driver'}</span>
                  <span className="driver-role-desc">Verified Share Partner</span>
                </div>
              </div>
              
              {/* Booking Actions */}
              <div className="ride-card-footer">
                <span className="seats-indicator">
                  <span className="seats-count">{ride.availableSeats}</span> seat{ride.availableSeats !== 1 ? 's' : ''} left
                </span>
                
                {bookingStatus?.id === ride._id && bookingStatus.status === 'success' ? (
                  <button className="btn" disabled style={{ background: 'var(--secondary)', color: 'white', cursor: 'default' }}>
                    Booking Secured!
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => initiateBooking(ride)}
                    disabled={ride.availableSeats <= 0 || (bookingStatus?.id === ride._id && bookingStatus?.status === 'processing')}
                  >
                    <CreditCard size={18} /> 
                    <span>Book & Pay</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          {filteredRides.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 24px', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <AlertCircle size={36} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>No active shared rides found matching your query.</p>
            </div>
          )}
        </div>
      )}

      {/* SECURE CHECKOUT MODAL */}
      {showPaymentModal && selectedRide && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Secure Check-out</h2>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}><X size={20} /></button>
            </div>
            
            {/* Interactive Mock Wallet card */}
            <div className="checkout-card-preview">
              <div className="checkout-route-summary">{selectedRide.origin} &rarr; {selectedRide.destination}</div>
              <div className="checkout-amount-row">
                <span>Journey Fare</span>
                <span className="checkout-price">₹{selectedRide.price}</span>
              </div>
              <div className="checkout-upi-box">
                <p>Transfer to Driver UPI ID</p>
                <div className="checkout-upi-id">
                  {selectedRide.driverId?.upiId || 'driver@upi'}
                </div>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <div className="input-group">
                <label>Your Payment UPI ID (For Ledger sync)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="name@upi"
                  value={userUpiId}
                  onChange={(e) => setUserUpiId(e.target.value)}
                  required 
                />
              </div>
              
              <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '12px' }} disabled={bookingStatus?.status === 'processing'}>
                {bookingStatus?.status === 'processing' ? 'Authorizing peer-to-peer transfer...' : `Approve & Pay ₹${selectedRide.price}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
