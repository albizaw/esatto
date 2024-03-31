export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
}

export interface LoginResponse {
  token: string;
}

export interface DecodedToken {
  nameid: number;
  email: string;
}
