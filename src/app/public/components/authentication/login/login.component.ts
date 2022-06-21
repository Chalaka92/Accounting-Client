import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { fadeInUpAnimation } from '@template/animations/fade-in-up.animation';

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
    private loginService: LoginService
  ) {
    if (this.loginService.currentUserValue) {
      this.router.navigate(['/private/dashboard']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loginService.login(this.model).subscribe(
      (next) => {
        this.router.navigate(['private']);
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
