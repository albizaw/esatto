import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DecodedToken,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '../models/authRequest';

import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5244/api/Auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(registerRequest: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest) {
    return this.http
      .post(`${this.baseUrl}/login`, loginRequest, { responseType: 'text' })
      .pipe(
        map((token: string) => {
          const decodedToken = jwtDecode<DecodedToken>(token);
          const user: User = {
            userid: decodedToken.userid,
            email: decodedToken.email,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
