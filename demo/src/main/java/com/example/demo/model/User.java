package com.example.todo.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
public class User {
  @Id
  private String id;
  private String username;
  private String email;
  private String password;
  private List<String> roles;

  public User() {}

  public User(String username, String email, String password, List<String> roles) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  // getters / setters
  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getUsername() { return username; }
  public void setUsername(String username) { this.username = username; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }
  public List<String> getRoles() { return roles; }
  public void setRoles(List<String> roles) { this.roles = roles; }
}
