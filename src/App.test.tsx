import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Products text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Products/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Users Info text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Users Info/i);
  expect(linkElement).toBeInTheDocument();
});
