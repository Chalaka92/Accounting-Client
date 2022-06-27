import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {}

  login(model: any) {
    return this.loginService.login(model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.userService.currentUserSub.next(user);
        return user;
      })
    );
  }

  signUp(model: any) {
    return this.loginService.signUp(model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.userService.currentUserSub.next(user);
        return user;
      })
    );
  }

  resetPassword(model: any, resetToken: string) {
    return this.userService.resetPassword(model, resetToken).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.userService.currentUserSub.next(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userService.currentUserSub.next(null);
    this.router.navigate(['/public/login']);
  }

  isLoggedIn() {
    const currentUser = this.userService.currentUserValue;
    if (currentUser && currentUser.token) return true;
    else return false;
  }
}
