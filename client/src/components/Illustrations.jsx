import React from 'react';
import { MapPin } from 'lucide-react';

// Wheel rotation & cloud floating styles embedded inside SVGs to keep them independent
const inlineStyles = `
  @keyframes spinWheel {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes floatCloud {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(15px, -5px); }
  }
  @keyframes pulseMapNode {
    0%, 100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 2px rgba(6,182,212,0.5)); }
    50% { transform: scale(1.12) translateY(-2px); filter: drop-shadow(0 0 10px rgba(6,182,212,0.8)); }
  }
  @keyframes carMoveForward {
    0% { transform: translateX(-40px); }
    100% { transform: translateX(440px); }
  }
  @keyframes signalBlink {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  @keyframes lockGlow {
    0%, 100% { filter: drop-shadow(0 0 4px rgba(99,102,241,0.4)); }
    50% { filter: drop-shadow(0 0 12px rgba(99,102,241,0.8)); }
  }
  .spin-wheel {
    transform-origin: center;
    transform-box: fill-box;
    animation: spinWheel 1.5s infinite linear;
  }
  .float-cloud {
    animation: floatCloud 5s infinite ease-in-out;
  }
  .pulse-pin {
    transform-origin: center;
    transform-box: fill-box;
    animation: pulseMapNode 2.5s infinite ease-in-out;
  }
  .blink-dot {
    animation: signalBlink 1.5s infinite ease-in-out;
  }
  .glow-lock {
    animation: lockGlow 3s infinite ease-in-out;
  }
`;

