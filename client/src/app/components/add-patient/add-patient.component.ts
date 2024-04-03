import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from 'src/app/validators/CustomValidators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PatientDTO } from 'src/app/models/patientRequest';
import { PatientService } from '../../services/patient.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddPatientComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private toast: NgToastService
  ) {
    this.firstFormGroup = this.fb.group({
      firstName: ['', [CustomValidators.firstAndLastName]],
      lastName: ['', [CustomValidators.firstAndLastName]],
      PESEL: ['', [CustomValidators.pesel]],
      city: ['', [CustomValidators.cityAndStreet('City')]],
      street: ['', [CustomValidators.cityAndStreet('Street')]],
      zipCode: ['', [CustomValidators.zipCode]],
    });

    this.secondFormGroup = this.fb.group({
      illnessName: ['', Validators.required],
      illnessDescription: [''],
    });
  }

  getFirstFormControl(name: string): FormControl {
    const control = this.firstFormGroup.get(name);
    if (!control) {
      throw new Error(`FormControl '${name}' not found in form.`);
    }
    return control as FormControl;
  }

  addPatient() {
    if (this.isFormValid()) {
      const patientData: PatientDTO = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
      };

      this.patientService.addPatient(patientData).subscribe({
        next: (newPatient) => {
          console.log('Patient added successfully:', newPatient);
          this.toast.success({
            detail: 'Success!',
            summary: 'Patient added successfully',
            duration: 5000,
            position: 'bottomRight',
          });
        },
        error: (error) => {
          console.log('Error:', error);
          this.toast.error({
            detail: 'Add patient failed',
            summary: error.error,
            duration: 5000,
            position: 'bottomRight',
          });
        },
      });
    } else {
      console.error('Form is not valid, cannot add patient.');
    }
  }

  isFormValid(): boolean {
    return this.firstFormGroup.valid && this.secondFormGroup.valid;
  }
}
