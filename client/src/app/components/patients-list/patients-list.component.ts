import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, switchMap, map } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { PatientDTO } from '../../models/patientRequest';
import { PatientService } from 'src/app/services/patient.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditPatientDialogComponent } from '../edit-patient-dialog/edit-patient-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { LayoutService } from 'src/app/services/layout/layout.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = [];

  isLoading = true;
  showPaginator = true;
  dataSource = new MatTableDataSource<PatientDTO>();
  searchControl = new FormControl('');

  constructor(
    private patientService: PatientService,
    private layoutService: LayoutService,
    private toast: NgToastService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchPatients();

    this.layoutService.isMobile$.subscribe((isMobile) => {
      if (isMobile) {
        this.displayedColumns = ['id', 'firstName', 'lastName', 'actions'];
      } else {
        this.displayedColumns = [
          'id',
          'firstName',
          'lastName',
          'PESEL',
          'city',
          'street',
          'zipCode',
          'actions',
        ];
      }
    });

    this.patientService.getPatients().subscribe((patients) => {
      this.dataSource.data = patients;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.dataSource.filterPredicate = (data: PatientDTO, filter: string) => {
      const accumulator = (currentTerm: string, key: string) => {
        return key === 'pesel'
          ? currentTerm + data.pesel
          : currentTerm +
              data.id +
              data.firstName +
              data.lastName +
              data.city +
              data.street +
              data.zipCode;
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.searchControl.valueChanges
      .pipe(startWith(''))
      .subscribe((filterValue) => {
        this.dataSource.filter = filterValue ?? '';
        this.showPaginator = this.dataSource.filteredData.length > 0;
      });
  }

  fetchPatients() {
    this.isLoading = true;
    this.patientService.getPatients().subscribe((patients) => {
      this.isLoading = false;
      this.dataSource.data = patients;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    });
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
        this.fetchPatients();
      },
      error: (error) => {
        console.error('Error deleting patient:', error);
      },
    });
  }

  openEditDialog(patient: PatientDTO): void {
    const dialogRef = this.dialog.open(EditPatientDialogComponent, {
      width: '600px',
      data: { patient },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.fetchPatients();
      }
    });
  }
}
