import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './components/Login';

describe('Login Component Unit Tests', () => {
  test('Calls onLogin on successful form submission', async () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(mockOnLogin).toHaveBeenCalledWith('admin', expect.any(String));
  });
});