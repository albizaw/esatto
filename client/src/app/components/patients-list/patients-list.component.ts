import { Component, OnInit } from '@angular/core';
import { PatientDTO } from '../../models/patientRequest';
import { PatientService } from 'src/app/services/patient.service';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'PESEL',
    'city',
    'street',
    'zipCode',
    'actions',
  ];

  patients$: Observable<PatientDTO[]> = this.patientService.getPatients();

  constructor(
    private patientService: PatientService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients();
  }

  deletePatient(patientId: number): void {
    const confirmation = confirm(
      'Are you sure you want to delete this patient?'
    );
    if (!confirmation) {
      return;
    }

    this.patientService.deletePatient(patientId).subscribe({
      next: () => {
        this.toast.success({
          detail: 'Success!',
          summary: `Patient with ID ${patientId} deleted successfully.`,
          duration: 5000,
          position: 'bottomRight',
        });
        this.patients$ = this.patientService.getPatients();
      },
      error: (error) => {
        console.error('Error deleting patient:', error);
      },
    });
  }
}
