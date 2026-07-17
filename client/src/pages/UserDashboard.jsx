import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, User as UserIcon, CreditCard } from 'lucide-react';

const UserDashboard = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      // Connect to real backend, fallback to simulated data
      try {
        const response = await axios.get('http://localhost:5000/api/rides/available');
        setRides(response.data.rides);
      } catch (err) {
        console.warn('Backend not reachable, simulating rides.');
        setRides([
          { _id: '1', origin: 'Downtown', destination: 'Airport', price: 25, availableSeats: 2, driverName: 'John Doe', driverRating: 4.8 },
          { _id: '2', origin: 'University Campus', destination: 'City Center', price: 10, availableSeats: 3, driverName: 'Alice Smith', driverRating: 4.9 },
          { _id: '3', origin: 'North Suburbs', destination: 'Tech Park', price: 15, availableSeats: 1, driverName: 'Bob Johnson', driverRating: 4.5 }
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (rideId) => {
    // Simulated Booking and Payment Flow
    if (window.confirm("Confirm booking and simulate payment?")) {
      setBookingStatus({ id: rideId, status: 'processing' });
      
      setTimeout(() => {
        setBookingStatus({ id: rideId, status: 'success' });
        // Update local state to reflect booked seat
        setRides(rides.map(r => r._id === rideId ? { ...r, availableSeats: r.availableSeats - 1 } : r));
        
        setTimeout(() => setBookingStatus(null), 3000);
      }, 1500);
    }
  };

  const filteredRides = rides.filter(ride => 
    ride.destination.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ride.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
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
                    <span>Driver: {ride.driverName || 'Verified Driver'} {ride.driverRating && `(⭐ ${ride.driverRating})`}</span>
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
                
                {bookingStatus?.id === ride._id ? (
                  <button className="btn" disabled style={{ background: bookingStatus.status === 'success' ? 'var(--secondary)' : 'gray', color: 'white' }}>
                    {bookingStatus.status === 'success' ? 'Payment Successful!' : 'Processing Payment...'}
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleBook(ride._id)}
                    disabled={ride.availableSeats <= 0}
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
    </div>
  );
};

export default UserDashboard;
