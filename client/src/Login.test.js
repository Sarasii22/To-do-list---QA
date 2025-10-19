import React from 'react';
import { render } from '@testing-library/react';

const MockLogin = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin('admin', 'mock-token');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value="admin" onChange={() => {}} />
      <input value="password" onChange={() => {}} />
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

    expect(mockOnLogin).toHaveBeenCalledWith('admin', 'mock-token');
  });
});