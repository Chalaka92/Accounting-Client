import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'template-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent implements OnInit {
  @Output() openConfig = new EventEmitter();
  isOpen: boolean;
  username = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    if (this.authService.isLoggedIn) {
      this.username = this.userService.currentUserValue.user.name;
    }
  }

  ngOnInit() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    this.authService.logout();
  }
}
