import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUpAnimation } from '@template/animations/fade-in-up.animation';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  model: any = {};
  inputType = 'password';
  visible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/private/dashboard']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        const returnUrl =
          this.activatedRoute.snapshot.queryParamMap.get('returnUrl');

        if (returnUrl) this.router.navigate([returnUrl]);
        else this.router.navigate(['private']);

        this.snackbar.open('Login Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      },
      (error) => {
        this.form.reset();
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('currentUser');
    return !!token;
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
