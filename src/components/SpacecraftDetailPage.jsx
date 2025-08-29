import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';

/**
 
 * Shows information for a selected spacecraft
 * Fetches spacecraft data from the SWAPI API using the ID from the URL endpoint
 * Displays all relevant spacecraft details
 * "Back to spacecraft list" and "Back to Dashboard" buttons for navigation
 * Uses a background image from sciencealert.com
 */

const backgroundStyle = {
  minHeight: '100vh',
  backgroundImage: 'url(https://www.sciencealert.com/images/2019-02/processed/GettyImages-861460116_1_1024.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  paddingTop: '32px'
};

const SpacecraftDetailPage = ({ customCrafts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if this is a custom craft
    if (id.startsWith('custom-')) {
      const found = customCrafts.find(c => c.id === id);
      setCraft(found);
      setLoading(false);
    } else {
      // Fetch from API for built-in crafts
      fetch(`https://swapi.info/api/starships/${id}`)
        .then(res => res.json())
        .then(data => {
          setCraft(data);
          setLoading(false);
        });
    }
  }, [id, customCrafts]);

  if (loading) return <Loading />;
  if (!craft) return <div>Craft not found.</div>;

  return (
    <div className="spacecraft-detail" style={backgroundStyle}>
      <button className="back-btn" onClick={() => navigate('/spacecrafts')}>
        ← Back to spacecraft list
      </button>
      <button
        className="back-btn"
        style={{ marginLeft: 12 }}
        onClick={() => navigate('/')}
      >
        ← Back to Dashboard
      </button>
      <h1>{craft.name}</h1>
      {id.startsWith('custom-') ? (
        <div>
          <p><strong>Cargo Capacity:</strong> {craft.cargo}</p>
          <p><strong>Passenger Capacity:</strong> {craft.passengers}</p>
          <p><strong>Propulsion Type:</strong> {craft.propulsion}</p>
          <p><strong>Atmospheric Entry/Departure:</strong> {craft.entry}</p>
          <p><strong>Orbit/Landing:</strong> {craft.orbit}</p>
        </div>
      ) : (
        <div>
          <p><strong>Model:</strong> {craft.model}</p>
          <p><strong>Manufacturer:</strong> {craft.manufacturer}</p>
          <p><strong>Cost in credits:</strong> {craft.cost_in_credits}</p>
          <p><strong>Length:</strong> {craft.length}</p>
          <p><strong>Max atmosphering speed:</strong> {craft.max_atmosphering_speed}</p>
          <p><strong>Crew:</strong> {craft.crew}</p>
          <p><strong>Passengers:</strong> {craft.passengers}</p>
          <p><strong>Cargo capacity:</strong> {craft.cargo_capacity}</p>
          <p><strong>Consumables:</strong> {craft.consumables}</p>
          <p><strong>Hyperdrive rating:</strong> {craft.hyperdrive_rating}</p>
          <p><strong>Starship class:</strong> {craft.starship_class}</p>
        </div>
      )}
    </div>
  );
};

export default SpacecraftDetailPage;