// 1. Home Page Hero Illustration
export const HomeHeroIllustration = () => (
  <svg viewBox="0 0 500 350" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <style>{`
      ${inlineStyles}
      @keyframes headlightPulse {
        0%, 100% { opacity: 0.15; filter: drop-shadow(0 0 5px rgba(6, 182, 212, 0.4)); }
        50% { opacity: 0.6; filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.85)); }
      }
      @keyframes carIdleVibe {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-1.5px); }
      }
      .car-idle-group {
        animation: carIdleVibe 2s infinite ease-in-out;
      }
      .headlight-glow-path {
        animation: headlightPulse 3s infinite ease-in-out;
      }
    `}</style>
    
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#08111F" stopOpacity="0" />
        <stop offset="100%" stopColor="#0F172A" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(6, 182, 212, 0.8)" />
        <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
      </linearGradient>
    </defs>

    {/* Background City Skyline - Outline blocks in inDrive illustration style */}
    <g stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" fill="none">
      {/* City blocks silhouettes */}
      <rect x="30" y="100" width="80" height="170" rx="6" />
      <rect x="130" y="60" width="90" height="210" rx="6" />
      <rect x="240" y="120" width="70" height="150" rx="6" />
      <rect x="330" y="80" width="80" height="190" rx="6" />
      <rect x="430" y="130" width="55" height="140" rx="6" />
      
      {/* Decorative window grids */}
      <line x1="70" y1="120" x2="70" y2="250" strokeDasharray="5 15" />
      <line x1="175" y1="80" x2="175" y2="240" strokeDasharray="5 15" />
      <line x1="370" y1="100" x2="370" y2="250" strokeDasharray="5 15" />
    </g>

    {/* Floating Clouds */}
    <g className="float-cloud" opacity="0.25">
      <path d="M 50,60 Q 65,45 80,60 Q 95,55 110,65 Q 120,85 100,90 L 60,90 Q 45,75 50,60 Z" fill="#94A3B8" />
      <path d="M 380,40 Q 395,25 410,40 Q 425,35 440,45 Q 450,65 430,70 L 390,70 Q 375,55 380,40 Z" fill="#94A3B8" />
    </g>

    {/* Road Grid */}
    <rect x="10" y="270" width="480" height="30" fill="#1E293B" rx="6" />
    <line x1="10" y1="285" x2="490" y2="285" stroke="#475569" strokeWidth="2" strokeDasharray="15 15" />

    {/* Car Headlight Beam Glow */}
    <path className="headlight-glow-path" d="M 312,230 L 480,210 L 480,265 L 312,242 Z" fill="url(#headlightBeam)" />

    {/* Modern Electric Car (Faced Right, idling vibe animation) */}
    <g className="car-idle-group" transform="translate(160, 205)">
      {/* Car shadow */}
      <ellipse cx="75" cy="58" rx="80" ry="7" fill="#000" opacity="0.4" />
      
      {/* Main Body */}
      <path d="M 3,42 L 3,36 Q 5,36 10,26 Q 14,20 28,20 L 115,20 Q 128,20 138,32 L 152,32 Q 158,32 158,42 L 155,50 Q 155,56 145,56 L 10,56 Q 3,56 3,42 Z" fill="url(#cyanGlow)" />
      
      {/* Glass Windows */}
      <path d="M 22,24 L 65,24 L 65,36 L 14,36 Z" fill="#070A13" />
      <path d="M 70,24 L 110,24 L 122,36 L 70,36 Z" fill="#070A13" />
      
      {/* Headlights & Tail Lights */}
      <path d="M 154,42 L 158,44 L 154,46 Z" fill="#06B6D4" />
      <path d="M 4,42 L 2,44 L 4,46 Z" fill="#F87171" />

      {/* Rotating/idling Wheels */}
      <g className="spin-wheel" transform="translate(35, 56)">
        <circle cx="0" cy="0" r="14" fill="#070A13" stroke="#475569" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
      </g>
      <g className="spin-wheel" transform="translate(115, 56)">
        <circle cx="0" cy="0" r="14" fill="#070A13" stroke="#475569" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
      </g>
    </g>

    {/* Cool Leaning Person Silhouette (Leaning casually against the car hood) */}
    <g transform="translate(292, 202)">
      {/* Hair */}
      <path d="M 10,10 Q 15,3 23,10 L 21,5 Q 15,0 8,8 Z" fill="#070A13" />
      {/* Head */}
      <circle cx="15" cy="13" r="7" fill="#E2E8F0" />
      {/* Neck */}
      <rect x="13" y="19" width="4" height="6" fill="#CBD5E1" />
      
      {/* Torso & Arm Leaning (Arms crossed in casual style) */}
      <path d="M 8,24 L 22,24 L 25,72 L 6,72 Z" fill="url(#purpleGlow)" stroke="rgba(255,255,255,0.08)" />
      {/* Crossed arms outline */}
      <path d="M 5,30 Q 15,40 25,30" stroke="#CBD5E1" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 8,34 Q 15,44 22,34" stroke="#CBD5E1" strokeWidth="3" fill="none" strokeLinecap="round" />
      
      {/* Legs (leaning angle) */}
      <path d="M 6,72 L 25,72 L 20,126 L 4,126 Z" fill="#1E293B" stroke="rgba(255,255,255,0.04)" />
      
      {/* Shoes */}
      <path d="M 4,126 L 11,126 L 9,132 L 1,132 Z" fill="#0F172A" />
      <path d="M 13,126 L 20,126 L 18,132 L 10,132 Z" fill="#0F172A" />
    </g>
  </svg>
);

