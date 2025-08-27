/**
 
 * Lists all available planets (matching SWAPI IDs/names)
 * Allows viewing information for each planet
 * "Back to Dashboard" button for navigation
 * Uses a background image from Nasa.gov
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Only includes planets that exist in SWAPI and match their IDs with names exactly
const planetList = [
  { id: "1", name: "Tatooine" },
  { id: "2", name: "Alderaan" },
  { id: "3", name: "Yavin IV" },
  { id: "4", name: "Hoth" },
  { id: "5", name: "Dagobah" },
  { id: "6", name: "Bespin" },
  { id: "7", name: "Endor" },
  { id: "8", name: "Naboo" },
  { id: "9", name: "Coruscant" },
  { id: "10", name: "Kamino" },
  { id: "11", name: "Geonosis" },
  { id: "12", name: "Utapau" },
  { id: "13", name: "Mustafar" },
  { id: "14", name: "Kashyyyk" },
  { id: "15", name: "Polis Massa" },
  { id: "16", name: "Mygeeto" },
  { id: "17", name: "Felucia" },
  { id: "18", name: "Cato Neimoidia" },
  { id: "19", name: "Saleucami" },
  { id: "20", name: "Stewjon" }
  
];

const backgroundStyle = {
  minHeight: '100vh',
  backgroundImage: 'url(https://science.nasa.gov/wp-content/uploads/2024/04/pia00010.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  paddingTop: '32px'
};

const PlanetsPage = ({ planetCraftAssignments }) => {
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);

  const showPlanetDetail = (id) => {
    setDetailLoading(true);
    fetch(`https://swapi.info/api/planets/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('network response failed');
        return res.json();
      })
      .then(data => {
        setSelectedPlanet({ ...data, id: String(id) });
        setDetailLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setDetailLoading(false);
      });
  };

  if (error) return <div>Error loading planet: {error}</div>;

  if (selectedPlanet) {
    // Use the id to look up assigned crafts
    const assignedCraft = planetCraftAssignments[String(selectedPlanet.id)] || [];
    return (
      <div style={backgroundStyle}>
        <button className="back-btn" onClick={() => setSelectedPlanet(null)}>
          ← Back to planet list
        </button>
        <button
          className="back-btn"
          style={{ marginLeft: 12 }}
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
        {detailLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>{selectedPlanet.name}</h1>
            <p><strong>Climate:</strong> {selectedPlanet.climate}</p>
            <p><strong>Terrain:</strong> {selectedPlanet.terrain}</p>
            <p><strong>Population:</strong> {selectedPlanet.population}</p>
            <p><strong>Diameter:</strong> {selectedPlanet.diameter}</p>
            <p><strong>Gravity:</strong> {selectedPlanet.gravity}</p>
            <p><strong>Orbital Period:</strong> {selectedPlanet.orbital_period}</p>
            <p><strong>Rotation Period:</strong> {selectedPlanet.rotation_period}</p>
            <p><strong>Surface Water:</strong> {selectedPlanet.surface_water}</p>
            <div style={{ marginTop: 16 }}>
              <strong>Crafts on this planet:</strong>
              {assignedCraft.length > 0 ? (
                <ul>
                  {assignedCraft.map(craft => (
                    <li key={craft}>{craft}</li>
                  ))}
                </ul>
              ) : (
                <span> None</span>
              )}
            </div>
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
      <h1>View planets:</h1>
      <ul className="starship-list">
        {planetList.map(planet => (
          <li key={planet.id}>
            <button
              className="planet-btn"
              onClick={() => showPlanetDetail(planet.id)}
            >
              {planet.id}. {planet.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetsPage;
