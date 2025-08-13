import React from 'react';
import { render, screen } from '@testing-library/react';
import SpacecraftsPage from '../components/SpacecraftsPage';

describe('SpacecraftsPage', () => {
  test('renders the spacecrafts heading', () => {
    render(<SpacecraftsPage />);
    expect(screen.getByText(/view spacecrafts/i)).toBeInTheDocument();
  });

  test('renders spacecraft buttons from the hardcoded list', () => {
    render(<SpacecraftsPage />);
    expect(screen.getByText(/CR90 corvette/i)).toBeInTheDocument();
    expect(screen.getByText(/Star Destroyer/i)).toBeInTheDocument();
  });

  test('renders Build Your Own Craft button', () => {
    render(<SpacecraftsPage />);
    expect(screen.getByText(/build your own craft/i)).toBeInTheDocument();
  });

  test('renders Back to Dashboard button', () => {
    render(<SpacecraftsPage />);
    expect(screen.getByText(/back to dashboard/i)).toBeInTheDocument();
  });
});