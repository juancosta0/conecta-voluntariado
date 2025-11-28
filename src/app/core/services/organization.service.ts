import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization.model';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    getOrganizations(): Observable<Organization[]> {
        return this.http.get<Organization[]>(`${this.apiUrl}/organizations`);
    }

    getOrganizationById(id: number): Observable<Organization> {
        return this.http.get<Organization>(`${this.apiUrl}/organizations/${id}`);
    }

    getOrganizationByNgoId(ngoId: number): Observable<Organization[]> {
        return this.http.get<Organization[]>(`${this.apiUrl}/organizations?ngoId=${ngoId}`);
    }

    createOrganization(organization: Partial<Organization>): Observable<Organization> {
        return this.http.post<Organization>(`${this.apiUrl}/organizations`, organization);
    }

    updateOrganization(id: number, organization: Partial<Organization>): Observable<Organization> {
        return this.http.patch<Organization>(`${this.apiUrl}/organizations/${id}`, organization);
    }

    deleteOrganization(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/organizations/${id}`);
    }
}
