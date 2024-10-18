package com.booleanuk.simpleapi.controllers;

import com.booleanuk.simpleapi.models.User;
import com.booleanuk.simpleapi.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = this.userRepository.findAll();

        return ResponseEntity.ok(userList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable (name = "id") int id) {
        User user = this.userRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(user);
    }

    @PostMapping()
    public ResponseEntity<User> addUser(@RequestBody User user) {
        try {
            User savedUser = this.userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Verify all fields are correct");
        }
    }
}
