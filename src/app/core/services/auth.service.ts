import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserType } from '../models/user.model';
import { DataService } from './data.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataService = inject(DataService);
  private router = inject(Router);

  currentUser = signal<User | null>(null);

  constructor() {
    // Restore session if exists
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.dataService.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.currentUser.set(user);
          localStorage.setItem('user', JSON.stringify(user));

          if (user.userType === UserType.NGO) {
            this.router.navigate(['/ngo']);
          } else {
            this.router.navigate(['/']);
          }
          return true;
        }
        return false;
      })
    );
  }

  register(userData: Partial<User>): Observable<boolean> {
    const newUser: User = {
      ...(userData as User),
      id: Date.now().toString(),
      token: `fake-jwt-token-${Date.now()}`
    };

    return this.dataService.addItem('users', newUser).pipe(
      map(() => {
        this.currentUser.set(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
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

  isNGO(): boolean {
    const user = this.currentUser();
    return user?.userType === UserType.NGO;
  }

  isVolunteer(): boolean {
    const user = this.currentUser();
    return user?.userType === UserType.VOLUNTEER;
  }
}
