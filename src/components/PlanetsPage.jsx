/**
 
 * Lists all available planets (matching SWAPI IDs/names)
 * Allows viewing information for each planet
 * "Back to Dashboard" button for navigation
 * Uses a background image from Nasa.gov
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const backgroundStyle = {
  minHeight: '100vh',
  backgroundImage: 'url(https://science.nasa.gov/wp-content/uploads/2024/04/pia00010.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  paddingTop: '32px'
};

// List of planets with their names and IDs
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
];

const PlanetsPage = ({ planetCraftAssignments, setPlanetCraftAssignments }) => {
  const navigate = useNavigate();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [planetDetails, setPlanetDetails] = useState(null); // State for planet details
  const [dispatchMode, setDispatchMode] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState('');
  const [destinationPlanet, setDestinationPlanet] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Fetch planet details when a planet is selected
  useEffect(() => {
    if (selectedPlanet) {
      const fetchPlanetDetails = async () => {
        try {
          const response = await fetch(`https://swapi.dev/api/planets/${selectedPlanet.id}/`);
          const data = await response.json();
          setPlanetDetails(data);
        } catch (error) {
          console.error('Error fetching planet details:', error);
          setPlanetDetails(null);
        }
      };

      fetchPlanetDetails();
    }
  }, [selectedPlanet]);

  const handleDispatch = () => {
    if (!selectedCraft || !destinationPlanet || destinationPlanet === selectedPlanet.id) {
      alert('Please select a valid spacecraft and destination planet.');
      return;
    }

    // Remove the craft from the current planet
    const updatedAssignments = { ...planetCraftAssignments };
    updatedAssignments[selectedPlanet.id] = updatedAssignments[selectedPlanet.id].filter(
      craft => craft !== selectedCraft
    );

    // Add the craft to the destination planet
    if (!updatedAssignments[destinationPlanet]) {
      updatedAssignments[destinationPlanet] = [];
    }
    updatedAssignments[destinationPlanet].push(selectedCraft);

    setPlanetCraftAssignments(updatedAssignments);

    // Set success message
    const destinationPlanetName = planetList.find(planet => planet.id === destinationPlanet)?.name;
    const message = `Successfully dispatched ${selectedCraft} to ${destinationPlanetName}.`;
    console.log('Success Message:', message); // Debugging
    setSuccessMessage(message);

    // Reset dispatch mode and selections
    setDispatchMode(false);
    setSelectedCraft('');
    setDestinationPlanet('');
  };

  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };

  if (selectedPlanet) {
    const assignedCraft = planetCraftAssignments[selectedPlanet.id] || [];
    return (
      <div style={backgroundStyle}>
        <button
          className="back-btn"
          onClick={() => {
            setSelectedPlanet(null);
            clearSuccessMessage(); // Clear success message when navigating back
          }}
        >
          ← Back to planet list
        </button>
        <button
          className="back-btn"
          style={{ marginLeft: 12 }}
          onClick={() => {
            navigate('/');
            clearSuccessMessage(); // Clear success message when navigating back to dashboard
          }}
        >
          ← Back to Dashboard
        </button>
        <h1>{selectedPlanet.name}</h1>
        {planetDetails ? (
          <div style={{ marginTop: 16 }}>
            <p><strong>Population:</strong> {planetDetails.population}</p>
            <p><strong>Climate:</strong> {planetDetails.climate}</p>
            <p><strong>Terrain:</strong> {planetDetails.terrain}</p>
          </div>
        ) : (
          <p>Loading planet details...</p>
        )}
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
        {/* Render the success message independently */}
        {successMessage && (
          <div style={{ marginTop: '16px', color: '#FFD700', fontWeight: 'bold' }}>
            {successMessage}
          </div>
        )}
        <button onClick={() => setDispatchMode(!dispatchMode)}>
          {dispatchMode ? 'Cancel Dispatch' : 'Dispatch Spacecraft'}
        </button>
        {dispatchMode && (
          <div style={{ marginTop: '20px' }}>
            <h3>Dispatch Spacecraft</h3>
            <label>
              Select Spacecraft:
              <select
                value={selectedCraft}
                onChange={e => setSelectedCraft(e.target.value)}
              >
                <option value="">Select</option>
                {assignedCraft.map(craft => (
                  <option key={craft} value={craft}>
                    {craft}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Select Destination Planet:
              <select
                value={destinationPlanet}
                onChange={e => setDestinationPlanet(e.target.value)}
              >
                <option value="">Select</option>
                {planetList.map(planet => (
                  planet.id !== selectedPlanet.id && (
                    <option key={planet.id} value={planet.id}>
                      {planet.name}
                    </option>
                  )
                ))}
              </select>
            </label>
            <br />
            <button onClick={handleDispatch}>Confirm Dispatch</button>
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
              onClick={() => {
                setSelectedPlanet(planet);
                clearSuccessMessage(); // Clear success message when selecting a new planet
              }}
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
