import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  // UI State via Signals
  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor() { }

  register(userData: Partial<User>): boolean {
    // Mock registration - in real app would call API
    const newUser: User = {
      ...(userData as User),
      id: Date.now(),
      token: `fake-jwt-token-${Date.now()}`
    };

    this.currentUser.set(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  }

  login(username: string, pass: string): boolean {
    // Mock login logic - check against stored users or defaults
    if (username === 'admin' && pass === 'admin') {
      const user: User = {
        id: 1,
        username: 'admin',
        name: 'Administrador',
        email: 'admin@conecta.com',
        userType: UserType.VOLUNTEER,
        token: 'fake-jwt-token-admin'
      };
      this.currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  isVolunteer(): boolean {
    return this.currentUser()?.userType === UserType.VOLUNTEER;
  }

  isNGO(): boolean {
    return this.currentUser()?.userType === UserType.NGO;
  }

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }
}
