import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/authRequest';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidation } from 'src/app/validators/PasswordValidator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  currentUser: User | null = null;
  updatePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: NgToastService
  ) {
    this.updatePasswordForm = this.fb.group(
      {
        newPassword: ['', [PasswordValidation.passwordStrength]],
        confirmNewPassword: ['', [PasswordValidation.passwordStrength]],
      },
      { validator: this.checkPasswords }
    );
    this.loadCurrentUser();
  }

  onSubmit() {
    if (this.updatePasswordForm.valid) {
      this.authService
        .updateUserPassword(this.updatePasswordForm.value)
        .subscribe({
          next: () => {
            this.toast.success({
              detail: 'Success',
              summary: 'Password updated successfully',
              duration: 5000,
            });
            this.updatePasswordForm.reset();
          },
          error: (error) => {
            this.toast.error({
              detail: 'Error',
              summary: error.message,
              duration: 5000,
            });
          },
        });
    }
  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmNewPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  loadCurrentUser() {
    this.currentUser = this.authService.currentUserValue;
  }

  getControl(name: string): FormControl {
    const control = this.updatePasswordForm.get(name);
    if (!control) {
      throw new Error(`FormControl '${name}' not found in form.`);
    }
    return control as FormControl;
  }
}
