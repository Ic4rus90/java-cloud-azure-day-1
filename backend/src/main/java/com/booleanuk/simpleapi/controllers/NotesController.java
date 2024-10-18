package com.booleanuk.simpleapi.controllers;

import com.booleanuk.simpleapi.DTO.NotesDTO;
import com.booleanuk.simpleapi.models.Note;
import com.booleanuk.simpleapi.models.User;
import com.booleanuk.simpleapi.repositories.NotesRepository;
import com.booleanuk.simpleapi.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("notes")
public class NotesController {
    NotesRepository notesRepository;
    UserRepository userRepository;

    public NotesController(NotesRepository notesRepository, UserRepository userRepository) {
        this.notesRepository = notesRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Note>> getAllUserNotes(@PathVariable (name = "id") int userID) {
        User user = this.userRepository.findById(userID).orElseThrow();
        List<Note> notesList = this.notesRepository.findNotesByUser(user);
        return ResponseEntity.ok(notesList);
    }

    @PostMapping()
    public ResponseEntity<Note> addNote(@RequestBody NotesDTO notesDTO) {
        try {
            Note newNote = convertFromDTO(notesDTO);
            Note savedNote = this.notesRepository.save(newNote);
            return new ResponseEntity<>(savedNote, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Verify that all fields are correct:" + e.getMessage());
        }
    }

    private Note convertFromDTO(NotesDTO notesDTO) {
        Note note = new Note();
        note.setTitle(notesDTO.getTitle());
        note.setContent(notesDTO.getContent());

        User user = this.userRepository.findById(notesDTO.getUserId()).orElseThrow();
        note.setUser(user);

        return note;
    }
}
