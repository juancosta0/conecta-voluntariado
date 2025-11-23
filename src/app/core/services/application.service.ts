import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application, ApplicationStatus } from '../models/application.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    submitApplication(opportunityId: number, volunteerId: number, message?: string): Observable<Application> {
        const application: Partial<Application> = {
            opportunityId,
            volunteerId,
            status: ApplicationStatus.PENDING,
            appliedDate: new Date().toISOString(),
            message
        };
        return this.http.post<Application>(`${this.apiUrl}/applications`, application);
    }

    getMyApplications(volunteerId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.apiUrl}/applications?volunteerId=${volunteerId}`);
    }

    getApplicationsByOpportunity(opportunityId: number): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.apiUrl}/applications?opportunityId=${opportunityId}`);
    }

    updateApplicationStatus(applicationId: number, status: ApplicationStatus): Observable<Application> {
        return this.http.patch<Application>(`${this.apiUrl}/applications/${applicationId}`, { status });
    }

    deleteApplication(applicationId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/applications/${applicationId}`);
    }
}
