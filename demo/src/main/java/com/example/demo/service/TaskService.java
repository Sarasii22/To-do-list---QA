

import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class TaskService {
  private final TaskRepository repo;

  public TaskService(TaskRepository repo) { this.repo = repo; }

  public Task createTask(Task task) {
    if (!StringUtils.hasText(task.getTitle())) {
      throw new IllegalArgumentException("Title is required");
    }
    return repo.save(task);
  }

  public List<Task> getByOwner(String ownerUsername) {
    return repo.findByOwnerUsername(ownerUsername);
  }

  public Task getByIdAndOwner(String id, String ownerUsername) {
    return repo.findById(id)
        .filter(t -> ownerUsername.equals(t.getOwnerUsername()))
        .orElseThrow(() -> new IllegalArgumentException("Task not found or access denied"));
  }

  public Task updateTask(String id, Task updated, String ownerUsername) {
    Task existing = getByIdAndOwner(id, ownerUsername);
    if (StringUtils.hasText(updated.getTitle())) existing.setTitle(updated.getTitle());
    if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
    if (updated.getDueDate() != null) existing.setDueDate(updated.getDueDate());
    existing.setCompleted(updated.isCompleted());
    return repo.save(existing);
  }

  public void deleteTask(String id, String ownerUsername) {
    Task existing = getByIdAndOwner(id, ownerUsername);
    repo.deleteById(existing.getId());
  }
}
