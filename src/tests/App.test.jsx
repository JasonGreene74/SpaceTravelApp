import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders Home Page on initial load', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const homeElement = screen.getByText(/welcome to space travel/i);
  expect(homeElement).toBeInTheDocument();
});

test('navigates to Spacecrafts Page', () => {
  render(
    <MemoryRouter initialEntries={['/spacecrafts']}>
      <App />
    </MemoryRouter>
  );
  const spacecraftsElement = screen.getByText(/spacecrafts list/i);
  expect(spacecraftsElement).toBeInTheDocument();
});

test('navigates to Planets Page', () => {
  render(
    <MemoryRouter initialEntries={['/planets']}>
      <App />
    </MemoryRouter>
  );
  const planetsElement = screen.getByText(/planets list/i);
  expect(planetsElement).toBeInTheDocument();
});

test('renders NotFound component for undefined routes', () => {
  render(
    <MemoryRouter initialEntries={['/undefined-route']}>
      <App />
    </MemoryRouter>
  );
  const notFoundElement = screen.getByText(/page not found/i);
  expect(notFoundElement).toBeInTheDocument();
});