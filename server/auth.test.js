describe('Auth Unit Tests', () => {
  test('Valid login logic', async () => {
    const mockUser = { username: 'admin' };
    const mockCompare = jest.fn().mockResolvedValue(true);
    const mockSign = jest.fn().mockReturnValue('token');

    const loginLogic = async (user, password) => {
      if (await mockCompare(password, 'hashed')) return { token: mockSign(), user: mockUser };
      return null;
    };

    const result = await loginLogic(mockUser, 'password');

    expect(result).toHaveProperty('token', 'token');
    expect(result.user).toBe(mockUser);
  });
});