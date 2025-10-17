import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';  // Add waitFor
import userEvent from '@testing-library/user-event';
import App from './App';

describe('MERN To-Do App UI Tests', () => {
  test('Scenario 1: Successful Login', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/tasks for admin/i)).toBeInTheDocument();
    });
  });

  test('Scenario 2: Add Task', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Login first
    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // Add task
    await waitFor(() => screen.getByLabelText('New Task'));
    await user.type(screen.getByLabelText('New Task'), 'Test task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText('Test task')).toBeInTheDocument();
    });
  });
});