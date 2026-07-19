import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQIllustration } from '../components/Illustrations';

const Query = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const [faqs] = useState([
    { q: "How do I become a driver?", a: "Sign up on our platform and select the 'Driver' role. We will review your application and once approved, you can start sharing your rides." },
    { q: "Is payment secure?", a: "Yes! All payments are processed securely. However, currently we are using a simulated payment flow for demonstration." },
    { q: "Can I cancel a booked ride?", a: "Yes, you can cancel a ride up to 30 minutes before departure without any penalty." },
    { q: "How does the pricing work?", a: "Pricing is set by the driver based on the distance and available seats, ensuring fair cost-sharing for everyone." }
  ]);

  const toggleAccordion = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div className="container animate-skew-reveal" style={{ paddingTop: '85px', paddingBottom: '90px', position: 'relative' }}>
      
      {/* Decorative blurred background blobs */}
      <div className="contact-blob contact-blob-1" style={{ top: '-100px', right: '-100px', width: '300px', height: '300px' }}></div>
      <div className="contact-blob contact-blob-2" style={{ bottom: '10%', left: '-50px', width: '300px', height: '300px' }}></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }}>
        
        {/* Desktop Split Columns */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="faq-visual-row">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', width: '100%', maxWidth: '1120px' }}>
            
            {/* Header Title block */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                Frequently Asked Questions
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                Have a question or looking to clarify settings? Click on any query to reveal quick guides.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center' }} className="faq-split-grid">
              
              {/* FAQ Illustration Block */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '320px' }}>
                  <FAQIllustration />
                </div>
              </div>

              {/* Accordions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {faqs.map((faq, index) => {
                  const isOpen = activeIndex === index;
                  return (
                    <div 
                      key={index} 
                      style={{ 
                        background: 'rgba(15, 23, 42, 0.45)', 
                        border: isOpen ? '1px solid rgba(37, 99, 235, 0.3)' : '1px solid rgba(255,255,255,0.04)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isOpen ? '0 8px 24px rgba(37, 99, 235, 0.08)' : 'none'
                      }}
                    >
                      <button 
                        onClick={() => toggleAccordion(index)}
                        style={{ 
                          width: '100%', 
                          background: 'none', 
                          border: 'none', 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '20px 24px', 
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: isOpen ? 'var(--vibrant-cyan)' : 'white' }}>
                          {faq.q}
                        </span>
                        {isOpen ? <ChevronUp size={18} color="var(--vibrant-cyan)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                      </button>

                      <div 
                        style={{ 
                          maxHeight: isOpen ? '200px' : '0px',
                          overflow: 'hidden',
                          transition: 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          background: 'rgba(255,255,255,0.01)'
                        }}
                      >
                        <p style={{ padding: '0 24px 20px', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Accordion layout support styles responsive rules */}
      <style>{`
        @media (min-width: 992px) {
          .faq-split-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>

    </div>
  );
};

export default Query;
