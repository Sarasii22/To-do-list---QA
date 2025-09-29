package main.java.com.example.todo.service;

import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

  @Mock
  private TaskRepository repo;

  @InjectMocks
  private TaskService service;

  public TaskServiceTest() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void createTask_shouldThrow_whenTitleBlank() {
    Task t = new Task();
    t.setTitle("  ");
    IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.createTask(t));
    assertEquals("Title is required", ex.getMessage());
    verify(repo, never()).save(any());
  }

  @Test
  void createTask_shouldSave_whenValid() {
    Task t = new Task();
    t.setTitle("Buy milk");
    t.setOwnerUsername("bob");

    when(repo.save(any(Task.class))).thenAnswer(inv -> {
      Task arg = inv.getArgument(0);
      arg.setId("1");
      return arg;
    });

    Task saved = service.createTask(t);
    assertEquals("1", saved.getId());
    assertEquals("Buy milk", saved.getTitle());
    verify(repo, times(1)).save(any());
  }
}
