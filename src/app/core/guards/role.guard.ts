import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthorized(route);
  }

  isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const roles = [this.userService.currentUserValue?.user?.role];
    const expectedRoles = route.data['expectedRoles'];
    const roleMatches = roles.findIndex(
      (role) => expectedRoles.indexOf(role) !== -1
    );

    if (roleMatches < 0) {
      this.router.navigate(['private/error'], {
        queryParams: { status: 'forbidden' },
      });
      return false;
    } else return true;
  }
}
