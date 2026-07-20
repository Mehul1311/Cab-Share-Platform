import React from 'react';
import './StaticPages.css';

const TermsConditions = () => {
  return (
    <div className="static-page animate-fade-in">
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>
      
      <div className="container">
        <div className="static-hero">
          <div className="badge-pill mb-4" style={{ margin: '0 auto 16px' }}>Legal</div>
          <h1 className="static-title">Terms & Conditions</h1>
          <p className="static-subtitle">
            Effective Date: July 19, 2026
          </p>
        </div>

        <div className="static-content-card glass-panel">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using CabShare, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
          </p>

          <h2>2. User Accounts</h2>
          <p>
            To use certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information and maintain the security of your password. You are responsible for all activities that occur under your account.
          </p>

          <h2>3. Acceptable Use</h2>
          <p>
            You agree not to use the platform to:
          </p>
          <ul>
            <li>Violate any local, state, national, or international law.</li>
            <li>Harass, abuse, or harm another person.</li>
            <li>Post or transmit any material that is offensive, defamatory, or obscene.</li>
            <li>Attempt to bypass or compromise our security measures.</li>
          </ul>

          <h2>4. Payments and Fees</h2>
          <p>
            Riders agree to pay the fare agreed upon at the time of booking. Drivers agree to the platform's service fee deductions as outlined in our driver agreement. All payments are processed securely through our third-party payment providers.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            CabShare acts as a platform to connect riders and drivers. We do not provide transportation services and are not responsible for the actions, omissions, or behavior of any user. Your use of the service is at your sole risk.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
