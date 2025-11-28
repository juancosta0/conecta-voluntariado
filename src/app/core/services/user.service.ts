import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private dataService = inject(DataService);

    getUserById(id: number | string): Observable<User> {
        return this.dataService.getUsers().pipe(
            map(users => users.find(u => String(u.id) === String(id))!)
        );
    }

    updateUser(id: number | string, user: Partial<User>): Observable<User> {
        return this.dataService.updateItem('users', id, user);
    }
}
