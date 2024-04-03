import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from 'src/app/components/add-patient/add-patient.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { PatientsListComponent } from 'src/app/components/patients-list/patients-list.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [
      {
        path: 'patients',
        component: PatientsListComponent,
      },
      {
        path: 'add-patient',
        component: AddPatientComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