// 2. Find Ride Page - Passenger searching illustration
export const FindRideIllustration = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%">
    <style>{inlineStyles}</style>
    <defs>
      <linearGradient id="purpleBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="cyanBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    
    {/* Map Radar Rings */}
    <circle cx="200" cy="150" r="120" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.1" />
    <circle cx="200" cy="150" r="80" fill="none" stroke="#06B6D4" strokeWidth="1.5" opacity="0.2" className="pulse-pin" />
    <circle cx="200" cy="150" r="40" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />

    {/* Map Grid Roads lines background */}
    <line x1="80" y1="30" x2="320" y2="270" stroke="#1E293B" strokeWidth="3" opacity="0.5" />
    <line x1="80" y1="270" x2="320" y2="30" stroke="#1E293B" strokeWidth="3" opacity="0.5" />
    <line x1="200" y1="30" x2="200" y2="270" stroke="#334155" strokeWidth="4" opacity="0.3" />

    {/* Suitcase Illustration */}
    <g transform="translate(60, 180)">
      <rect x="0" y="10" width="40" height="50" rx="8" fill="url(#purpleBlue)" />
      <rect x="5" y="15" width="30" height="40" rx="4" fill="none" stroke="#0F172A" strokeWidth="2" opacity="0.4" />
      <path d="M 12,10 L 12,0 L 28,0 L 28,10" fill="none" stroke="#475569" strokeWidth="3" />
      {/* Wheels */}
      <circle cx="8" cy="62" r="4" fill="#070A13" />
      <circle cx="32" cy="62" r="4" fill="#070A13" />
    </g>

    {/* Multiple Available Cars scattered on map */}
    <g transform="translate(110, 80)">
      <rect x="0" y="0" width="36" height="16" rx="4" fill="#06B6D4" />
      <circle cx="10" cy="16" r="4" fill="#070A13" />
      <circle cx="26" cy="16" r="4" fill="#070A13" />
    </g>
    <g transform="translate(260, 200)">
      <rect x="0" y="0" width="36" height="16" rx="4" fill="#8B5CF6" />
      <circle cx="10" cy="16" r="4" fill="#070A13" />
      <circle cx="26" cy="16" r="4" fill="#070A13" />
    </g>

    {/* Search Center Pin */}
    <g className="pulse-pin" transform="translate(200, 150)">
      <circle cx="0" cy="0" r="16" fill="#070A13" stroke="#F97316" strokeWidth="3" />
      <MapPin size={16} color="#F97316" style={{ transform: 'translate(-8px, -9px)' }} />
    </g>
  </svg>
);

// 3. Offer Ride Page - Driver opening car door
export const OfferRideIllustration = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%">
    <style>{inlineStyles}</style>
    <defs>
      <linearGradient id="purpleCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>

    {/* Flat vector background elements */}
    <circle cx="200" cy="150" r="110" fill="url(#purpleCyan)" opacity="0.08" />

    {/* Route visualization */}
    <path d="M 50,180 Q 200,70 350,180" stroke="url(#purpleCyan)" strokeWidth="3" strokeDasharray="6 4" fill="none" opacity="0.6" />

    {/* Driver opening door mockup */}
    <g transform="translate(90, 100)">
      {/* Car structure back */}
      <rect x="20" y="30" width="180" height="70" rx="14" fill="#0F172A" stroke="url(#purpleCyan)" strokeWidth="2.5" />
      <rect x="50" y="40" width="50" height="30" rx="4" fill="#070A13" />
      <rect x="120" y="40" width="50" height="30" rx="4" fill="#070A13" />
      {/* Rotating Wheels */}
      <g className="spin-wheel" transform="translate(55, 100)">
        <circle cx="0" cy="0" r="14" fill="#070A13" stroke="#475569" strokeWidth="2" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#94A3B8" strokeWidth="2" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#94A3B8" strokeWidth="2" />
      </g>
      <g className="spin-wheel" transform="translate(165, 100)">
        <circle cx="0" cy="0" r="14" fill="#070A13" stroke="#475569" strokeWidth="2" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#94A3B8" strokeWidth="2" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#94A3B8" strokeWidth="2" />
      </g>

      {/* Opening Door Overlay */}
      <path d="M 120,40 L 150,30 L 150,90 L 120,80 Z" fill="url(#orangeGlow)" opacity="0.95" />
    </g>

    {/* Location Pins */}
    <g className="pulse-pin" transform="translate(50, 180)">
      <circle cx="0" cy="0" r="10" fill="#070A13" stroke="#06B6D4" strokeWidth="2.5" />
    </g>
    <g className="pulse-pin" transform="translate(350, 180)">
      <circle cx="0" cy="0" r="10" fill="#070A13" stroke="#F97316" strokeWidth="2.5" />
    </g>
  </svg>
);

