import { Injectable } from '@angular/core';

export interface User {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  private token: string | null = null;

  constructor() {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('accessToken');
    if (savedUser && savedToken) {
      this.user = JSON.parse(savedUser);
      this.token = savedToken;
    }
  }

  setLogin(user: User, token: string) {
    this.user = user;
    this.token = token;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', token);
    console.log('[AuthService]  Logged in:', user);
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    this.user = null;
    this.token = null;
    console.log('[AuthService] 🚪 Logged out');
  }
}
