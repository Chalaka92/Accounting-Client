import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUpAnimation } from '@template/animations/fade-in-up.animation';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CustomValidatorsService } from 'src/app/shared/services/custom-validators.service';

@Component({
  selector: 'template-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [fadeInUpAnimation],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  model: any = {};
  inputType = 'password';
  visible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
            ),
          ],
        ],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: CustomValidatorsService.mustMatch(
          'password',
          'passwordConfirm'
        ),
      }
    );
  }

  resetPassword() {
    let resetToken;
    this.activatedRoute.params.subscribe((params) => {
      resetToken = params['resetToken'];
    });

    this.authService.resetPassword(this.model, resetToken).subscribe(
      (response) => {
        if (response && response.status === 'success') {
          this.router.navigate(['private']);
          this.snackbar.open('Password successfully resetted', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        }
      },
      (error) => {
        this.form.reset();
        this.snackbar.open(
          'Something went wrong <br/>' + error?.error?.message,
          'x',
          {
            duration: 3000,
            panelClass: 'notif-error',
          }
        );
      }
    );
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