// 4. Contact Page - Support Illustration
export const ContactIllustration = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%">
    <style>{inlineStyles}</style>
    <defs>
      <linearGradient id="supportGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    <circle cx="200" cy="150" r="110" fill="url(#supportGrad)" opacity="0.06" />

    {/* Laptop screen mock */}
    <g transform="translate(100, 110)">
      <rect x="0" y="0" width="200" height="120" rx="10" fill="#0F172A" stroke="#475569" strokeWidth="3" />
      {/* Screen area */}
      <rect x="8" y="8" width="184" height="96" rx="6" fill="#070A13" />
      {/* Dashboard chart mockup */}
      <path d="M 20,80 L 60,40 L 100,60 L 140,30 L 170,70" stroke="#06B6D4" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="140" cy="30" r="4" fill="#F97316" className="pulse-pin" />
      {/* Base */}
      <path d="M -20,120 L 220,120 L 210,132 L -10,132 Z" fill="#334155" />
    </g>

    {/* Floating Chat Bubbles */}
    <g className="float-cloud" style={{ animationDuration: '6s' }} transform="translate(60, 40)">
      <rect x="0" y="0" width="90" height="40" rx="12" fill="#2563EB" />
      <polygon points="20,40 30,40 25,48" fill="#2563EB" />
      <circle cx="25" cy="20" r="3" fill="white" className="blink-dot" style={{ animationDelay: '0s' }} />
      <circle cx="35" cy="20" r="3" fill="white" className="blink-dot" style={{ animationDelay: '0.3s' }} />
      <circle cx="45" cy="20" r="3" fill="white" className="blink-dot" style={{ animationDelay: '0.6s' }} />
    </g>

    <g className="float-cloud" style={{ animationDuration: '8s' }} transform="translate(240, 60)">
      <rect x="0" y="0" width="100" height="40" rx="12" fill="#06B6D4" />
      <polygon points="70,40 80,40 75,48" fill="#06B6D4" />
      <path d="M 20,20 Q 50,10 80,20" stroke="white" strokeWidth="2.5" fill="none" />
      <circle cx="80" cy="20" r="3" fill="#F97316" />
    </g>
  </svg>
);

// 5. FAQ Page - Speech Bubbles
export const FAQIllustration = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%">
    <style>{inlineStyles}</style>
    <defs>
      <linearGradient id="faqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
    </defs>
    
    <circle cx="200" cy="150" r="110" fill="url(#faqGrad)" opacity="0.06" />

    {/* Customer Help Hub SVG */}
    <g transform="translate(80, 70)">
      {/* Big glowing question mark */}
      <text x="100" y="110" fill="url(#faqGrad)" fontSize="130" fontWeight="900" opacity="0.8" style={{ fontFamily: 'Outfit' }} className="pulse-pin">?</text>
    </g>

    {/* Chat bubbles */}
    <g className="float-cloud" transform="translate(40, 50)">
      <rect x="0" y="0" width="120" height="44" rx="14" fill="#1E293B" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="15" y="26" fill="white" fontSize="11" fontWeight="700">How do I verify?</text>
      <polygon points="30,44 40,44 35,50" fill="#1E293B" />
    </g>

    <g className="float-cloud" style={{ animationDelay: '2.5s' }} transform="translate(240, 160)">
      <rect x="0" y="0" width="120" height="44" rx="14" fill="#2563EB" />
      <text x="15" y="26" fill="white" fontSize="11" fontWeight="700">Matches verified! ✓</text>
      <polygon points="70,44 80,44 75,50" fill="#2563EB" />
    </g>
  </svg>
);

