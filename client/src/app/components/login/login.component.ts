import { AuthService } from './../../services/auth.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImmediateErrorStateMatcher } from 'src/app/helpers/ErrorStateMatcher';
import { LoginRequest } from 'src/app/models/authRequest';
import { EmailValidation } from 'src/app/validators/EmailValidator';
import { PasswordValidation } from 'src/app/validators/PasswordValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted: boolean = false;
  loginForm: FormGroup;
  matcher = new ImmediateErrorStateMatcher();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [EmailValidation.email]],
      password: ['', [PasswordValidation.passwordStrength]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.login(loginRequest).subscribe({
        next: (user) => {
          console.log('User:', user);
        },
        error: (error) => {
          console.error('Login error:', error);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getControl(name: string): FormControl {
    const control = this.loginForm.get(name);
    if (!control) {
      throw new Error(`FormControl '${name}' not found in form.`);
    }
    return control as FormControl;
  }
}
