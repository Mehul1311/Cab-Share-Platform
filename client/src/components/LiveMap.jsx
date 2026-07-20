import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LiveMap.css';


// Custom Car Icon (SVG)
const carIconHtml = `
  <div class="map-car-icon">
    <div class="car-pulse"></div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--electric-blue)" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
    </svg>
  </div>
`;

const carIcon = L.divIcon({
  html: carIconHtml,
  className: 'custom-car-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// User/Destination Pin
const pinIconHtml = (color) => `
  <div class="map-pin-icon" style="background-color: ${color}">
    <div class="pin-pulse" style="border-color: ${color}"></div>
  </div>
`;

const originIcon = L.divIcon({
  html: pinIconHtml('var(--vibrant-cyan)'),
  className: 'custom-pin-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const destIcon = L.divIcon({
  html: pinIconHtml('var(--orange-accent)'),
  className: 'custom-pin-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const LiveMap = ({ role = 'User' }) => {
  // Demonstration Coordinates (Mumbai)
  const routePoints = useMemo(() => [
    [19.0760, 72.8777], // Origin
    [19.0960, 72.8977], // Midpoint 1
    [19.1160, 72.8877], // Midpoint 2
    [19.1360, 72.9077]  // Destination
  ], []);

  const origin = routePoints[0];
  const destination = routePoints[routePoints.length - 1];

  const [cabPosition, setCabPosition] = useState(origin);
  const [progress, setProgress] = useState(0);

  // Animate Cab along the route
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 0.005; // speed of animation
      if (currentProgress >= 1) {
        currentProgress = 0; // Loop the animation for demo purposes
      }
      setProgress(currentProgress);

      // Simple linear interpolation between route points
      const segmentIndex = Math.floor(currentProgress * (routePoints.length - 1));
      const segmentProgress = (currentProgress * (routePoints.length - 1)) - segmentIndex;
      
      const p1 = routePoints[segmentIndex];
      const p2 = routePoints[segmentIndex + 1];
      
      if (p1 && p2) {
        const lat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
        const lng = p1[1] + (p2[1] - p1[1]) * segmentProgress;
        setCabPosition([lat, lng]);
      }

    }, 50); // 20fps updates

    return () => clearInterval(interval);
  }, [routePoints]);

  return (
    <div className="live-map-container glass-panel">
      
      {/* Overlay Status Bar */}
      <div className="live-map-overlay">
        <div className="map-status-pill">
          <div className="pulse-dot-cyan"></div>
          {role === 'Driver' ? 'Broadcasting Live Location...' : 'Tracking your ride in real-time...'}
        </div>
      </div>

      <MapContainer 
        center={[19.1060, 72.8877]} 
        zoom={13} 
        style={{ height: '100%', width: '100%', borderRadius: '16px' }}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        {/* Dark Mode Map Tiles (CartoDB Dark Matter) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Route Line */}
        <Polyline 
          positions={routePoints} 
          color="var(--electric-blue)" 
          weight={4} 
          opacity={0.6}
          dashArray="10, 10" 
        />

        {/* Markers */}
        <Marker position={origin} icon={originIcon}>
          <Popup>Pickup Location</Popup>
        </Marker>
        
        <Marker position={destination} icon={destIcon}>
          <Popup>Dropoff Location</Popup>
        </Marker>

        <Marker position={cabPosition} icon={carIcon}>
          <Popup>Verified Driver {Math.floor(progress * 100)}% to destination</Popup>
        </Marker>

      </MapContainer>
    </div>
  );
};

export default LiveMap;
