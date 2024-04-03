// custom-validators.ts
import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static required(control: FormControl): ValidationErrors | null {
    return control.value ? null : { required: 'This field is required.' };
  }

  static firstAndLastName(control: FormControl): ValidationErrors | null {
    const value: string = control.value || '';
    const errors: ValidationErrors = {};

    if (!value) {
      errors['required'] = 'Name is required.';
    } else {
      if (!/^[a-zA-Z ]*$/.test(value)) {
        errors['name'] = 'Name must contain only letters and spaces.';
      }
      if (value.length < 2) {
        errors['minlength'] = 'Name must be at least 2 characters long.';
      }
    }

    return Object.keys(errors).length ? errors : null;
  }

  static pesel(control: FormControl): ValidationErrors | null {
    const value: string = control.value || '';
    const errors: ValidationErrors = {};

    if (!value) {
      errors['required'] = 'PESEL is required.';
    } else if (!/^[0-9]{11}$/.test(value)) {
      errors['pesel'] = 'PESEL must be exactly 11 digits long.';
    }

    return Object.keys(errors).length ? errors : null;
  }

  static cityAndStreet(name: string) {
    return (control: FormControl): ValidationErrors | null => {
      const value: string = control.value || '';
      const errors: ValidationErrors = {};
      if (!value) {
        errors['required'] = `${name} is required.`;
      } else if (value.length < 2) {
        errors['minlength'] = `${name} must be at least 2 characters long.`;
      }
      return Object.keys(errors).length ? errors : null;
    };
  }

  static zipCode(control: FormControl): ValidationErrors | null {
    const value: string = control.value || '';
    const errors: ValidationErrors = {};
    if (!value) {
      errors['required'] = 'Zip code is required.';
    }
    if (!/^\d{2}-\d{3}$/.test(value)) {
      errors['zipCode'] = 'Zip code must be in the format XX-XXX.';
    }
    return Object.keys(errors).length ? errors : null;
  }
}
