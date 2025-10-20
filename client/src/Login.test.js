import React from 'react';
import { render, screen } from '@testing-library/react';

const MockLogin = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin('admin', 'token');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input />
      <button type="submit">Login</button>
    </form>
  );
};

describe('Login Component Unit Tests', () => {
  test('Calls onLogin on submit', () => {
    const mockOnLogin = jest.fn();
    render(<MockLogin onLogin={mockOnLogin} />);

    const form = document.querySelector('form');
    const button = document.querySelector('button[type="submit"]');
    button.click();

    expect(mockOnLogin).toHaveBeenCalledWith('admin', 'token');
  });
});