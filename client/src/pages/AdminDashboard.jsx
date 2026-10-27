import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  X, 
  ShieldAlert, 
  Users, 
  Mail, 
  User, 
  DollarSign, 
  TrendingUp, 
  Receipt,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'financials'
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
  const [error, setError] = useState('');

  // Financial Stats state
  const [adminMetrics, setAdminMetrics] = useState(null);
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchFinancialStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users', {
        headers: { 'x-admin-uid': localStorage.getItem('uid') }
      });
      setUsers(response.data.users);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users. Ensure you have Admin rights.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFinancialStats = async () => {
    try {
      const response = await api.get('/payments/admin-stats', {
        headers: { 'x-admin-uid': localStorage.getItem('uid') }
      });
      if (response.data.success) {
        setAdminMetrics(response.data.metrics);
        setLedger(response.data.ledger);
      }
    } catch (err) {
      console.error('Error fetching admin financial stats:', err);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/users/add', formData, {
        headers: { 'x-admin-uid': localStorage.getItem('uid') }
      });
      setUsers([response.data.user, ...users]);
      setShowAddModal(false);
      setFormData({ name: '', email: '', role: 'User' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add user');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/admin/users/${selectedUser._id}`, {
        name: formData.name,
        role: formData.role
      }, {
        headers: { 'x-admin-uid': localStorage.getItem('uid') }
      });
      
      setUsers(users.map(u => u._id === selectedUser._id ? response.data.user : u));
      setShowEditModal(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDelete = async (id, role) => {
    if (window.confirm(`Are you sure you want to delete this ${role}? This action is irreversible.`)) {
      try {
        await api.delete(`/admin/users/${id}`, {
          headers: { 'x-admin-uid': localStorage.getItem('uid') }
        });
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowEditModal(true);
  };

  const filteredUsers = users.filter(u => filter === 'All' || u.role === filter);

  return (
    <div className="container animate-clip-reveal" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '36px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldAlert size={36} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.4))' }} /> 
          <span>Admin Command Center</span>
        </h1>
        <button className="btn btn-primary" onClick={() => { setFormData({ name: '', email: '', role: 'User' }); setShowAddModal(true); }}>
          <UserPlus size={18} /> 
          <span>Add New User</span>
        </button>
      </div>

      {/* Admin Tab Switcher */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
        <button 
          onClick={() => setActiveTab('users')}
          className={`btn ${activeTab === 'users' ? 'btn-primary' : ''}`}
          style={{ background: activeTab === 'users' ? undefined : 'rgba(255,255,255,0.05)', color: 'white' }}
        >
          <Users size={18} /> User Registry ({users.length})
        </button>
        <button 
          onClick={() => setActiveTab('financials')}
          className={`btn ${activeTab === 'financials' ? 'btn-primary' : ''}`}
          style={{ background: activeTab === 'financials' ? undefined : 'rgba(255,255,255,0.05)', color: 'white' }}
        >
          <DollarSign size={18} /> Cashfree Commission & Financials
        </button>
      </div>

      {error && (
        <div style={{ padding: '16px 20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '12px', marginBottom: '28px' }}>
          {error}
        </div>
      )}

      {activeTab === 'users' ? (
        <div className="glass-panel animate-slide-up" style={{ padding: '32px' }}>
          {/* Dynamic filter bar */}
          <div className="admin-filter-bar">
            {['All', 'User', 'Driver', 'Admin'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`admin-filter-pill ${filter === f ? 'active' : ''}`}
              >
                {f === 'User' ? 'Riders' : f === 'All' ? 'All Accounts' : `${f}s`}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '40px 0' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.05)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s infinite linear' }}></div>
              <p style={{ color: 'var(--text-secondary)' }}>Loading verified registry...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Assigned Role</th>
                    <th>Joined Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user._id}>
                      <td style={{ fontWeight: 600 }}>{user.name || 'N/A'}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                      <td>
                        <span className={`admin-role-badge ${user.role.toLowerCase() === 'user' ? 'rider' : user.role.toLowerCase()}`}>
                          {user.role === 'User' ? 'Rider' : user.role}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button onClick={() => openEditModal(user)} className="action-btn edit" title="Edit User">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(user._id, user.role)} className="action-btn delete" title="Delete User">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No active records match the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* FINANCIAL ANALYTICS & COMMISSION TAB */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Admin KPI Overview Cards */}
          {adminMetrics && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #a855f7' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Platform Commission Revenue</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '6px' }}>₹{adminMetrics.totalCommissionCollected}</h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Rate: {adminMetrics.currentCommissionRate}% per booking</div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--vibrant-cyan)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gross Processed Volume</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--vibrant-cyan)', marginTop: '6px' }}>₹{adminMetrics.grossVolume}</h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{adminMetrics.totalTransactions} paid transactions</div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #10b981' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Driver Payouts</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '6px' }}>₹{adminMetrics.totalDriverPayouts}</h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Automated vendor splits</div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--orange-accent)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cashfree PG Gateway</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  {adminMetrics.cashfreeConfigured ? (
                    <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle size={18} /> Live Merchant API
                    </span>
                  ) : (
                    <span style={{ color: 'var(--orange-accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                      <AlertTriangle size={18} /> Test/Sandbox Mode
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Full Transaction Audit Ledger */}
          <div className="glass-panel animate-slide-up" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Receipt size={22} color="var(--primary)" /> Cashfree Transaction Audit Ledger
            </h2>

            {ledger.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '14px', color: 'var(--text-muted)' }}>
                No completed Cashfree transactions recorded yet.
              </div>
            ) : (
              <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
                <table className="admin-table" style={{ width: '100%', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '12px' }}>Order ID</th>
                      <th style={{ padding: '12px' }}>Passenger (Rider)</th>
                      <th style={{ padding: '12px' }}>Driver</th>
                      <th style={{ padding: '12px' }}>Gross Fare</th>
                      <th style={{ padding: '12px' }}>Driver Payout</th>
                      <th style={{ padding: '12px' }}>Commission Collected</th>
                      <th style={{ padding: '12px' }}>Payment Ref</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledger.map(t => (
                      <tr key={t._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px', fontWeight: 600, color: 'white' }}>{t.orderId}</td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{t.userId?.name || 'Rider'}</td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{t.driverId?.name || 'Driver'}</td>
                        <td style={{ padding: '12px', color: 'var(--orange-accent)', fontWeight: 600 }}>₹{t.amount}</td>
                        <td style={{ padding: '12px', color: '#10b981' }}>₹{t.driverAmount}</td>
                        <td style={{ padding: '12px', color: '#a855f7', fontWeight: 700 }}>₹{t.commissionAmount}</td>
                        <td style={{ padding: '12px', fontSize: '0.82rem', color: 'var(--vibrant-cyan)' }}>{t.cfPaymentId}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Create New User</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <input type="text" className="input-field" placeholder="Jane Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  <div className="input-icon-wrapper">
                    <User size={18} />
                  </div>
                </div>
              </div>
              
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <input type="email" className="input-field" placeholder="jane@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  <div className="input-icon-wrapper">
                    <Mail size={18} />
                  </div>
                </div>
              </div>
              
              <div className="input-group">
                <label>Account Role</label>
                <div className="input-with-icon">
                  <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="User">Rider (User)</option>
                    <option value="Driver">Driver</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div className="input-icon-wrapper">
                    <Users size={18} />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '12px' }}>Create Account</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Edit Account details</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="input-group">
                <label>Email Address (Immutable)</label>
                <div className="input-with-icon">
                  <input type="email" className="input-field" value={formData.email} disabled style={{ opacity: 0.5 }} />
                  <div className="input-icon-wrapper">
                    <Mail size={18} />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <input type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  <div className="input-icon-wrapper">
                    <User size={18} />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Account Role</label>
                <div className="input-with-icon">
                  <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="User">Rider (User)</option>
                    <option value="Driver">Driver</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div className="input-icon-wrapper">
                    <Users size={18} />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '12px' }}>Apply Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