// 6. Login Page - Map Routing Visual Illustration
export const LoginIllustration = () => (
  <svg viewBox="0 0 400 320" width="100%" height="100%" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
    <style>{inlineStyles}</style>
    
    {/* Ocean/Water Body */}
    <rect x="0" y="0" width="400" height="320" fill="#a0c4eb" />
    
    {/* Sandy Beach Coastline Edge */}
    <path d="M 80,0 L 400,0 L 400,320 L 280,320 C 270,250 250,220 230,200 C 210,180 180,170 160,150 C 130,120 110,80 80,0 Z" fill="none" stroke="#e6d6b8" strokeWidth="8" />
    
    {/* Coastline Landmass */}
    <path d="M 80,0 L 400,0 L 400,320 L 280,320 C 270,250 250,220 230,200 C 210,180 180,170 160,150 C 130,120 110,80 80,0 Z" fill="#fcfbf7" />

    {/* Street Grids (Wide yellow/warm roads) */}
    <g fill="none" strokeLinecap="round">
      {/* Coastal avenue */}
      <path d="M 95,0 C 125,75 145,115 175,145 C 195,165 225,175 245,195 C 265,215 285,245 295,320" stroke="#fff2d4" strokeWidth="12" />
      <path d="M 95,0 C 125,75 145,115 175,145 C 195,165 225,175 245,195 C 265,215 285,245 295,320" stroke="#ffe4ab" strokeWidth="6" />

      {/* Main avenues */}
      <path d="M 220,0 L 220,320" stroke="#fff1d4" strokeWidth="10" />
      <path d="M 220,0 L 220,320" stroke="#ffe4ab" strokeWidth="4" />

      <path d="M 320,0 L 320,320" stroke="#fff1d4" strokeWidth="10" />
      <path d="M 320,0 L 320,320" stroke="#ffe4ab" strokeWidth="4" />

      {/* Secondary streets */}
      <path d="M 120,40 L 400,40" stroke="#fff5df" strokeWidth="6" />
      <path d="M 160,90 L 400,90" stroke="#fff5df" strokeWidth="6" />
      <path d="M 220,150 L 400,150" stroke="#fff5df" strokeWidth="6" />
      <path d="M 270,220 L 400,220" stroke="#fff5df" strokeWidth="6" />
      <path d="M 300,280 L 400,280" stroke="#fff5df" strokeWidth="6" />
    </g>

    {/* Highlighted active route connecting Pin 2 to Pin 1 */}
    <path d="M 135,100 C 145,115 175,145 195,165 C 225,175 245,195 255,205" fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />

    {/* Amenity pins/Markers on map */}
    {/* Red Restaurant Pin 1 */}
    <g transform="translate(260, 60)">
      <circle cx="0" cy="0" r="9" fill="#ef4444" stroke="#fff" strokeWidth="1" />
      <path d="M -3,-4 L -3,1 L -1,1 L -1,-4 M 2,-4 L 2,0 C 2,2 0,2 0,0 L 0,-4" fill="none" stroke="#fff" strokeWidth="1" />
    </g>
    {/* Red Restaurant Pin 2 */}
    <g transform="translate(360, 240)">
      <circle cx="0" cy="0" r="9" fill="#ef4444" stroke="#fff" strokeWidth="1" />
      <path d="M -3,-4 L -3,1 L -1,1 L -1,-4 M 2,-4 L 2,0 C 2,2 0,2 0,0 L 0,-4" fill="none" stroke="#fff" strokeWidth="1" />
    </g>
    
    {/* Purple Hotel Pin */}
    <g transform="translate(300, 150)">
      <circle cx="0" cy="0" r="9" fill="#8b5cf6" stroke="#fff" strokeWidth="1" />
      <path d="M -4,2 L -4,-3 L -2,-3 M -2,-1 L 3,-1 L 3,2 Z M 1,-1 L 1,-3" fill="none" stroke="#fff" strokeWidth="1" />
    </g>

    {/* Green Park Pin */}
    <g transform="translate(105, 75)">
      <circle cx="0" cy="0" r="9" fill="#10b981" stroke="#fff" strokeWidth="1" />
      <path d="M -4,3 L 0,-3 L 4,3 Z" fill="none" stroke="#fff" strokeWidth="1" />
    </g>

    {/* Start Pin 1 (Blueberry theme color) */}
    <g transform="translate(255, 205)" className="pulse-pin">
      <path d="M 0 0 C -6 -6 -12 -12 -12 -20 C -12 -28 -6 -34 0 -34 C 6 -34 12 -28 12 -20 C 12 -12 6 -6 0 0 Z" fill="var(--electric-blue)" stroke="#fff" strokeWidth="1.2" />
      <circle cx="0" cy="-20" r="7" fill="#fff" />
      <text x="0" y="-17" textAnchor="middle" fill="var(--electric-blue)" fontSize="9" fontWeight="800">1</text>
    </g>

    {/* End Pin 2 (Apricot theme color) */}
    <g transform="translate(135, 100)" className="pulse-pin" style={{ animationDelay: '1s' }}>
      <path d="M 0 0 C -6 -6 -12 -12 -12 -20 C -12 -28 -6 -34 0 -34 C 6 -34 12 -28 12 -20 C 12 -12 6 -6 0 0 Z" fill="var(--primary)" stroke="#fff" strokeWidth="1.2" />
      <circle cx="0" cy="-20" r="7" fill="#fff" />
      <text x="0" y="-17" textAnchor="middle" fill="var(--primary)" fontSize="9" fontWeight="800">2</text>
    </g>

    {/* Floating widget card */}
    <g transform="translate(265, 12)">
      <rect x="0" y="0" width="120" height="30" rx="8" fill="#ffffff" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      {/* Map symbol */}
      <circle cx="16" cy="15" r="7" fill="var(--primary)" />
      <circle cx="16" cy="15" r="3" fill="#fff" />
      <text x="32" y="19" fill="#2a323d" fontSize="9" fontWeight="800" style={{ fontFamily: 'Outfit' }}>Waikiki Route</text>
    </g>
  </svg>
);

