import React, { useState } from 'react';

const Query = () => {
  const [faqs] = useState([
    { q: "How do I become a driver?", a: "Sign up on our platform and select the 'Driver' role. We will review your application and once approved, you can start sharing your rides." },
    { q: "Is payment secure?", a: "Yes! All payments are processed securely. However, currently we are using a simulated payment flow for demonstration." },
    { q: "Can I cancel a booked ride?", a: "Yes, you can cancel a ride up to 30 minutes before departure without any penalty." },
    { q: "How does the pricing work?", a: "Pricing is set by the driver based on the distance and available seats, ensuring fair cost-sharing for everyone." }
  ]);

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '32px', textAlign: 'center' }}>Frequently Asked Questions</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '12px', color: 'var(--primary)' }}>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Query;
