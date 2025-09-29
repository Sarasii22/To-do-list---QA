package main.java.com.example.todo.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String,String>> handleBad(IllegalArgumentException ex) {
    Map<String,String> m = new HashMap<>();
    m.put("error", ex.getMessage());
    return ResponseEntity.badRequest().body(m);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String,String>> handleValidation(MethodArgumentNotValidException ex) {
    Map<String,String> m = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(err -> m.put(err.getField(), err.getDefaultMessage()));
    return ResponseEntity.badRequest().body(m);
  }
}
