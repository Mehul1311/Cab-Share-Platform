import React from 'react';

const About = () => {
  return (
    <div className="container animate-fade-in" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '24px', fontSize: '2.5rem', textAlign: 'center' }}>About RideShare</h1>
        <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
          Welcome to RideShare, the premium cab sharing platform designed to make your daily commute seamless, affordable, and eco-friendly. Built by a dedicated team of developers, our mission is to connect drivers with empty seats to passengers heading the same way.
        </p>
        <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
          Whether you are an Admin managing the platform, a Driver looking to share your route, or a User in need of a quick ride, we provide a unified and secure environment for everyone.
        </p>
        <h3 style={{ marginTop: '40px', marginBottom: '16px' }}>Our Team</h3>
        <p style={{ fontSize: '1.1rem' }}>
          We are a group of passionate technologists who believe in the power of shared mobility to reduce traffic congestion and carbon footprints. Join us in our journey to revolutionize transportation!
        </p>
      </div>
    </div>
  );
};

export default About;
