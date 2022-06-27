import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;

  constructor(private http: HttpClient) {}

  public get currentUserValue(): CurrentUser {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(
      JSON.parse(localStorage.getItem('currentUser'))?.data
    );

    return this.currentUserSubject.value;
  }

  public get currentUserSub(): BehaviorSubject<CurrentUser> {
    return new BehaviorSubject<CurrentUser>(
      JSON.parse(localStorage.getItem('currentUser'))?.data
    );
  }

  forgotPassword(model: any) {
    return this.http.post(`${environment.backend}/users/forgotPassword`, model);
  }

  resetPassword(model: any, resetToken: string) {
    return this.http.post(
      `${environment.backend}/users/resetPassword/${resetToken}`,
      model
    );
  }
}
