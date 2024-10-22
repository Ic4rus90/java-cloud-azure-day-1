import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NoteService } from '../../services/note.service';
import { User } from '../../models/user';
import { Note } from '../../models/note';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user?: User;
  notes: Note[] = [];
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        if (!user) {
          this.router.navigate(['/not-found']);
        } else {
            this.getUser();
            this.getNotes();
        }
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.router.navigate(['/not-found']);
      }
    })
  }



  getUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => (this.user = data),
      error: (error) => console.error(error),
    });
  }

  getNotes(): void {
    this.noteService.getNotesByUserId(this.userId).subscribe({
      next: (data) => (this.notes = data),
      error: (error) => console.error(error),
    });
  }
}
