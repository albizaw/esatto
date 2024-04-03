import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientDTO } from 'src/app/models/patientRequest';
import { PatientService } from '../../services/patient.service';
import { NgToastService } from 'ng-angular-popup';
import { CustomValidators } from 'src/app/validators/CustomValidators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrls: ['./edit-patient-dialog.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class EditPatientDialogComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private toast: NgToastService,
    public dialogRef: MatDialogRef<EditPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patient: PatientDTO }
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstName: [
        this.data.patient.firstName,
        [CustomValidators.firstAndLastName],
      ],
      lastName: [
        this.data.patient.lastName,
        [CustomValidators.firstAndLastName],
      ],
      PESEL: [this.data.patient.pesel, [CustomValidators.pesel]],
      city: [this.data.patient.city, [CustomValidators.cityAndStreet('City')]],
      street: [
        this.data.patient.street,
        [CustomValidators.cityAndStreet('Street')],
      ],
      zipCode: [this.data.patient.zipCode, [CustomValidators.zipCode]],
    });

    this.secondFormGroup = this.fb.group({
      illnessName: [this.data.patient.illnessName, Validators.required],
      illnessDescription: [this.data.patient.illnessDescription],
    });
  }

  isFormValid(): boolean {
    return this.firstFormGroup.valid && this.secondFormGroup.valid;
  }

  getFirstFormControl(name: string): FormControl {
    const control = this.firstFormGroup.get(name);
    if (!control) {
      throw new Error(`FormControl '${name}' not found in form.`);
    }
    return control as FormControl;
  }

  updatePatient(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const updatedPatient: PatientDTO = {
        id: this.data.patient.id,
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
      };

      this.patientService
        .editPatient(updatedPatient, this.data.patient.id)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
            this.toast.success({
              detail: 'Success',
              summary: 'Patient updated successfully',
              duration: 5000,
            });
          },
          error: (err) => {
            console.error('Error updating patient:', err);
          },
        });
    }
  }
}
