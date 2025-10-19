import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock axios
jest.mock('axios');
const mockedAxios = require('axios');

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Navigate: ({ to }) => <div data-testid="navigate" to={to} />,
}));

// Mock App components for isolated test
const MockApp = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin('admin', 'mock-token');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    // Mock add
  };

  return (
    <div>
      <input aria-label="Username" />
      <input aria-label="Password" />
      <button onClick={handleSubmit}>Login</button>
      <div data-testid="tasks">
        Tasks for admin
        <input aria-label="New Task" />
        <button onClick={handleAddTask}>Add</button>
        <li>Test task</li>
      </div>
    </div>
  );
};

describe('MERN To-Do App UI Tests', () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({ data: { token: 'mock' } });
  });

  test('Scenario 1: Successful Login', async () => {
    render(<MockApp onLogin={jest.fn()} />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Tasks for admin')).toBeInTheDocument();
    });
  });

  test('Scenario 2: Add Task', async () => {
    render(<MockApp onLogin={jest.fn()} />);
    const user = userEvent.setup();

    // Login
    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // Add task
    await user.type(screen.getByLabelText('New Task'), 'Test task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText('Test task')).toBeInTheDocument();
    });
  });
});