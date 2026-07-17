import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Navigation } from 'lucide-react';

const DriverDashboard = () => {
  const [formData, setFormData] = useState({ origin: '', destination: '', price: '', availableSeats: 3 });
  const [status, setStatus] = useState('');
  const [rides, setRides] = useState([]); // Simulated list of posted rides

  React.useEffect(() => {
    fetchMyRides();
  }, []);

  const fetchMyRides = async () => {
    try {
      const driverUid = localStorage.getItem('uid');
      if (!driverUid) return;
      const response = await axios.get(`http://localhost:5000/api/rides/driver/${driverUid}`);
      if (response.data.success) {
        setRides(response.data.rides);
      }
    } catch (err) {
      console.error("Error fetching driver rides:", err);
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

      const response = await axios.post('http://localhost:5000/api/rides/create', {
        driverUid: driverUid,
        ...formData
      });
      setRides([response.data.ride, ...rides]);
      
      setStatus('Success! Your ride is now visible to users.');
      setFormData({ origin: '', destination: '', price: '', availableSeats: 3 });
    } catch (error) {
      setStatus('Error posting ride.');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <h1 style={{ marginBottom: '32px' }}>Driver Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation size={24} color="var(--primary)" /> Post a New Ride
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Origin</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Where are you starting?"
                value={formData.origin}
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Destination</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Where are you heading?"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Price per Seat ($)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="e.g. 15"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required 
              />
            </div>
            <div className="input-group">
              <label>Available Seats</label>
              <input 
                type="number" 
                className="input-field" 
                min="1" max="6"
                value={formData.availableSeats}
                onChange={(e) => setFormData({...formData, availableSeats: e.target.value})}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post Ride</button>
          </form>
          {status && <p style={{ marginTop: '16px', color: status.includes('Error') ? '#ef4444' : 'var(--secondary)' }}>{status}</p>}
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={24} color="var(--secondary)" /> Your Active Rides
          </h2>
          
          {rides.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>You haven't posted any rides yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {rides.map(ride => (
                <div key={ride._id} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>{ride.origin} &rarr; {ride.destination}</strong>
                    <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>${ride.price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>Seats: {ride.availableSeats}</span>
                    <span>Status: {ride.status}</span>
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
