package com.booleanuk.simpleapi.repositories;

import com.booleanuk.simpleapi.models.Note;
import com.booleanuk.simpleapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository<Note, Integer> {
    public List<Note> findNotesByUser(User user);
}
