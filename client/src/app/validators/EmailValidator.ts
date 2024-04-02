import { FormControl, ValidationErrors } from '@angular/forms';

export class EmailValidation {
  static email(control: FormControl): ValidationErrors | null {
    const value: string = control.value || '';
    const errors: ValidationErrors = {};

    if (!value) {
      errors['required'] = 'Email is required.';
      return errors;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      errors['emailFormat'] = 'Invalid email format.';
    }

    return Object.keys(errors).length ? errors : null;
  }
}
