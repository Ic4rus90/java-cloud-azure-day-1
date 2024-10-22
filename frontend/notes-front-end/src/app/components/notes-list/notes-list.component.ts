import { Component } from '@angular/core';
import { Note } from '../../models/note';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  notes: Note[] = [];
  userId!: number;

  constructor(
    private noteService: NoteService, 
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        if (!user) {
          this.router.navigate(['/not-found'])
        } else {
          this.noteService.getNotesByUserId(this.userId).subscribe({
            next: (data) => (this.notes = data), 
            error: (error) => console.error(error),
          });
        }
      }, 
      error: (error) => {
        console.error('Error fetching user:', error);
        this.router.navigate(['/not-found']);
      }
    })
  }
}