// 7. Mobile App Mockup Illustration
export const MobileAppIllustration = () => (
  <svg viewBox="0 0 320 400" width="100%" height="100%">
    <style>{inlineStyles}</style>
    <defs>
      <linearGradient id="phoneBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    
    <g transform="translate(60, 20)">
      {/* Outer Chassis */}
      <rect x="0" y="0" width="200" height="360" rx="28" fill="#0F172A" stroke="url(#phoneBorder)" strokeWidth="4.5" />
      {/* Screen */}
      <rect x="8" y="8" width="184" height="344" rx="22" fill="#070A13" />
      {/* Camera notch */}
      <rect x="65" y="8" width="70" height="15" rx="7" fill="#0F172A" />
      
      {/* Map visual inside Mockup screen */}
      <circle cx="100" cy="140" r="60" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.2" />
      <path d="M 30,120 Q 90,80 160,170" stroke="#06B6D4" strokeWidth="3" fill="none" opacity="0.6" />
      
      {/* Location Pin */}
      <g className="pulse-pin" transform="translate(90, 100)">
        <circle cx="0" cy="0" r="8" fill="#070A13" stroke="#F97316" strokeWidth="2" />
      </g>

      {/* Booking Card UI overlay */}
      <g transform="translate(20, 220)">
        <rect x="0" y="0" width="160" height="100" rx="14" fill="rgba(30,41,59,0.9)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="14" y="24" fill="white" fontSize="11" fontWeight="800">Ride Confirmed! 🚗</text>
        <text x="14" y="44" fill="#94A3B8" fontSize="9">Driver: Vikram Malhotra</text>
        <text x="14" y="58" fill="#94A3B8" fontSize="9">Vehicle: MH 12 AB 8899</text>
        {/* Rating stars */}
        <text x="14" y="78" fill="#FBBF24" fontSize="10">⭐⭐⭐⭐⭐ 4.9</text>
        {/* Track bubble */}
        <rect x="110" y="15" width="38" height="14" rx="4" fill="#06B6D4" />
        <text x="116" y="25" fill="white" fontSize="8" fontWeight="800">LIVE</text>
      </g>
    </g>
  </svg>
);
