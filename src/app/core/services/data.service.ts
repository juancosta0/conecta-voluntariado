import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface AppData {
    users: any[];
    opportunities: any[];
    applications: any[];
    organizations: any[];
    notifications: any[];
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private http = inject(HttpClient);
    private readonly STORAGE_KEY = 'conecta_voluntario_data';

    private dataSubject = new BehaviorSubject<AppData | null>(null);
    data$ = this.dataSubject.asObservable();

    constructor() {
        this.initializeData();
    }

    private initializeData() {
        const storedData = localStorage.getItem(this.STORAGE_KEY);

        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (this.isValidData(parsedData)) {
                    this.dataSubject.next(parsedData);
                } else {
                    console.warn('Invalid data in localStorage, reloading from assets.');
                    this.loadFromAssets();
                }
            } catch (e) {
                console.error('Error parsing localStorage data', e);
                this.loadFromAssets();
            }
        } else {
            this.loadFromAssets();
        }
    }

    private loadFromAssets() {
        this.http.get<AppData>('assets/data/initial-data.json').subscribe({
            next: (data) => {
                this.saveData(data);
            },
            error: (err) => {
                console.error('Failed to load initial data from assets', err);
                // Initialize with empty structure if assets fail
                this.saveData({
                    users: [],
                    opportunities: [],
                    applications: [],
                    organizations: [],
                    notifications: []
                });
            }
        });
    }

    private isValidData(data: any): boolean {
        return data && Array.isArray(data.users) && Array.isArray(data.opportunities);
    }

    private saveData(data: AppData) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        this.dataSubject.next(data);
    }

    // Generic Getters
    getUsers(): Observable<any[]> {
        return this.data$.pipe(map(data => data?.users || []));
    }

    getOpportunities(): Observable<any[]> {
        return this.data$.pipe(map(data => data?.opportunities || []));
    }

    getApplications(): Observable<any[]> {
        return this.data$.pipe(map(data => data?.applications || []));
    }

    getOrganizations(): Observable<any[]> {
        return this.data$.pipe(map(data => data?.organizations || []));
    }

    getNotifications(): Observable<any[]> {
        return this.data$.pipe(map(data => data?.notifications || []));
    }

    // Generic CRUD Operations
    addItem(collection: keyof AppData, item: any): Observable<any> {
        const currentData = this.dataSubject.value;
        if (!currentData) return of(null);

        const updatedCollection = [...currentData[collection], item];
        const updatedData = { ...currentData, [collection]: updatedCollection };

        this.saveData(updatedData);
        return of(item);
    }

    updateItem(collection: keyof AppData, id: number | string, updates: any): Observable<any> {
        const currentData = this.dataSubject.value;
        if (!currentData) return of(null);

        const updatedCollection = currentData[collection].map((item: any) => {
            if (String(item.id) === String(id)) {
                return { ...item, ...updates };
            }
            return item;
        });

        const updatedData = { ...currentData, [collection]: updatedCollection };
        this.saveData(updatedData);

        const updatedItem = updatedCollection.find((item: any) => String(item.id) === String(id));
        return of(updatedItem);
    }

    deleteItem(collection: keyof AppData, id: number | string): Observable<void> {
        const currentData = this.dataSubject.value;
        if (!currentData) return of();

        const updatedCollection = currentData[collection].filter((item: any) => String(item.id) !== String(id));
        const updatedData = { ...currentData, [collection]: updatedCollection };

        this.saveData(updatedData);
        return of();
    }
}
