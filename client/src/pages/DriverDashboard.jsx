import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { 
  MapPin, 
  Navigation, 
  IndianRupee, 
  Users, 
  AlertCircle, 
  CheckCircle,
  PlusCircle
} from 'lucide-react';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const [formData, setFormData] = useState({ origin: '', destination: '', price: '', availableSeats: 3 });
  const [status, setStatus] = useState('');
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRides();
  }, []);

  const fetchMyRides = async () => {
    try {
      const driverUid = localStorage.getItem('uid');
      if (!driverUid) return;
      const response = await api.get(`/rides/driver/${driverUid}`);
      if (response.data.success) {
        setRides(response.data.rides);
      }
    } catch (err) {
      console.error("Error fetching driver rides:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('posting...');
    
    try {
      const driverUid = localStorage.getItem('uid');
      if (!driverUid) {
        setStatus('Error: You are not logged in properly. Please login again.');
        return;
      }

      const response = await api.post('/rides/create', {
        driverUid: driverUid,
        ...formData
      });
      setRides([response.data.ride, ...rides]);
      
      setStatus('Success! Your ride is now visible to users.');
      setFormData({ origin: '', destination: '', price: '', availableSeats: 3 });
      
      setTimeout(() => setStatus(''), 4000);
    } catch (error) {
      setStatus('Error posting ride.');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <h1 style={{ marginBottom: '32px' }}>Driver Dashboard</h1>
      
      <div className="driver-dashboard-grid">
        
        {/* Left Column: Post a New Ride */}
        <div className="driver-form-container glass-panel">
          <h2 style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PlusCircle size={24} className="gradient-text" /> 
            <span>Offer a New Ride</span>
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Origin Point</label>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Where are you starting from?"
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  required 
                />
                <div className="input-icon-wrapper">
                  <Navigation size={18} />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>Destination Point</label>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Where are you traveling to?"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  required 
                />
                <div className="input-icon-wrapper">
                  <MapPin size={18} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="input-group">
                <label>Fare per Seat</label>
                <div className="input-with-icon">
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="15"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required 
                  />
                  <div className="input-icon-wrapper">
                    <IndianRupee size={18} />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Seats Available</label>
                <div className="input-with-icon">
                  <input 
                    type="number" 
                    className="input-field" 
                    min="1" max="8"
                    value={formData.availableSeats}
                    onChange={(e) => setFormData({...formData, availableSeats: parseInt(e.target.value) || 3})}
                    required 
                  />
                  <div className="input-icon-wrapper">
                    <Users size={18} />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '12px' }}>
              Offer Shared Ride
            </button>
          </form>

          {status && (
            <div style={{ 
              marginTop: '20px', 
              padding: '12px 16px', 
              borderRadius: '10px', 
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: status.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              border: status.includes('Error') ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(16, 185, 129, 0.2)',
              color: status.includes('Error') ? '#f87171' : 'var(--secondary)'
            }}>
              {status.includes('Error') ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
              <span>{status}</span>
            </div>
          )}
        </div>

        {/* Right Column: Active Posted Rides */}
        <div className="driver-rides-container glass-panel">
          <h2 style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={24} style={{ color: 'var(--secondary)' }} /> 
            <span>Your Posted Rides</span>
          </h2>
          
          {loading ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Loading your ride ledger...</p>
          ) : rides.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <AlertCircle size={32} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
              <p style={{ color: 'var(--text-secondary)' }}>You haven't posted any rides yet.</p>
            </div>
          ) : (
            <div className="driver-rides-list">
              {rides.map(ride => (
                <div key={ride._id} className="driver-ride-card">
                  <div className="driver-ride-header">
                    <span className="driver-ride-route">{ride.origin} &rarr; {ride.destination}</span>
                    <span className="driver-ride-price">₹{ride.price}</span>
                  </div>
                  <div className="driver-ride-details">
                    <div className="driver-ride-detail-item">
                      <Users size={16} color="var(--primary)" />
                      <span>Seats Offered: {ride.availableSeats}</span>
                    </div>
                    <span className={`driver-status-badge ${ride.availableSeats > 0 ? 'active' : 'pending'}`}>
                      {ride.availableSeats > 0 ? 'Booking Active' : 'Booked Out'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
