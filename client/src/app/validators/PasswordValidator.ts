import { FormControl, ValidationErrors } from '@angular/forms';

export class PasswordValidation {
  static passwordStrength(control: FormControl): ValidationErrors | null {
    const value: string = control.value || '';
    const errors: ValidationErrors = {};

    if (!value) {
      errors['required'] = 'Password is required.';
      return errors;
    }

    if (value.length < 8) {
      errors['passwordLength'] = 'Password must be at least 8 characters long.';
    }

    if (!/[0-9]/.test(value)) {
      errors['passwordNumber'] = 'Password must include at least one number.';
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['passwordSpecial'] =
        'Password must include at least one special character.';
    }

    return Object.keys(errors).length ? errors : null;
  }
}
