import React from 'react';
import { render, screen } from '@testing-library/react';
import PlanetsPage from '../components/PlanetsPage';

describe('PlanetsPage', () => {
  test('renders the planets heading', () => {
    render(<PlanetsPage />);
    const heading = screen.getByText(/view planets/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders planet buttons from the hardcoded list', () => {
    render(<PlanetsPage />);
    // Check for a few known planets from your hardcoded list
    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Alderaan/i)).toBeInTheDocument();
    expect(screen.getByText(/Hoth/i)).toBeInTheDocument();
  });

  test('displays loading state when fetching data', () => {
    render(<PlanetsPage />);
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
  });

  test('renders planets and their spacecrafts', () => {
    const mockPlanets = [
      { name: 'Earth', spacecrafts: ['Apollo', 'Shuttle'] },
      { name: 'Mars', spacecrafts: ['Curiosity'] },
    ];
    render(<PlanetsPage planets={mockPlanets} />);
    
    mockPlanets.forEach(planet => {
      const planetElement = screen.getByText(planet.name);
      expect(planetElement).toBeInTheDocument();
      planet.spacecrafts.forEach(spacecraft => {
        const spacecraftElement = screen.getByText(spacecraft);
        expect(spacecraftElement).toBeInTheDocument();
      });
    });
  });
});