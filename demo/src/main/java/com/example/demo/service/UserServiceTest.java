package main.java.com.example.todo.service;

import com.example.todo.model.User;
import com.example.todo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @InjectMocks
  private UserService userService;

  public UserServiceTest() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void registerUser_shouldThrow_whenUsernameExists() {
    when(userRepository.existsByUsername("alice")).thenReturn(true);
    User u = new User("alice", "a@example.com", "pwd", List.of("ROLE_USER"));
    IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> userService.registerUser(u));
    assertEquals("Username is already taken", ex.getMessage());
    verify(userRepository, never()).save(any());
  }

  @Test
  void registerUser_success() {
    when(userRepository.existsByUsername("bob")).thenReturn(false);
    when(userRepository.existsByEmail("b@example.com")).thenReturn(false);
    when(passwordEncoder.encode(anyString())).thenReturn("encodedPwd");
    when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

    User u = new User("bob", "b@example.com", "pwd", null);
    User saved = userService.registerUser(u);
    assertEquals("bob", saved.getUsername());
    assertEquals("encodedPwd", saved.getPassword());
    assertNotNull(saved.getRoles());
    verify(userRepository, times(1)).save(any(User.class));
  }
}
