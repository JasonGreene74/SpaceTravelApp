/**
 * CreateYourOwn.jsx
 *
 * Allows users to design and submit a custom spacecraft.
 * - Form fields for name, cargo capacity, passenger capacity, propulsion, entry/departure, and orbit/landing.
 * - Stores the created craft in parent state via setCustomCrafts (passed as a prop).
 * - Shows a summary of the created craft after submission.
 * - "Send craft on a mission" button directs user to the mission request form, passing the craft name.
 * - "Back to Spacecraft List" and "Back to Dashboard" buttons for navigation.
 * - Uses a NASA background image for styling.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const backgroundStyle = {
  minHeight: '100vh',
  minWidth: '100vw',
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url(https://www.nasa.gov/wp-content/uploads/2024/01/sk011.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 0,
  overflow: 'auto'
};

const propulsionTypes = [
  'Ion Drive',
  'Fusion Drive',
  'Chemical Rocket',
  'Solar Sail',
  'Antimatter',
];

const entryTypes = [
  'Heat Shield',
  'Aerobrake',
  'Direct Entry',
  'Parachute',
];

const orbitTypes = [
  'Low Orbit',
  'Surface Landing',
];

const CreateYourOwn = ({ setCustomCrafts }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cargo, setCargo] = useState('');
  const [passengers, setPassengers] = useState('');
  const [propulsion, setPropulsion] = useState('');
  const [entry, setEntry] = useState('');
  const [orbit, setOrbit] = useState('');
  const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomCrafts(prev => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: `Custom - ${name}`,
        cargo,
        passengers,
        propulsion,
        entry,
        orbit
      }
    ]);
    setCreated(true);
  };

  // send craft to mission control with craft name
  const handleSendToMission = () => {
    navigate('/mission-control', { state: { craftName: name } });
  };

  return (
    <div style={backgroundStyle}>
      <div style={{
        maxWidth: 500,
        margin: '40px auto',
        background: 'rgba(68,62,62,0.92)',
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
        padding: 32,
        color: '#fff'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Create Your Own Spacecraft</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <label>
            Craft Name:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%' }}
              placeholder="Enter craft name"
            />
          </label>
          <label>
            Cargo Capacity (tons):
            <input
              type="number"
              min="0"
              value={cargo}
              onChange={e => setCargo(e.target.value)}
              required
              style={{ width: '100%' }}
              placeholder="e.g. 100"
            />
          </label>
          <label>
            Passenger Capacity:
            <input
              type="number"
              min="1"
              value={passengers}
              onChange={e => setPassengers(e.target.value)}
              required
              style={{ width: '100%' }}
              placeholder="e.g. 10"
            />
          </label>
          <label>
            Propulsion Type:
            <select value={propulsion} onChange={e => setPropulsion(e.target.value)} required style={{ width: '100%' }}>
              <option value="">Select propulsion</option>
              {propulsionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Atmospheric Entry/Departure:
            <select value={entry} onChange={e => setEntry(e.target.value)} required style={{ width: '100%' }}>
              <option value="">Select entry/departure</option>
              {entryTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Orbit/Landing:
            <select value={orbit} onChange={e => setOrbit(e.target.value)} required style={{ width: '100%' }}>
              <option value="">Select option</option>
              {orbitTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            style={{
              marginTop: 12,
              background: '#ffe066',
              border: '2px solid #1976d2',
              color: '#222',
              borderRadius: 8,
              padding: '10px 20px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s, border 0.2s'
            }}
          >
            Create Craft
          </button>
        </form>
        {created && (
          <div style={{ marginTop: 32 }}>
            <h2>Craft Created!</h2>
            <p>
              <b>Name:</b> {name}<br />
              <b>Cargo Capacity:</b> {cargo} tons<br />
              <b>Passenger Capacity:</b> {passengers}<br />
              <b>Propulsion:</b> {propulsion}<br />
              <b>Entry/Departure:</b> {entry}<br />
              <b>Orbit/Landing:</b> {orbit}
            </p>
            <button
              style={{
                marginTop: 16,
                background: '#ffe066',
                border: '2px solid #1976d2',
                color: '#222',
                borderRadius: 8,
                padding: '10px 20px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              onClick={handleSendToMission}
              disabled={!name}
            >
              Send "{name}" on a Mission
            </button>
          </div>
        )}
        <div style={{ height: '40px' }} />
        <button
          className="back-btn"
          onClick={() => navigate('/spacecrafts')}
        >
          ← Back to Spacecraft List
        </button>
        <button
          className="back-btn"
          style={{ marginLeft: 12 }}
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateYourOwn;