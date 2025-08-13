import React from 'react';
import { render, screen } from '@testing-library/react';
import MissionControl from '../components/MissionControl';

const planets = [
  { id: "1", name: "Tatooine" },
  { id: "2", name: "Alderaan" }
];
const spacecrafts = [
  { id: "1", name: "X-wing" },
  { id: "2", name: "Millennium Falcon" }
];

describe('MissionControl', () => {
  test('renders the mission control heading', () => {
    render(<MissionControl planets={planets} spacecrafts={spacecrafts} />);
    expect(screen.getByText(/mission control transport request form/i)).toBeInTheDocument();
  });

  test('renders form fields', () => {
    render(<MissionControl planets={planets} spacecrafts={spacecrafts} />);
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/spacecraft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passengers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/main contact/i)).toBeInTheDocument();
  });

  test('renders Dispatch Mission button', () => {
    render(<MissionControl planets={planets} spacecrafts={spacecrafts} />);
    expect(screen.getByText(/dispatch mission/i)).toBeInTheDocument();
  });

  test('renders Back to Dashboard button', () => {
    render(<MissionControl planets={planets} spacecrafts={spacecrafts} />);
    expect(screen.getByText(/back to dashboard/i)).toBeInTheDocument();
  });
});