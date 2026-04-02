import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders role-based landing pages', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Login as Admin/i));
  expect(screen.getByText(/Welcome Admin/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Login as Client/i));
  expect(screen.getByText(/Welcome Client/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Login as User/i));
  expect(screen.getByText(/Welcome User/i)).toBeInTheDocument();
});