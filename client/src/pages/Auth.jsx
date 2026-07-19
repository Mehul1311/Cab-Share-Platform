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
  ArrowRight,
  MapPin,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { LoginIllustration } from '../components/Illustrations';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '', 
    role: 'User'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
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
    
    // Check if Firebase is configured
    if (!process.env.REACT_APP_FIREBASE_API_KEY) {
      setError('Firebase is not configured! Please configure the environment variables.');
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
        setError('Firebase Error: This domain is not authorized for Google Sign-In.');
      } else {
        const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'An error occurred during Google authentication.';
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Password reset simulation: A link has been sent to " + (formData.email || "your email."));
  };

  return (
    <div className="container auth-page-container animate-fade-in">
      {/* Background Animated Gradient Blobs */}
      <div className="floating-blob blob-blue"></div>
      <div className="floating-blob blob-cyan"></div>
      <div className="floating-blob blob-purple"></div>
      <div className="floating-blob blob-indigo"></div>

      {/* Floating Background Map Pins */}
      <div className="floating-pin" style={{ top: '15%', left: '8%', animationDelay: '0s' }}><MapPin size={22} /></div>
      <div className="floating-pin" style={{ top: '75%', left: '3%', animationDelay: '2s' }}><MapPin size={20} /></div>
      <div className="floating-pin" style={{ top: '82%', right: '5%', animationDelay: '1s' }}><MapPin size={24} /></div>
      <div className="floating-pin" style={{ top: '12%', right: '22%', animationDelay: '3s' }}><MapPin size={18} /></div>

      <div className="auth-split-wrapper">
        
        {/* Left Column - Visual side (Hero) */}
        <div className="auth-visual-side">
          <div className="auth-visual-header">
            <div className="auth-visual-logo">
              <Car size={34} className="logo-icon" />
              <span>RideShare</span>
            </div>
          </div>
          
          <div className="auth-visual-content">
            {/* Headline */}
            <h1>Secure Access, <br/><span className="gradient-text-vibrant">Simplified.</span></h1>
            
            {/* Description */}
            <p>Your safety is our priority. Access India's trusted peer-to-peer ride matching network with peace of mind.</p>
            
            {/* Custom vector illustration of secure unlock */}
            <div style={{ maxWidth: '320px', margin: '0 auto 20px', display: 'flex', justifyContent: 'center' }}>
              <LoginIllustration />
            </div>
            
            {/* Trust Section */}
            <div className="auth-trust-badge-row" style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center', color: 'var(--orange-accent)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ShieldCheck size={18} />
              <span>100% Cryptographic Identity Sync</span>
            </div>
          </div>
        </div>

        {/* Right Column - Form side */}
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h2>{isLogin ? 'Welcome Back 👋' : 'Create Account'}</h2>
            <p>{isLogin ? 'Login to continue your journey.' : 'Sign up to start sharing journeys'}</p>
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
                      placeholder="Enter your full name"
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
              </>
            )}

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="Enter your email address"
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
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input-field" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
                <div className="input-icon-wrapper">
                  <Lock size={18} />
                </div>
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="form-options-row">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember Me</span>
                </label>
                <a href="#forgot" className="forgot-password-link" onClick={handleForgotPassword}>
                  Forgot Password?
                </a>
              </div>
            )}

            <button type="submit" className="btn-signin" disabled={loading}>
              {loading ? (
                <div className="button-loader"></div>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
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
            className="google-white-btn"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>

          <p style={{ textAlign: 'center', marginTop: '36px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
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
