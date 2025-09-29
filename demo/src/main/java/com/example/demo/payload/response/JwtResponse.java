package main.java.com.example.todo.payload.response;

import java.util.List;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private String id;
  private String username;
  private String email;
  private List<String> roles;

  public JwtResponse(String token, String id, String username, String email, List<String> roles) {
    this.token = token;
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  // getters
  public String getToken() { return token; }
  public String getType() { return type; }
  public String getId() { return id; }
  public String getUsername() { return username; }
  public String getEmail() { return email; }
  public List<String> getRoles() { return roles; }
}
