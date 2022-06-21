import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'template-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent implements OnInit {
  @Output() openConfig = new EventEmitter();
  isOpen: boolean;
  username = '';

  constructor(private loginService: LoginService) {
    if (this.loginService.currentUserValue) {
      this.username = this.loginService.currentUserValue.user.name;
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
    this.loginService.logout();
  }
}
