/**
 * App.jsx
 *
 * The main application component for Space Travel App.
 * - Sets up routing for all pages using react-router-dom.
 * - Defines hardcoded lists of planets and spacecrafts (matching SWAPI IDs/names).
 * - Randomly assigns at least one spacecraft to each planet on every app load.
 * - Passes planet and spacecraft data as props to relevant components.
 * - Handles unmatched routes by redirecting to the homepage.
 * - Uses Suspense for lazy loading.
 */

import React, { Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import SpacecraftsPage from './components/SpacecraftsPage';
import SpacecraftDetailPage from './components/SpacecraftDetailPage';
import PlanetsPage from './components/PlanetsPage';
import MissionControl from './components/MissionControl';
import NotFound from './components/NotFound';
import CreateYourOwn from './components/CreateYourOwn';
import './index.css';

// Updated planet and starship lists:
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

const starshipList = [
  { id: "2", name: "CR90 corvette" },
  { id: "3", name: "Star Destroyer" },
  { id: "5", name: "Sentinel-class landing craft" },
  { id: "9", name: "Death Star" },
  { id: "10", name: "Millennium Falcon" },
  { id: "11", name: "Y-wing" },
  { id: "12", name: "X-wing" },
  { id: "13", name: "TIE Advanced x1" },

];

// Random assignment function
/**
 * Randomly assigns at least one craft to each planet.
 * Each planet gets between 1 and all available spacecraft.
 */
function getRandomAssignments(planets, spacecrafts) {
  const assignments = {};
  planets.forEach(planet => {
    // Always assign at least one craft
    const count = Math.max(1, Math.floor(Math.random() * spacecrafts.length) + 1);
    const shuffled = [...spacecrafts].sort(() => 0.5 - Math.random());
    assignments[planet.id] = shuffled.slice(0, count).map(s => s.name);
  });
  return assignments;
}

function App() {
  const [decommissionedCrafts, setDecommissionedCrafts] = useState([]);
  const [customCrafts, setCustomCrafts] = useState([]);

  const planetCraftAssignments = useMemo(
    () => getRandomAssignments(planetList, starshipList),
    []
  );

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/spacecrafts"
              element={
                <SpacecraftsPage
                  decommissionedCrafts={decommissionedCrafts}
                  setDecommissionedCrafts={setDecommissionedCrafts}
                  customCrafts={customCrafts}
                />
              }
            />
            <Route
              path="/spacecraft/:id"
              element={
                <SpacecraftDetailPage customCrafts={customCrafts} />
              }
            />
            <Route path="/planets" element={
              <PlanetsPage
                planetCraftAssignments={planetCraftAssignments}
                decommissionedCrafts={decommissionedCrafts}
              />
            } />
            <Route
              path="/planet/:id"
              element={
                <PlanetsPage
                  planetCraftAssignments={planetCraftAssignments}
                  decommissionedCrafts={decommissionedCrafts}
                  allCrafts={[...customCrafts, ...starshipList]}
                />
              }
            />
            <Route path="/mission-control" element={
              <MissionControl
                planets={planetList}
                spacecrafts={[...customCrafts, ...starshipList]} // custom crafts first
                decommissionedCrafts={decommissionedCrafts}
              />
            } />
            <Route
              path="/spacecrafts/new"
              element={<CreateYourOwn setCustomCrafts={setCustomCrafts} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;