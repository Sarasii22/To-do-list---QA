package main.java.com.example.todo.repository;

import com.example.todo.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
  List<Task> findByOwnerUsername(String ownerUsername);
}
