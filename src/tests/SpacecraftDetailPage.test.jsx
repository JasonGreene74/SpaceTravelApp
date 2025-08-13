import React from 'react';
import { render, screen } from '@testing-library/react';
import SpacecraftDetailPage from '../components/SpacecraftDetailPage';

describe('SpacecraftDetailPage', () => {
    const mockSpacecraft = {
        id: '1',
        name: 'Apollo 11',
        type: 'Lunar Module',
        status: 'Active',
        description: 'First spacecraft to land humans on the Moon.'
    };

    test('renders spacecraft details correctly', () => {
        render(<SpacecraftDetailPage spacecraft={mockSpacecraft} />);

        expect(screen.getByText(/Apollo 11/i)).toBeInTheDocument();
        expect(screen.getByText(/Lunar Module/i)).toBeInTheDocument();
        expect(screen.getByText(/Active/i)).toBeInTheDocument();
        expect(screen.getByText(/First spacecraft to land humans on the Moon./i)).toBeInTheDocument();
    });

    test('renders loading state when spacecraft is not provided', () => {
        render(<SpacecraftDetailPage spacecraft={null} />);

        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    test('renders error message when spacecraft data is missing', () => {
        render(<SpacecraftDetailPage spacecraft={undefined} />);

        expect(screen.getByText(/Error: Spacecraft data not found/i)).toBeInTheDocument();
    });

    test('renders Back to spacecraft list button', () => {
        render(<SpacecraftDetailPage />);
        expect(screen.getByText(/back to spacecraft list/i)).toBeInTheDocument();
    });

    test('renders Back to Dashboard button', () => {
        render(<SpacecraftDetailPage />);
        expect(screen.getByText(/back to dashboard/i)).toBeInTheDocument();
    });

    // For testing fetched data, you would need to mock fetch and test for a spacecraft name
});