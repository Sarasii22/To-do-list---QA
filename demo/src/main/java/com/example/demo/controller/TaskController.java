package main.java.com.example.todo.controller;

import com.example.todo.model.Task;
import com.example.todo.payload.request.TaskRequest;
import com.example.todo.security.UserDetailsImpl;
import com.example.todo.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
  private final TaskService taskService;

  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @PostMapping
  public ResponseEntity<Task> createTask(@AuthenticationPrincipal UserDetailsImpl user,
                                         @Valid @RequestBody TaskRequest req) {
    Task t = new Task();
    t.setTitle(req.getTitle());
    t.setDescription(req.getDescription());
    t.setDueDate(req.getDueDate());
    t.setCompleted(req.getCompleted() != null ? req.getCompleted() : false);
    t.setOwnerUsername(user.getUsername());
    Task saved = taskService.createTask(t);
    return ResponseEntity.created(URI.create("/api/tasks/" + saved.getId())).body(saved);
  }

  @GetMapping
  public List<Task> listTasks(@AuthenticationPrincipal UserDetailsImpl user) {
    return taskService.getByOwner(user.getUsername());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> getTask(@AuthenticationPrincipal UserDetailsImpl user,
                                      @PathVariable String id) {
    Task t = taskService.getByIdAndOwner(id, user.getUsername());
    return ResponseEntity.ok(t);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Task> updateTask(@AuthenticationPrincipal UserDetailsImpl user,
                                         @PathVariable String id,
                                         @RequestBody TaskRequest req) {
    Task updated = new Task();
    updated.setTitle(req.getTitle());
    updated.setDescription(req.getDescription());
    updated.setDueDate(req.getDueDate());
    updated.setCompleted(req.getCompleted() != null ? req.getCompleted() : false);
    Task t = taskService.updateTask(id, updated, user.getUsername());
    return ResponseEntity.ok(t);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteTask(@AuthenticationPrincipal UserDetailsImpl user,
                                      @PathVariable String id) {
    taskService.deleteTask(id, user.getUsername());
    return ResponseEntity.noContent().build();
  }
}
