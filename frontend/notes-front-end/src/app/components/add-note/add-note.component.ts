import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  note: Note = { title: '', content: '', userId: 0 };
  userId!: number;

  constructor(
    private noteService: NoteService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.note.userId = this.userId;
  }

  addNote(): void {
    this.noteService.addNote(this.note).subscribe({
      next: () => this.router.navigate(['/users', this.userId]),
      error: (error) => console.error(error),
    });
  }
}
