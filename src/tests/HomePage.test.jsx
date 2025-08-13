import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../components/HomePage';

describe('HomePage', () => {
    test('renders Home Page heading', () => {
        render(<HomePage />);
        const headingElement = screen.getByText(/Welcome to Space Travel/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders a description of the application', () => {
        render(<HomePage />);
        const descriptionElement = screen.getByText(/Explore the universe and manage your spacecraft/i);
        expect(descriptionElement).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(<HomePage />);
        const spacecraftLink = screen.getByText(/Spacecrafts/i);
        const planetsLink = screen.getByText(/Planets/i);
        expect(spacecraftLink).toBeInTheDocument();
        expect(planetsLink).toBeInTheDocument();
    });
});