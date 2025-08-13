import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../components/Loading';

describe('Loading Component', () => {
  test('renders loading message', () => {
    render(<Loading />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders spinner', () => {
    render(<Loading />);
    const spinnerElement = screen.getByRole('img', { name: /loading spinner/i });
    expect(spinnerElement).toBeInTheDocument();
  });
});