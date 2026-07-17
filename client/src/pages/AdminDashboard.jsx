import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserPlus, Edit, Trash2, X, ShieldAlert } from 'lucide-react';
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

  const adminUid = localStorage.getItem('uid');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { 'x-admin-uid': adminUid }
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
      const response = await axios.post('http://localhost:5000/api/admin/users/add', formData, {
        headers: { 'x-admin-uid': adminUid }
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
      const response = await axios.put(`http://localhost:5000/api/admin/users/${selectedUser._id}`, {
        name: formData.name,
        role: formData.role
      }, {
        headers: { 'x-admin-uid': adminUid }
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
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
          headers: { 'x-admin-uid': adminUid }
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
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldAlert color="var(--primary)" /> Admin Dashboard
        </h1>
        <button className="btn btn-primary" onClick={() => { setFormData({ name: '', email: '', role: 'User' }); setShowAddModal(true); }}>
          <UserPlus size={18} /> Add User
        </button>
      </div>

      {error && <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>}

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          {['All', 'User', 'Driver', 'Admin'].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: filter === f ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: filter === f ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {f === 'User' ? 'Riders' : f}s
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Name</th>
                  <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Email</th>
                  <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Role</th>
                  <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Joined</th>
                  <th style={{ padding: '16px 8px', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 8px' }}>{user.name || 'N/A'}</td>
                    <td style={{ padding: '16px 8px' }}>{user.email}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '0.85rem',
                        background: user.role === 'Admin' ? 'rgba(239, 68, 68, 0.2)' : user.role === 'Driver' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(79, 70, 229, 0.2)',
                        color: user.role === 'Admin' ? '#ef4444' : user.role === 'Driver' ? '#10b981' : '#4f46e5'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      <button onClick={() => openEditModal(user)} style={{ background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer', marginRight: '16px' }} title="Edit User">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(user._id, user.role)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Delete User">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>No users found.</td>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Add New User</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Role</label>
                <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="User">Rider (User)</option>
                  <option value="Driver">Driver</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create User</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Edit User</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" className="input-field" value={formData.email} disabled style={{ opacity: 0.5 }} />
              </div>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>Role</label>
                <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="User">Rider (User)</option>
                  <option value="Driver">Driver</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
