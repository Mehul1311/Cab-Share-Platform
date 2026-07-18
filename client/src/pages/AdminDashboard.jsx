import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { UserPlus, Edit, Trash2, X, ShieldAlert, Users, Mail, User } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
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
    <div className="container animate-fade-in" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
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

      {error && (
        <div style={{ padding: '16px 20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '12px', marginBottom: '28px' }}>
          {error}
        </div>
      )}

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
