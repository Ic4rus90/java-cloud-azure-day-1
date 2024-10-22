import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  user: User = { username: '', email: '' };

  constructor(private userService: UserService, private router: Router) {}

  addUser(): void {
    this.userService.addUser(this.user).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (error) => console.error(error),
    });
  }
}
