package com.example.todo.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "tasks")
public class Task {
  @Id
  private String id;
  private String title;
  private String description;
  private LocalDate dueDate;
  private boolean completed = false;
  private String ownerUsername; // which user owns this task

  public Task() {}

  // getters / setters
  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public LocalDate getDueDate() { return dueDate; }
  public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
  public boolean isCompleted() { return completed; }
  public void setCompleted(boolean completed) { this.completed = completed; }
  public String getOwnerUsername() { return ownerUsername; }
  public void setOwnerUsername(String ownerUsername) { this.ownerUsername = ownerUsername; }
}
