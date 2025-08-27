/**

 * creates the Mission Control Transport Request Form
 * Allows users to select a departure planet, destination planet, spacecraft, passenger count, and main contact
 * Provides informational text to guide the user
 * Shows a summary after dispatching a mission
 * Includes a background image from Nasa.gov
 * "Back to Dashboard" button returns to the homepage
 
 * Props:
 *   - planets: Array of planet objects for selection
 *   - spacecrafts: Array of spacecraft objects for selection
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const backgroundStyle = {
  minHeight: '100vh',
  minWidth: '100vw',
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url(https://www.nasa.gov/wp-content/uploads/2021/04/roman_udf.png?resize=1536,864)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: 0,
  overflow: 'auto'
};

const MissionControl = ({ planets, spacecrafts, decommissionedCrafts }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const customCraft = location.state?.craftName;
  const [fromPlanet, setFromPlanet] = useState('');
  const [toPlanet, setToPlanet] = useState('');
  const [spacecraft, setSpacecraft] = useState(customCraft || '');
  const [passengers, setPassengers] = useState(1);
  const [mainContact, setMainContact] = useState('');
  const [mission, setMission] = useState(null);

  const handleDispatch = () => {
    setMission({
      from: fromPlanet,
      to: toPlanet,
      craft: spacecraft,
      passengers,
      mainContact,
    });
  };

  return (
    <div style={backgroundStyle}>
      <div style={{
        maxWidth: 480,
        margin: '40px auto',
        background: 'rgba(68, 62, 62, 0.92)',
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
        padding: 32,
        color: '#fff'
      }}>
        <h1 style={{ marginBottom: 24, textAlign: 'center' }}>
          Mission Control Transport Request Form
        </h1>

        {/* informational text above planet menu options */}
        <div style={{ marginBottom: 12, color: '#fff', fontSize: '1.05rem' }}>
          The transport missions are carried out by drone. It is your responsibility to ensure the planet is suitable for your passengers.
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleDispatch();
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          {/* From and To on the same row */}
          <div style={{ display: 'flex', gap: 16 }}>
            <label style={{ flex: 1 }}>
              From:
              <select value={fromPlanet} onChange={e => setFromPlanet(e.target.value)} required style={{ width: '100%' }}>
                <option value="">Select planet</option>
                {planets.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </label>
            <label style={{ flex: 1 }}>
              To:
              <select value={toPlanet} onChange={e => setToPlanet(e.target.value)} required style={{ width: '100%' }}>
                <option value="">Select planet</option>
                {planets.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </label>
          </div>

          {/* informational text above spacecraft menu options */}
          <div style={{ marginBottom: 12, color: '#fff', fontSize: '1.05rem' }}>
            It is your responsibility to choose the craft capable of carrying the appropriate number of passengers, the desired speed and atmospheric entry method.
          </div>

          {/* Spacecraft and Passengers on the same row */}
          <div style={{ display: 'flex', gap: 16 }}>
            <label style={{ flex: 1 }}>
              Spacecraft:
              <select
                value={spacecraft}
                onChange={e => setSpacecraft(e.target.value)}
                required
                style={{ width: '100%' }}
              >
                <option value="">Select spacecraft</option>
                {/* Add custom craft as an option if present and not already in the list */}
                {customCraft && !spacecrafts.some(s => s.name === customCraft) && (
                  <option value={customCraft}>{customCraft}</option>
                )}
                {spacecrafts.map(s => (
                  <option
                    key={s.id}
                    value={s.name}
                    disabled={decommissionedCrafts.includes(s.id)}
                    style={
                      decommissionedCrafts.includes(s.id)
                        ? { color: 'red', background: '#fff0f0' }
                        : {}
                    }
                  >
                    {s.name}
                    {decommissionedCrafts.includes(s.id) ? ' (Decommissioned)' : ''}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ flex: 1 }}>
              Passengers:
              <input
                type="number"
                min="1"
                value={passengers}
                onChange={e => setPassengers(Number(e.target.value))}
                required
                style={{ width: '100%' }}
              />
            </label>
          </div>

          {/* uswer input text section */}
          <div style={{ margin: '12px 0', color: '#fff', fontSize: '1.05rem' }}>
            Please provide the main contact for this mission. This person will be responsible for all communications and coordination.
          </div>

          <label>
            Main Contact:
            <textarea
              value={mainContact}
              onChange={e => setMainContact(e.target.value)}
              rows={3}
              placeholder="Insert main contact name, rank and current star system for transport request"
              required
              style={{ resize: 'vertical', width: '100%' }}
            />
          </label>

          <button
            type="submit"
            disabled={!fromPlanet || !toPlanet || !spacecraft || !mainContact}
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
            Dispatch Mission
          </button>
        </form>

        {mission && (
          <div style={{ marginTop: 32 }}>
            <h2>Mission Dispatched!</h2>
            <p>
              {mission.passengers} passenger(s) from <b>{mission.from}</b> to <b>{mission.to}</b> aboard <b>{mission.craft}</b>.<br />
              <b>Main Contact:</b> {mission.mainContact}
            </p>
          </div>
        )}

        <div style={{ height: '80px' }} />

        <button
          className="back-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MissionControl;