package main.java.com.example.todo.payload.request;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class TaskRequest {
  @NotBlank(message = "Title is required")
  private String title;
  private String description;
  private LocalDate dueDate;
  private Boolean completed;

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public LocalDate getDueDate() { return dueDate; }
  public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
  public Boolean getCompleted() { return completed; }
  public void setCompleted(Boolean completed) { this.completed = completed; }
}
