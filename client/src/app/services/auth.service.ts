import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DecodedToken,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UpdatePasswordDTO,
  User,
} from '../models/authRequest';

import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5244/api/Auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private loadUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const user: User = {
          userid: decodedToken.userid,
          email: decodedToken.email,
        };
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Decoding token failed', error);
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http
      .post(`${this.baseUrl}/login`, loginRequest, { responseType: 'text' })
      .pipe(
        map((token: string) => {
          localStorage.setItem('token', token);
          const decodedToken = jwtDecode<DecodedToken>(token);
          const user: User = {
            userid: decodedToken.userid,
            email: decodedToken.email,
          };
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  updateUserPassword(updatePasswordDTO: UpdatePasswordDTO): Observable<any> {
    const headers = { Authorization: `Bearer ${this.getToken()}` };
    return this.http.post(`${this.baseUrl}/update-user`, updatePasswordDTO, {
      headers,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  public getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}
