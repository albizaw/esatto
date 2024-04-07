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
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.refreshCurrentUser();
  }

  private refreshCurrentUser(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const user: User = {
          userid: decodedToken.userid,
          email: decodedToken.email,
        };
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error decoding token:', error);
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
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;
      return decodedToken.exp > now;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  public getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}
