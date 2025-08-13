import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Loading from './Loading';

/**
 
 * Lists spacecrafts from Star Wars Swapi.info API
 * Allows navigation to individual spacecraft details page
 * Includes a button to build your own craft
 * "Back to Dashboard" button returns to the homepage
 * Uses a background image from sciencealert.com 
 */

const starshipList = [
  { id: "2", name: "CR90 corvette" },
  { id: "3", name: "Star Destroyer" },
  { id: "5", name: "Sentinel-class landing craft" },
  { id: "9", name: "Death Star" },
  { id: "10", name: "Millennium Falcon" },
  { id: "11", name: "Y-wing" },
  { id: "12", name: "X-wing" },
  { id: "13", name: "TIE Advanced x1" },
  { id: "15", name: "Executor" },
  { id: "17", name: "Rebel transport" },
  { id: "21", name: "Slave 1" },
  { id: "22", name: "Imperial shuttle" },
  { id: "23", name: "EF76 Nebulon-B escort frigate" },
  { id: "27", name: "Calamari Cruiser" },
  { id: "28", name: "A-wing" },
  { id: "29", name: "B-wing" },
  { id: "31", name: "Republic Cruiser" },
  { id: "32", name: "Droid control ship" },
  { id: "39", name: "Naboo fighter" },
  { id: "40", name: "Naboo Royal Starship" },
  { id: "41", name: "Scimitar" },
  { id: "43", name: "J-type diplomatic barge" },
  { id: "47", name: "AA-9 Coruscant freighter" },
  { id: "48", name: "Jedi starfighter" },
  { id: "49", name: "H-type Nubian yacht" },
  { id: "52", name: "Republic Assault ship" },
  { id: "58", name: "Solar Sailer" },
  { id: "59", name: "Trade Federation cruiser" },
  { id: "61", name: "Theta-class T-2c shuttle" },
  { id: "63", name: "Republic attack cruiser" },
  { id: "64", name: "Naboo star skiff" },
  { id: "65", name: "Jedi Interceptor" },
  { id: "66", name: "arc-170" },
  { id: "68", name: "Banking clan frigte" },
  { id: "74", name: "Belbullab-22 starfighter" },
  { id: "75", name: "V-wing" }
];

const backgroundStyle = {
  minHeight: '100vh',
  backgroundImage: 'url(https://www.sciencealert.com/images/2019-02/processed/GettyImages-861460116_1_1024.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  paddingTop: '32px'
};

const SpacecraftsPage = () => {
  const [spacecrafts, setSpacecrafts] = useState(starshipList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSpacecraft, setSelectedSpacecraft] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error loading spacecrafts: {error}</div>;

  if (selectedSpacecraft) {
    return (
      <div>
        <button className="back-btn" onClick={() => setSelectedSpacecraft(null)}>
          ← Back to spacecraft list
        </button>
        {detailLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>{selectedSpacecraft.name}</h1>
            {/* Add more spacecraft details here if needed */}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <button
        className="back-btn"
        style={{ margin: '24px 0 0 24px' }}
        onClick={() => navigate('/')}
      >
        ← Back to Dashboard
      </button>
      <h1>View Spacecraft Details:</h1>
      <ul className="starship-list">
        {starshipList.map(ship => (
          <li key={ship.id}>
            <button
              className="starship-btn"
              onClick={() => navigate(`/spacecraft/${ship.id}`)}
            >
              {ship.id}. {ship.name}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button
          className="starship-btn build-craft-btn"
          onClick={() => navigate('/spacecrafts/new')}
          style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
        >
          Build Your Own Craft
        </button>
      </div>
      <p style={{ textAlign: 'center', marginTop: '24px' }}>
        Visit the API endpoint:
        <a href="https://swapi.info/api/starships" target="_blank" rel="noopener noreferrer">
          https://swapi.info/api/starships
        </a>
      </p>
    </div>
  );
};

export default SpacecraftsPage;