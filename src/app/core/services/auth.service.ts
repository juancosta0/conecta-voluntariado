import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User, UserType } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

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

  login(username: string, password: string): Observable<boolean> {
    console.log('AuthService: login attempt', username, password);

    // Fetch users from JSON Server
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        // Find user with matching credentials
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
          console.log('AuthService: login success', user);
          this.currentUser.set(user);
          localStorage.setItem('user', JSON.stringify(user));

          // Navigate based on user type
          if (user.userType === UserType.NGO) {
            this.router.navigate(['/ngo']).then(success =>
              console.log('Navigation to /ngo result:', success)
            );
          } else {
            this.router.navigate(['/']);
          }

          return true;
        }

        console.log('AuthService: login failed - invalid credentials');
        return false;
      }),
      catchError(error => {
        console.error('AuthService: login error', error);
        return of(false);
      })
    );
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
