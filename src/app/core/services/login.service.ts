import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CurrentUser, User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(`${environment.backend}/users/login`, model);
  }

  signUp(model: any) {
    return this.http.post(`${environment.backend}/users/signup`, model);
  }
}
