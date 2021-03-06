import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '@template/animations/fade-in-up.animation';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CustomValidatorsService } from 'src/app/shared/services/custom-validators.service';

@Component({
  selector: 'template-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUpAnimation],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  model: any = {};
  inputType = 'password';
  visible = false;
  responseError;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
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

  signUp() {
    this.authService.signUp(this.model).subscribe(
      (response) => {
        if (response && response.status === 'success') {
          this.router.navigate(['private']);
          this.snackbar.open('User Successfully Created', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        }
      },
      (error) => {
        this.responseError = error?.error?.message;
        // this.form.reset();
        // this.snackbar.open(error.error.message, 'x', {
        //   duration: 3000,
        //   panelClass: 'notif-error',
        // });
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
