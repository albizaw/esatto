import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './shared/password-input/password-input.component';
import { EmailInputComponent } from './shared/email-input/email-input.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FirstAndLastNameComponent } from './shared/first-and-last-name/first-and-last-name.component';
import { PeselComponent } from './shared/pesel/pesel.component';
import { CityAndStreetComponent } from './shared/city-and-street/city-and-street.component';
import { ZipCodeComponent } from './shared/zip-code/zip-code.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { MatSortModule } from '@angular/material/sort';
import { EditPatientDialogComponent } from './components/edit-patient-dialog/edit-patient-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    PasswordInputComponent,
    EmailInputComponent,
    DashboardComponent,
    AddPatientComponent,
    FirstAndLastNameComponent,
    PeselComponent,
    CityAndStreetComponent,
    ZipCodeComponent,
    PatientsListComponent,
    EditPatientDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgToastModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
