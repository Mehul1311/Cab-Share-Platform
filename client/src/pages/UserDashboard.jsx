import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Search, CreditCard, X, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import LiveMap from '../components/LiveMap';
import { startCashfreeCheckout } from '../utils/cashfree';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);
  
  // Payment Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const userUid = localStorage.getItem('uid');
    if (!userUid) {
      navigate('/auth');
      return;
    }
    fetchRides();
  }, [navigate]);

  const fetchRides = async () => {
    try {
      const response = await api.get('/rides/available');
      setRides(response.data.rides);
    } catch (error) {
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false);
    }
  };

  const initiateBooking = async (ride) => {
    const userUid = localStorage.getItem('uid');
    if (!userUid) {
      alert("Please login first to book a ride.");
      return;
    }

    setSelectedRide(ride);
    setOrderLoading(true);
    setShowPaymentModal(true);
    setReceiptData(null);

    try {
      // Step 1: Create Cashfree Order on Backend (Calculates Driver Payout & Platform Commission)
      const response = await api.post('/payments/create-order', {
        userUid,
        rideId: ride._id,
        returnUrl: window.location.href
      });

      if (response.data.success) {
        setOrderDetails(response.data);
      } else {
        alert(response.data.message || 'Failed to initialize Cashfree order.');
        setShowPaymentModal(false);
      }
    } catch (err) {
      console.error('Error initiating Cashfree order:', err);
      alert(err.response?.data?.message || 'Failed to create payment session.');
      setShowPaymentModal(false);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleCashfreePayment = async (e) => {
    e.preventDefault();
    if (!orderDetails) return;

    const userUid = localStorage.getItem('uid');
    setBookingStatus({ id: selectedRide._id, status: 'processing' });

    try {
      let cfPaymentId = null;

      // Step 2: Launch Cashfree JS SDK Checkout if Live Order, or use Sandbox Fallback
      if (orderDetails.mode === 'LIVE_CASHFREE' && orderDetails.paymentSessionId) {
        try {
          await startCashfreeCheckout(orderDetails.paymentSessionId, 'sandbox');
        } catch (sdkErr) {
          console.warn('Cashfree JS SDK modal fallback triggered:', sdkErr);
        }
      }

      // Step 3: Verify Payment & Book Ride
      const verifyRes = await api.post('/payments/verify', {
        orderId: orderDetails.orderId,
        cfPaymentId: cfPaymentId || `cf_pay_${Date.now()}`,
        userUid
      });

      if (verifyRes.data.success) {
        setBookingStatus({ id: selectedRide._id, status: 'success' });
        setRides(rides.map(r => r._id === selectedRide._id ? { ...r, availableSeats: r.availableSeats - 1 } : r));
        setReceiptData(verifyRes.data.transaction);
        
        setTimeout(() => setBookingStatus(null), 5000);
      }
    } catch (err) {
      console.error("Booking & Payment error:", err);
      alert(err.response?.data?.message || "Failed to complete payment.");
      setBookingStatus(null);
    }
  };

  const filteredRides = rides.filter(ride => 
    ride.destination.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ride.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container animate-fade-in dashboard-page-wrapper" style={{ paddingTop: '20px', paddingBottom: '90px', position: 'relative', minHeight: '100vh' }}>
      
      {/* Animated Background Orbs */}
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>

      {/* Header & Map Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center', marginBottom: '48px' }} className="find-ride-header-split">
        <div>
          <h1 style={{ marginBottom: '16px', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Find a Ride</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Book rides securely via <strong>Cashfree Payment Gateway</strong>. Fares are automatically split into Driver Payouts and Platform Fees.
          </p>
          
          {/* Search bar */}
          <div className="dashboard-search-container">
            <Search size={22} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
            <input 
              type="text" 
              placeholder="Enter origin or destination to search..." 
              className="dashboard-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Live Map */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <LiveMap role="User" />
        </div>
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
              
              <div className="ride-card-header">
                <div className="ride-route-timeline">
                  <div className="route-step">
                    <span className="route-label">Origin</span>
                    <strong style={{ color: 'white' }}>{ride.origin}</strong>
                  </div>
                  <div className="route-step destination">
                    <span className="route-label">Destination</span>
                    <strong style={{ color: 'var(--orange-accent)' }}>{ride.destination}</strong>
                  </div>
                </div>
                
                <div className="ride-price-tag">
                  ₹{ride.price}
                </div>
              </div>
              
              <div className="driver-info-row">
                <div className="driver-avatar-circle" style={{ background: 'linear-gradient(135deg, var(--primary), var(--soft-purple))' }}>
                  {ride.driverId?.name ? ride.driverId.name.charAt(0).toUpperCase() : 'D'}
                </div>
                <div className="driver-details-text">
                  <span className="driver-name-label" style={{ color: 'white' }}>{ride.driverId?.name || 'Verified Driver'}</span>
                  <span className="driver-role-desc">Verified Share Partner</span>
                </div>
              </div>
              
              <div className="ride-card-footer">
                <span className="seats-indicator">
                  <span className="seats-count" style={{ color: 'var(--vibrant-cyan)' }}>{ride.availableSeats}</span> seat{ride.availableSeats !== 1 ? 's' : ''} left
                </span>
                
                {bookingStatus?.id === ride._id && bookingStatus.status === 'success' ? (
                  <button className="btn" disabled style={{ background: 'var(--vibrant-cyan)', color: 'white', cursor: 'default' }}>
                    Booking Secured!
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => initiateBooking(ride)}
                    disabled={ride.availableSeats <= 0 || (bookingStatus?.id === ride._id && bookingStatus?.status === 'processing')}
                  >
                    <CreditCard size={18} /> 
                    <span>Pay with Cashfree</span>
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

      {/* CASHFREE PAYMENT GATEWAY MODAL */}
      {showPaymentModal && selectedRide && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in" style={{ background: 'rgba(15,23,42,0.96)', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={22} color="var(--vibrant-cyan)" /> Cashfree Checkout
              </h2>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            {receiptData ? (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <CheckCircle2 size={56} color="#10b981" style={{ marginBottom: '16px' }} />
                <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '8px' }}>Payment Verified!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Transaction logged & seat booked successfully.
                </p>

                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', textAlign: 'left', fontSize: '0.88rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Order Reference:</span>
                    <strong style={{ color: 'white' }}>{receiptData.orderId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Cashfree Payment ID:</span>
                    <span style={{ color: 'var(--vibrant-cyan)' }}>{receiptData.cfPaymentId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Fare Amount Paid:</span>
                    <strong style={{ color: 'var(--orange-accent)' }}>₹{receiptData.amount}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Driver Payout Share:</span>
                    <span style={{ color: '#10b981' }}>₹{receiptData.driverAmount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Platform Commission:</span>
                    <span style={{ color: '#a855f7' }}>₹{receiptData.commissionAmount} ({receiptData.commissionRate}%)</span>
                  </div>
                </div>

                <button className="btn btn-primary w-full" style={{ marginTop: '24px' }} onClick={() => setShowPaymentModal(false)}>
                  Close & View Dashboard
                </button>
              </div>
            ) : orderLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '36px', height: '36px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--vibrant-cyan)', borderRadius: '50%', animation: 'spin 1s infinite linear', margin: '0 auto 16px auto' }}></div>
                <p style={{ color: 'var(--text-secondary)' }}>Generating Cashfree payment session & calculating fare breakdown...</p>
              </div>
            ) : orderDetails ? (
              <form onSubmit={handleCashfreePayment}>
                {/* Fare & Commission Breakdown Card */}
                <div className="checkout-card-preview" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
                  <div className="checkout-route-summary" style={{ color: 'white', fontWeight: 700, marginBottom: '12px' }}>
                    {selectedRide.origin} &rarr; {selectedRide.destination}
                  </div>
                  
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Total Ride Fare</span>
                      <strong style={{ color: 'var(--orange-accent)', fontSize: '1.1rem' }}>₹{orderDetails.fareAmount}</strong>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.83rem', color: '#10b981' }}>
                      <span>Driver Payout Share</span>
                      <span>₹{orderDetails.driverAmount}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', color: '#a855f7' }}>
                      <span>Platform Commission ({orderDetails.commissionPercent}%)</span>
                      <span>₹{orderDetails.commissionAmount}</span>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(99,102,241,0.08)', borderRadius: '10px', padding: '10px 14px', marginTop: '14px', border: '1px solid rgba(99,102,241,0.15)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'white', fontWeight: 600 }}>Cashfree Easy Split Enabled:</span> Funds will be processed securely and distributed automatically to the driver and platform.
                  </div>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  Supported Gateways: Cashfree UPI, Debit/Credit Cards, Net Banking, Paytm & Mobikwik Wallets.
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full" 
                  disabled={bookingStatus?.status === 'processing'}
                  style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', fontWeight: 700, padding: '14px' }}
                >
                  {bookingStatus?.status === 'processing' ? 'Processing Cashfree Payment...' : `Pay ₹${orderDetails.fareAmount} via Cashfree`}
                </button>
              </form>
            ) : null}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .find-ride-header-split {
            grid-template-columns: 1.3fr 0.7fr !important;
          }
        }
        .route-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }
      `}</style>

    </div>
  );
};

export default UserDashboard;
