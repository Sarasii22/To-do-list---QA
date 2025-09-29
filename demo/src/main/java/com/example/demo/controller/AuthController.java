package main.java.com.example.todo.controller;

import com.example.todo.model.User;
import com.example.todo.payload.request.LoginRequest;
import com.example.todo.payload.request.SignupRequest;
import com.example.todo.payload.response.JwtResponse;
import com.example.todo.repository.UserRepository;
import com.example.todo.security.JwtUtils;
import com.example.todo.security.UserDetailsImpl;
import com.example.todo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final UserService userService;
  private final JwtUtils jwtUtils;

  public AuthController(AuthenticationManager authenticationManager,
                        UserRepository userRepository,
                        UserService userService,
                        JwtUtils jwtUtils) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.userService = userService;
    this.jwtUtils = jwtUtils;
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body("Error: Username is already taken!");
    }
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body("Error: Email is already in use!");
    }

    User user = new User(signUpRequest.getUsername(),
                         signUpRequest.getEmail(),
                         signUpRequest.getPassword(),
                         null);
    User saved = userService.registerUser(user);
    return ResponseEntity.ok("User registered successfully: " + saved.getUsername());
  }

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
    );
    String jwt = jwtUtils.generateJwtToken(authentication);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    var roles = userDetails.getAuthorities().stream()
        .map(auth -> auth.getAuthority()).collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
        /* email (not in UserDetails) fetch from repo: */ userRepository.findByUsername(userDetails.getUsername()).map(User::getEmail).orElse(""), roles));
  }
}
