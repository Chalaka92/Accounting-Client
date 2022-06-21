import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CurrentUser, User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;

  constructor(private http: HttpClient, private router: Router) {}

  public get currentUserValue(): CurrentUser {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(
      JSON.parse(localStorage.getItem('currentUser'))?.data
    );

    return this.currentUserSubject.value;
  }

  login(model: any) {
    return this.http.post(`${environment.backend}/users/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/public/login']);
  }
}
