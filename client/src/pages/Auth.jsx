import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import api from '../utils/api';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  Car, 
  CreditCard, 
  AlertCircle, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import './Auth.css';

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
      
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      }
      
      const response = await api.post('/auth/sync', {
        uid: userCredential.user.uid,
        email: formData.email,
        name: isLogin ? '' : formData.name, // Only sync name on signup
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        vehicleNumber: formData.vehicleNumber,
        upiId: formData.upiId
      });

      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('uid', response.data.user.uid);
      localStorage.setItem('userName', response.data.user.name || response.data.user.email);
      
      // Navigate based on role
      if (response.data.user.role === 'Driver') {
        navigate('/driver-dashboard');
      } else if (response.data.user.role === 'Admin') {
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
    
    // Check if Firebase is actually configured
    if (!process.env.REACT_APP_FIREBASE_API_KEY) {
      setError('Firebase is not configured! Please add the REACT_APP_FIREBASE_* environment variables.');
      return;
    }
    
    setLoading(true);
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
      if (err.code === 'auth/unauthorized-domain') {
        setError('Firebase Error: This domain is not authorized for Google Sign-In in Firebase authentication settings.');
      } else {
        const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'An error occurred during Google authentication.';
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container auth-page-container animate-fade-in">
      <div className="auth-split-wrapper glass-panel">
        
        {/* Left Column - Visual side (hidden on small devices) */}
        <div className="auth-visual-side">
          <div className="auth-visual-glow"></div>
          <div className="auth-visual-glow-sec"></div>
          
          <div className="auth-visual-header">
            <div className="auth-visual-logo">
              <Car size={32} className="logo-icon" />
              <span>RideShare</span>
            </div>
          </div>
          
          <div className="auth-visual-content">
            <h1>Share the Ride, <br/><span className="gradient-text">Split the Expense.</span></h1>
            <p>Experience a premium, community-driven commuting platform connecting verified drivers and riders going the same way.</p>
            
            {/* Interactive Route Illustration */}
            <div className="visual-route">
              <div className="route-node">A</div>
              <div className="route-connector">
                <div className="route-car-pulse"></div>
              </div>
              <div className="route-node route-node-sec">B</div>
            </div>
          </div>
          
          <div className="auth-visual-footer">
            <div className="auth-stat">
              <span className="auth-stat-value">12k+</span>
              <span className="auth-stat-label">Riders</span>
            </div>
            <div className="auth-stat">
              <span className="auth-stat-value">4.9/5</span>
              <span className="auth-stat-label">Rating</span>
            </div>
            <div className="auth-stat">
              <span className="auth-stat-value">100%</span>
              <span className="auth-stat-label">Verified</span>
            </div>
          </div>
        </div>

        {/* Right Column - Form side */}
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Enter details to access your account' : 'Sign up to start sharing journeys'}</p>
          </div>
          
          {error && (
            <div className="auth-error-msg">
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required={!isLogin}
                    />
                    <div className="input-icon-wrapper">
                      <UserIcon size={18} />
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label>Sign Up As</label>
                  <div className="input-with-icon">
                    <select 
                      className="input-field"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      style={{ appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="User">Rider (User)</option>
                      <option value="Driver">Driver</option>
                    </select>
                    <div className="input-icon-wrapper">
                      <Sparkles size={18} />
                    </div>
                  </div>
                </div>
                
                {/* Accordion animation wrapper for Driver details */}
                <div className={`driver-accordion ${formData.role === 'Driver' ? 'visible' : ''}`}>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <div className="input-with-icon">
                      <input 
                        type="tel" 
                        className="input-field" 
                        placeholder="+1 (555) 000-0000"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        required={formData.role === 'Driver'}
                      />
                      <div className="input-icon-wrapper">
                        <Phone size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Vehicle / Auto Number</label>
                    <div className="input-with-icon">
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="e.g. MH 12 AB 1234"
                        value={formData.vehicleNumber}
                        onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                        required={formData.role === 'Driver'}
                      />
                      <div className="input-icon-wrapper">
                        <Car size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>UPI ID (For receiving payments)</label>
                    <div className="input-with-icon">
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="drivername@upi"
                        value={formData.upiId}
                        onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                        required={formData.role === 'Driver'}
                      />
                      <div className="input-icon-wrapper">
                        <CreditCard size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
                <div className="input-icon-wrapper">
                  <Mail size={18} />
                </div>
              </div>
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <div className="input-with-icon">
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
                <div className="input-icon-wrapper">
                  <Lock size={18} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '8px' }} disabled={loading}>
              <span>{loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '28px 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
            <span style={{ padding: '0 16px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>OR</span>
            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
          </div>

          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="google-btn"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>

          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              className="toggle-auth-span"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
