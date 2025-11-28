import { Injectable, inject } from '@angular/core';
import { Observable, map, forkJoin, switchMap, of } from 'rxjs';
import { Application, ApplicationStatus } from '../models/application.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private dataService = inject(DataService);

    submitApplication(opportunityId: number | string, userId: number | string, message?: string): Observable<Application> {
        const application: Partial<Application> = {
            id: Date.now().toString(),
            opportunityId,
            userId,
            status: ApplicationStatus.PENDING,
            appliedDate: new Date().toISOString(),
            message
        };
        return this.dataService.addItem('applications', application);
    }

    getMyApplications(userId: number | string): Observable<Application[]> {
        return this.dataService.getApplications().pipe(
            switchMap(applications => {
                const userApps = applications.filter(a => String(a.userId) === String(userId));
                if (userApps.length === 0) return of([]);

                // Manually expand opportunity details
                return this.dataService.getOpportunities().pipe(
                    map(opportunities => {
                        return userApps.map(app => ({
                            ...app,
                            opportunity: opportunities.find(o => String(o.id) === String(app.opportunityId))
                        }));
                    })
                );
            })
        );
    }

    getApplicationsByOpportunity(opportunityId: number | string): Observable<Application[]> {
        return this.dataService.getApplications().pipe(
            switchMap(applications => {
                const oppApps = applications.filter(a => String(a.opportunityId) === String(opportunityId));
                if (oppApps.length === 0) return of([]);

                // Manually expand user details
                return this.dataService.getUsers().pipe(
                    map(users => {
                        return oppApps.map(app => ({
                            ...app,
                            user: users.find(u => String(u.id) === String(app.userId))
                        }));
                    })
                );
            })
        );
    }

    updateApplicationStatus(applicationId: number | string, status: ApplicationStatus): Observable<Application> {
        return this.dataService.updateItem('applications', applicationId, { status });
    }

    deleteApplication(applicationId: number | string): Observable<void> {
        return this.dataService.deleteItem('applications', applicationId);
    }

    // Get applications for all opportunities belonging to an NGO
    getApplicationsByNgo(ngoId: number | string): Observable<Application[]> {
        // First get all opportunities for this NGO
        return this.dataService.getOpportunities().pipe(
            switchMap(opportunities => {
                const ngoOpportunities = opportunities.filter(o => String(o.ngoId) === String(ngoId));
                const ngoOppIds = ngoOpportunities.map(o => String(o.id));

                if (ngoOppIds.length === 0) return of([]);

                // Then get applications for those opportunities
                return this.dataService.getApplications().pipe(
                    switchMap(applications => {
                        const relevantApps = applications.filter(a => ngoOppIds.includes(String(a.opportunityId)));
                        if (relevantApps.length === 0) return of([]);

                        // Expand both opportunity and user details
                        return forkJoin({
                            users: this.dataService.getUsers()
                        }).pipe(
                            map(({ users }) => {
                                return relevantApps.map(app => ({
                                    ...app,
                                    opportunity: ngoOpportunities.find(o => String(o.id) === String(app.opportunityId)),
                                    user: users.find(u => String(u.id) === String(app.userId))
                                }));
                            })
                        );
                    })
                );
            })
        );
    }

    // Get applications with expanded details (volunteer and opportunity info)
    getApplicationsWithDetails(opportunityId: number | string): Observable<Application[]> {
        return this.getApplicationsByOpportunity(opportunityId);
    }
}
