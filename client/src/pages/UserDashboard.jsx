import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, User as UserIcon, CreditCard, X } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);
  
  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({ cardName: '', cardNumber: '', expiry: '', cvc: '' });

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rides/available');
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
        const response = await axios.post(`http://localhost:5000/api/rides/book/${selectedRide._id}`, {
          userUid: userUid
        });

        if (response.data.success) {
          setBookingStatus({ id: selectedRide._id, status: 'success' });
          setRides(rides.map(r => r._id === selectedRide._id ? { ...r, availableSeats: r.availableSeats - 1 } : r));
          setShowPaymentModal(false);
          setPaymentDetails({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
          
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
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '60px', position: 'relative' }}>
      <h1 style={{ marginBottom: '32px' }}>Find a Ride</h1>
      
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '40px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Search size={24} color="var(--text-secondary)" />
        <input 
          type="text" 
          placeholder="Search by destination or origin..." 
          className="input-field"
          style={{ marginBottom: 0, border: 'none', background: 'rgba(0,0,0,0.2)' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading available rides...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {filteredRides.map(ride => (
            <div key={ride._id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <MapPin size={18} color="var(--primary)" />
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{ride.origin} &rarr; {ride.destination}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <UserIcon size={16} />
                    <span>Driver: {ride.driverId?.name || 'Verified Driver'}</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                  ${ride.price}
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {ride.availableSeats} seat{ride.availableSeats > 1 ? 's' : ''} available
                </span>
                
                {bookingStatus?.id === ride._id && bookingStatus.status === 'success' ? (
                  <button className="btn" disabled style={{ background: 'var(--secondary)', color: 'white' }}>
                    Payment Successful!
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => initiateBooking(ride)}
                    disabled={ride.availableSeats <= 0 || (bookingStatus?.id === ride._id && bookingStatus?.status === 'processing')}
                  >
                    <CreditCard size={18} /> Book & Pay
                  </button>
                )}
              </div>
            </div>
          ))}
          {filteredRides.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>No rides found matching your search.</p>
          )}
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedRide && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Complete Payment</h2>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}><X size={24} /></button>
            </div>
            
            <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px' }}>
              <p style={{ margin: 0 }}><strong>Route:</strong> {selectedRide.origin} &rarr; {selectedRide.destination}</p>
              <p style={{ margin: '8px 0 0 0' }}><strong>Total Amount:</strong> <span style={{ color: 'var(--secondary)', fontWeight: 'bold', fontSize: '1.2rem' }}>${selectedRide.price}</span></p>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <div className="input-group">
                <label>Cardholder Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="John Doe"
                  value={paymentDetails.cardName}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Card Number</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                  required 
                />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Expiry (MM/YY)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="MM/YY"
                    maxLength="5"
                    value={paymentDetails.expiry}
                    onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                    required 
                  />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>CVC</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="123"
                    maxLength="4"
                    value={paymentDetails.cvc}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cvc: e.target.value})}
                    required 
                  />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={bookingStatus?.status === 'processing'}>
                {bookingStatus?.status === 'processing' ? 'Processing Payment...' : `Pay $${selectedRide.price}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
