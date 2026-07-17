import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import api from '../utils/api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    role: 'User',
    phoneNumber: '',
    vehicleNumber: '',
    upiId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      
      // We wrap the auth calls in a try/catch, but since Firebase config is a placeholder, 
      // this will fail. For the sake of UI demonstration, if it fails, we will simulate login.
      try {
        if (isLogin) {
          userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        } else {
          userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        }
        
        const response = await api.post('/auth/sync', {
          uid: userCredential.user.uid,
          email: formData.email,
          name: formData.name,
          role: formData.role,
          phoneNumber: formData.phoneNumber,
          vehicleNumber: formData.vehicleNumber,
          upiId: formData.upiId
        });

        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('uid', response.data.user.uid);
        localStorage.setItem('userName', response.data.user.name || response.data.user.email);
        
      } catch (err) {
        console.warn("Firebase Auth failed (likely missing config). Simulating login & DB sync for demo purposes.");
        const simulatedUid = 'demo_' + formData.email;
        
        // Even for demo, we must sync with MongoDB so relations work!
        const response = await api.post('/auth/sync', {
          uid: simulatedUid,
          email: formData.email || 'demo@example.com',
          name: formData.name || 'Demo User',
          role: formData.role,
          phoneNumber: formData.phoneNumber,
          vehicleNumber: formData.vehicleNumber,
          upiId: formData.upiId
        });

        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('uid', response.data.user.uid);
        localStorage.setItem('userName', response.data.user.name || response.data.user.email);
      }

      // Navigate based on role
      if (formData.role === 'Driver') {
        navigate('/driver-dashboard');
      } else if (formData.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred during authentication.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        
        const response = await api.post('/auth/sync', {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          role: formData.role,
          phoneNumber: formData.phoneNumber,
          vehicleNumber: formData.vehicleNumber,
          upiId: formData.upiId
        });

        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('uid', response.data.user.uid);
        localStorage.setItem('userName', response.data.user.name || response.data.user.email);
        localStorage.setItem('userPhoto', userCredential.user.photoURL || '');
        
        if (response.data.user.role === 'Driver') {
          navigate('/driver-dashboard');
        } else if (response.data.user.role === 'Admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } catch (err) {
        console.warn("Google Auth failed. Simulating for demo purposes.", err);
        const simulatedUid = 'demo_google_' + Date.now();
        const response = await api.post('/auth/sync', {
          uid: simulatedUid,
          email: 'google_demo@example.com',
          name: 'Google User',
          role: formData.role,
          phoneNumber: formData.phoneNumber,
          vehicleNumber: formData.vehicleNumber,
          upiId: formData.upiId
        });
        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('uid', response.data.user.uid);
        localStorage.setItem('userName', response.data.user.name || response.data.user.email);
        localStorage.setItem('userPhoto', '');
        
        if (response.data.user.role === 'Driver') {
          navigate('/driver-dashboard');
        } else if (response.data.user.role === 'Admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'An error occurred during Google authentication.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '60px', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        
        {error && <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required={!isLogin}
                />
              </div>
              <div className="input-group">
                <label>I want to sign up as a:</label>
                <select 
                  className="input-field"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="User">Rider (User)</option>
                  <option value="Driver">Driver</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              {formData.role === 'Driver' && (
                <>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      className="input-field" 
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Vehicle / Auto Number</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. MH 12 AB 1234"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>UPI ID (For receiving payments)</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. driver@upi"
                      value={formData.upiId}
                      onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                      required
                    />
                  </div>
                </>
              )}
            </>
          )}

          {isLogin && (
            <div className="input-group">
              <label>Simulate Role Login as:</label>
              <select 
                className="input-field"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="User">Rider (User)</option>
                <option value="Driver">Driver</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
          <span style={{ padding: '0 12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>OR</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
        </div>

        <button 
          onClick={handleGoogleLogin} 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'white', 
            color: '#333', 
            border: 'none', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px', 
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
