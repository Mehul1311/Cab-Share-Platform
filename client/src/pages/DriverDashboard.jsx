import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { 
  MapPin, 
  Navigation, 
  IndianRupee, 
  Users, 
  AlertCircle, 
  CheckCircle,
  PlusCircle,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  Receipt
} from 'lucide-react';
import LiveMap from '../components/LiveMap';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ origin: '', destination: '', price: '', availableSeats: 3 });
  const [status, setStatus] = useState('');
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cashfree Driver Earnings & Payout State
  const [earningsSummary, setEarningsSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('rides'); // 'rides' | 'earnings'

  useEffect(() => {
    const userUid = localStorage.getItem('uid');
    if (!userUid) {
      navigate('/auth');
      return;
    }
    fetchMyRides();
    fetchDriverEarnings();
  }, [navigate]);

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

  const fetchDriverEarnings = async () => {
    try {
      const driverUid = localStorage.getItem('uid');
      if (!driverUid) return;
      const response = await api.get(`/payments/driver-earnings/${driverUid}`);
      if (response.data.success) {
        setEarningsSummary(response.data.summary);
        setTransactions(response.data.transactions);
      }
    } catch (err) {
      console.error("Error fetching driver earnings:", err);
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
    <div className="container animate-fade-in driver-page-wrapper" style={{ paddingTop: '20px', paddingBottom: '90px', position: 'relative' }}>
      
      {/* Animated Floating Orbs */}
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>
      <div className="moving-orb orb-3"></div>

      {/* Header block */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center', marginBottom: '36px' }} className="driver-header-split">
        <div>
          <h1 style={{ marginBottom: '16px', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Driver Command Center</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Offer empty seats and track automatic payouts via <strong>Cashfree Payment Gateway</strong>. Keep 90% of passenger fares!
          </p>

          {/* Quick Stats Banner */}
          {earningsSummary && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '14px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Net Payout Received</span>
                <strong style={{ fontSize: '1.3rem', color: '#10b981' }}>₹{earningsSummary.totalDriverEarnings}</strong>
              </div>
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '14px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Gross Volume</span>
                <strong style={{ fontSize: '1.3rem', color: 'var(--vibrant-cyan)' }}>₹{earningsSummary.totalGrossFare}</strong>
              </div>
              <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '14px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Platform Commission</span>
                <strong style={{ fontSize: '1.3rem', color: '#a855f7' }}>₹{earningsSummary.totalCommissionDeducted}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Live Map Component */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <LiveMap role="Driver" />
        </div>
      </div>

      {/* Navigation Pills (Rides vs Earnings) */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveTab('rides')}
          className={`btn ${activeTab === 'rides' ? 'btn-primary' : ''}`}
          style={{ background: activeTab === 'rides' ? undefined : 'rgba(255,255,255,0.05)', color: 'white' }}
        >
          <PlusCircle size={18} /> Manage & Offer Rides
        </button>
        <button 
          onClick={() => setActiveTab('earnings')}
          className={`btn ${activeTab === 'earnings' ? 'btn-primary' : ''}`}
          style={{ background: activeTab === 'earnings' ? undefined : 'rgba(255,255,255,0.05)', color: 'white' }}
        >
          <TrendingUp size={18} /> Cashfree Payout Ledger ({transactions.length})
        </button>
      </div>

      {activeTab === 'rides' ? (
        <div className="driver-dashboard-grid">
          
          {/* Left Column: Post a New Ride */}
          <div className="driver-form-container glass-panel">
            <h2 style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
              <PlusCircle size={24} style={{ color: 'var(--vibrant-cyan)' }} /> 
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
                      placeholder="150"
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
                background: status.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(6, 182, 212, 0.1)',
                border: status.includes('Error') ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(6, 182, 212, 0.2)',
                color: status.includes('Error') ? '#f87171' : 'var(--vibrant-cyan)'
              }}>
                {status.includes('Error') ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                <span>{status}</span>
              </div>
            )}
          </div>

          {/* Right Column: Active Posted Rides */}
          <div className="driver-rides-container glass-panel">
            <h2 style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
              <MapPin size={24} style={{ color: 'var(--orange-accent)' }} /> 
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
                      <span className="driver-ride-route" style={{ color: 'white' }}>{ride.origin} &rarr; {ride.destination}</span>
                      <span className="driver-ride-price" style={{ color: 'var(--orange-accent)' }}>₹{ride.price}</span>
                    </div>
                    <div className="driver-ride-details">
                      <div className="driver-ride-detail-item">
                        <Users size={16} color="var(--vibrant-cyan)" />
                        <span>Seats Offered: {ride.availableSeats}</span>
                      </div>
                      <span className={`driver-status-badge ${ride.availableSeats > 0 ? 'active' : 'pending'}`}>
                        {ride.availableSeats > 0 ? 'Booking Active' : 'Booked Out'}
                      </span>
                    </div>

                    {ride.availableSeats > 0 && (
                      <div className="live-matching-status">
                        <div className="radar-spinner">
                          <div className="radar-circle"></div>
                          <div className="radar-sweep"></div>
                        </div>
                        <div className="matching-text">
                          <span className="pulse-text">Searching for passengers nearby...</span>
                          <div className="matching-stats">Broadcasting to {Math.floor(Math.random() * 40) + 10} riders</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* EARNINGS & PAYOUT LEDGER TAB */
        <div className="glass-panel animate-slide-up" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Receipt size={24} color="#10b981" /> Cashfree Payout Transactions
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Payout Account UPI: <strong style={{ color: 'var(--vibrant-cyan)' }}>{earningsSummary?.upiId || 'driver@upi'}</strong>
            </div>
          </div>

          {transactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '16px' }}>
              <CreditCard size={38} color="var(--text-muted)" style={{ marginBottom: '14px' }} />
              <p style={{ color: 'var(--text-secondary)' }}>No completed Cashfree transactions yet. Once riders pay for seats, your payouts will reflect here.</p>
            </div>
          ) : (
            <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ padding: '12px' }}>Order ID</th>
                    <th style={{ padding: '12px' }}>Route / Rider</th>
                    <th style={{ padding: '12px' }}>Gross Fare</th>
                    <th style={{ padding: '12px' }}>Commission</th>
                    <th style={{ padding: '12px' }}>Your Payout</th>
                    <th style={{ padding: '12px' }}>Cashfree Ref</th>
                    <th style={{ padding: '12px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: 'white' }}>{t.orderId}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                        <div>{t.rideId?.origin} &rarr; {t.rideId?.destination}</div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.userId?.name || 'Rider'}</span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--orange-accent)', fontWeight: 600 }}>₹{t.amount}</td>
                      <td style={{ padding: '12px', color: '#a855f7' }}>-₹{t.commissionAmount} ({t.commissionRate}%)</td>
                      <td style={{ padding: '12px', color: '#10b981', fontWeight: 700 }}>₹{t.driverAmount}</td>
                      <td style={{ padding: '12px', fontSize: '0.82rem', color: 'var(--vibrant-cyan)' }}>{t.cfPaymentId || 'VERIFIED'}</td>
                      <td style={{ padding: '12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .driver-header-split {
            grid-template-columns: 1.3fr 0.7fr !important;
          }
        }
        .driver-status-badge.active {
          background: rgba(6, 182, 212, 0.1) !important;
          color: var(--vibrant-cyan) !important;
        }
      `}</style>

    </div>
  );
};

export default DriverDashboard;
