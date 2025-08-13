import React from 'react';
import { Link } from 'react-router-dom';

/**
 
 * The main dashboard for the Space Travel App
 * Displays navigation links to spacecrafts, planets, and mission control
 * Uses a background image from Nasa.gov
 * Large, styled text and yellow links for visibility
 */

const backgroundStyle = {
  minHeight: '100vh',
  backgroundImage: 'url(https://assets.science.nasa.gov/dynamicimage/assets/science/missions/hubble/galaxies/spiral/Hubble_NGC1309_potw2530a.jpg?w=1536&h=1520&fit=crop&crop=faces%2Cfocalpoint)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  paddingTop: '48px'
};

const linkStyle = {
  color: '#ffe066',
  fontWeight: 'bold',
  fontSize: '1.25rem',
  textDecoration: 'none',
  margin: '0 8px'
};

const HomePage = () => (
  <div style={backgroundStyle}>
    <h1 style={{ fontSize: '2.8rem', marginBottom: 16 }}>Space Travel Dashboard</h1>
    <p style={{ fontSize: '1.4rem', marginBottom: 32 }}>
      Welcome! Manage spacecrafts, explore planets, and dispatch missions.
    </p>
    <nav>
      <Link to="/spacecrafts" style={linkStyle}>Spacecrafts</Link>
      <span style={{ color: '#ffe066', fontSize: '1.25rem' }}>|</span>
      <Link to="/planets" style={linkStyle}>Planets</Link>
      <span style={{ color: '#ffe066', fontSize: '1.25rem' }}>|</span>
      <Link to="/mission-control" style={linkStyle} className="dashboard-link">
        Mission Control Center
      </Link>
    </nav>
  </div>
);

export default HomePage;