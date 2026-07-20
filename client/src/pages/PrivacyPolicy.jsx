import React from 'react';
import './StaticPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="static-page animate-fade-in">
      <div className="moving-orb orb-1"></div>
      <div className="moving-orb orb-2"></div>
      
      <div className="container">
        <div className="static-hero">
          <div className="badge-pill mb-4" style={{ margin: '0 auto 16px' }}>Legal</div>
          <h1 className="static-title">Privacy Policy</h1>
          <p className="static-subtitle">
            Effective Date: July 19, 2026
          </p>
        </div>

        <div className="static-content-card glass-panel">
          <h2>1. Introduction</h2>
          <p>
            At CabShare, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect includes:
          </p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, phone number, and demographic information.</li>
            <li><strong>Location Data:</strong> Geo-location information to connect you with nearby drivers and riders.</li>
            <li><strong>Financial Data:</strong> Data related to your payment method (e.g., valid credit card number, card brand, expiration date) securely processed by our payment gateways.</li>
          </ul>

          <h2>3. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process transactions and send you related information.</li>
            <li>Match riders with drivers and facilitate safe rides.</li>
            <li>Monitor and analyze usage and trends to improve your experience.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <br/>
            <strong>privacy@cabshare.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
