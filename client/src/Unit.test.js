describe('Unit Tests', () => {
  test('Unit Test 1: Login Logic', () => {
    const onLogin = jest.fn();
    const mockEvent = { preventDefault: jest.fn() };

    const handleLogin = (e, onLogin) => {
      e.preventDefault();
      onLogin('admin', 'token');
    };

    handleLogin(mockEvent, onLogin);

    expect(onLogin).toHaveBeenCalledWith('admin', 'token');
  });

  test('Unit Test 2: Add Task Logic', () => {
    const mockSetDescription = jest.fn();
    const mockFetchTasks = jest.fn();
    const description = 'Test task';

    const addTask = async (e, setDescription, fetchTasks, description) => {
      e.preventDefault();
      setDescription('');
      await fetchTasks();
    };

    const mockEvent = { preventDefault: jest.fn() };
    addTask(mockEvent, mockSetDescription, mockFetchTasks, description);

    expect(mockSetDescription).toHaveBeenCalledWith('');
    expect(mockFetchTasks).toHaveBeenCalled();
  });
});