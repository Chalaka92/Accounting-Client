import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '@template/animations/fade-in-up.animation';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'template-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUpAnimation],
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {};

  form = this.fb.group({
    email: [
      null,
      [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ],
    ],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  sendRecoveryLink() {
    this.userService.forgotPassword(this.model).subscribe(
      (next) => {
        this.snackbar.open('Recovery link succesfully send', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      },
      (error) => {
        this.form.reset();
      }
    );
  }
}
