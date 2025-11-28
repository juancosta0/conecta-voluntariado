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
    console.log('AuthService: login attempt', username, pass);
    // Mock login logic - check against stored users or defaults
    if (username === 'admin' && pass === 'admin') {
      console.log('AuthService: admin login success');
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
    } else if (username === 'ong_esperanca' && pass === 'esperanca123') {
      console.log('AuthService: ngo login success');
      const user: User = {
        id: 2,
        username: 'ong_esperanca',
        name: 'Maria Silva',
        email: 'contato@esperanca.org',
        userType: UserType.NGO,
        organizationName: 'Instituto Esperança',
        organizationId: 1,
        description: 'Trabalhamos com educação e desenvolvimento comunitário há mais de 15 anos.',
        website: 'https://esperanca.org',
        address: 'Rua da Esperança, 123',
        token: 'fake-jwt-token-ngo1'
      };
      this.currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/ngo']).then(success => console.log('Navigation to /ngo result:', success));
      return true;
    }
    console.log('AuthService: login failed');
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
