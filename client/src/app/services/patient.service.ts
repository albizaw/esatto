import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientDTO } from '../models/patientRequest';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:5244/api/Patients';
  constructor(private http: HttpClient, private authService: AuthService) {}

  addPatient(patient: PatientDTO): Observable<PatientDTO> {
    const headers = this.bearerHeaders();
    return this.http.post<PatientDTO>(`${this.baseUrl}/addPatient`, patient, {
      headers,
    });
  }

  getPatient(id: number): Observable<PatientDTO> {
    return this.http.get<PatientDTO>(`${this.baseUrl}/${id}`);
  }

  getPatients(): Observable<PatientDTO[]> {
    const headers = this.bearerHeaders();
    return this.http.get<PatientDTO[]>(`${this.baseUrl}`, {
      headers,
    });
  }

  deletePatient(id: number): Observable<any> {
    const headers = this.bearerHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers,
    });
  }

  editPatient(id: number, patient: PatientDTO): Observable<PatientDTO> {
    return this.http.put<PatientDTO>(`${this.baseUrl}/${id}`, patient);
  }

  bearerHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
