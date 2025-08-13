import React, { Suspense } from 'react';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spacecrafts" element={<SpacecraftsPage />} />
            <Route path="/spacecraft/:id" element={<SpacecraftDetailPage />} />
            <Route path="/planets" element={<PlanetsPage />} />
            <Route path="/planet/:id" element={<PlanetsPage />} />
            <Route path="/mission-control" element={
              <MissionControl planets={planetList} spacecrafts={starshipList} />
            } />
            <Route path="/spacecrafts/new" element={<CreateYourOwn />} />
            {/* Replace NotFound with redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;