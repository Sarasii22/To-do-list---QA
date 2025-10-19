const { login } = require('./routes/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('./data');  // From in-memory data

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('Auth Unit Tests', () => {
  beforeEach(() => {
    jwt.sign.mockReturnValue('mock-token');
    bcrypt.compare.mockResolvedValue(true);
  });

  test('Valid login returns token and username', async () => {
    const req = { body: { username: 'admin', password: 'password' } };
    const res = { json: jest.fn() };

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({ token: 'mock-token', username: 'admin' });
  });
});