import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ImmediateErrorStateMatcher } from 'src/app/helpers/ErrorStateMatcher';
import { RegisterRequest } from 'src/app/models/authRequest';
import { EmailValidation } from 'src/app/validators/EmailValidator';
import { PasswordValidation } from 'src/app/validators/PasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  submitted: boolean = false;
  registerForm: FormGroup;

  on: string = 'visibility';
  off: string = 'visibility_off';
  isText: boolean = false;
  type: string = 'password';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: [null, [EmailValidation.email]],
      password: ['', [PasswordValidation.passwordStrength]],
      confirmPassword: ['', [PasswordValidation.passwordStrength]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
      };

      this.authService.register(registerRequest).subscribe({
        next: () => {
          console.log('Registration successful');
        },
        error: (error) => {
          console.error('Registration error:', error);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  getControl(name: string): FormControl {
    const control = this.registerForm.get(name);
    if (!control) {
      throw new Error(`FormControl '${name}' not found in form.`);
    }
    return control as FormControl;
  }
}
