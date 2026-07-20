import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Query = ({ isEmbedded = false }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      q: "How do I book a ride share?", 
      a: "You can book a ride share on our mobile app, or on our website. Simply search for your destination, choose the date you want to travel and pick the ride that suits you best! Some rides can be booked instantly, while other rides require manual approval. Once approved, you'll receive driver details and a real-time tracking link." 
    },
    { 
      q: "How do I publish a ride share?", 
      a: "Offering a ride share on our platform is easy. To publish your ride, use our mobile app or website. Indicate your departure and arrival points, the date and time of your departure, how many passengers you can take and the price per seat. You'll also need to verify your vehicle details to ensure passenger safety." 
    },
    { 
      q: "How do I cancel my ride share?", 
      a: "If you have a change of plans, you can always cancel your ride share from the 'Your rides' section of our app. The sooner you cancel, the better. That way the driver has time to accept new passengers. The amount of your refund will depend on how far in advance you cancel before the scheduled departure." 
    },
    { 
      q: "What are the benefits of travelling by ride share?", 
      a: "There are multiple advantages to ride sharing over other means of transport. Travelling by ride share is usually more affordable, especially for longer distances. Ride sharing is also more eco-friendly, as sharing a car means there will be fewer cars on the road, significantly reducing carbon emissions." 
    },
    { 
      q: "How much does a ride share cost?", 
      a: "The costs of a ride share can vary greatly, and depend on factors like distance, time of departure, the demand of that ride and more. It is also up to the driver to decide how much to charge per seat within our fair pricing guidelines, so it's hard to put an exact price tag on a ride before searching." 
    },
    { 
      q: "How do I start ride sharing?", 
      a: "Ride sharing with us is super easy, and free to join! Simply sign up for an account and tell us some basic details about yourself. Once you have an account and pass our quick verification, you can start booking or publishing rides directly on our app or website." 
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: isEmbedded ? '0px' : '20px', paddingBottom: isEmbedded ? '0px' : '60px', position: 'relative', minHeight: 'fit-content' }}>
      
      {/* Decorative blurred background blobs */}
      <div className="contact-blob contact-blob-1" style={{ position: 'absolute', top: '0', right: '-10%', width: '400px', height: '400px', opacity: 0.1, borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="contact-blob contact-blob-2" style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '400px', height: '400px', opacity: 0.1, background: 'var(--orange-accent)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }}></div>

      <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
          Ride Share Help Centre
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Everything you need to know about booking, offering, and managing your ride shares on our platform.
        </p>
      </div>

      <div className="query-accordion-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`query-accordion-item glass-panel ${isOpen ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="query-accordion-header">
                <h3>{faq.q}</h3>
                <div className="query-icon-wrap">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              <div className="query-accordion-body" style={{ maxHeight: isOpen ? '200px' : '0', opacity: isOpen ? 1 : 0 }}>
                <p>{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px', position: 'relative', zIndex: 10 }}>
        <button className="btn-read-more-help">
          Browse All Help Topics
        </button>
      </div>

      <style>{`
        .query-accordion-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          z-index: 10;
        }
        
        .query-accordion-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .query-accordion-item:hover {
          border-color: rgba(6, 182, 212, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .query-accordion-item.active {
          border-color: var(--electric-blue);
          background: rgba(17, 24, 39, 0.6);
        }

        .query-accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
        }

        .query-accordion-header h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          padding-right: 20px;
        }

        .query-icon-wrap {
          color: var(--electric-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.1);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .query-accordion-item.active .query-icon-wrap {
          background: var(--electric-blue);
          color: white;
        }

        .query-accordion-body {
          padding: 0 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .query-accordion-body p {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          margin-top: 0;
          margin-bottom: 16px;
        }

        .btn-read-more-help {
          background: linear-gradient(135deg, var(--electric-blue), var(--vibrant-indigo));
          color: white;
          border: none;
          padding: 16px 36px;
          border-radius: 30px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-read-more-help:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Query;
