import { Injectable, inject } from '@angular/core';
import { Observable, map, forkJoin, switchMap, of, tap, take } from 'rxjs';
import { Application, ApplicationStatus } from '../models/application.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private dataService = inject(DataService);

    submitApplication(opportunityId: number | string, userId: number | string, message?: string): Observable<Application> {
        console.log('=== ApplicationService.submitApplication ===');
        console.log('OpportunityId:', opportunityId, 'UserId:', userId);

        const application: Partial<Application> = {
            id: Date.now().toString(),
            opportunityId,
            userId,
            status: ApplicationStatus.PENDING,
            appliedDate: new Date().toISOString(),
            message
        };

        console.log('Application object:', application);

        return this.dataService.addItem('applications', application).pipe(
            tap((saved: Application) => console.log('Application saved to localStorage:', saved))
        );
    }

    getMyApplications(userId: number | string): Observable<Application[]> {
        return this.dataService.getApplications().pipe(
            take(1),
            switchMap(applications => {
                const userApps = applications.filter(a => String(a.userId) === String(userId));
                if (userApps.length === 0) return of([]);

                // Manually expand opportunity details
                return this.dataService.getOpportunities().pipe(
                    take(1),
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
        console.log('=== getApplicationsByOpportunity ===', opportunityId);
        return this.dataService.getApplications().pipe(
            take(1),
            switchMap(applications => {
                console.log('All applications from storage:', applications);
                const oppApps = applications.filter(a => String(a.opportunityId) === String(opportunityId));
                console.log(`Applications for opportunity ${opportunityId}:`, oppApps);

                if (oppApps.length === 0) return of([]);

                // Manually expand user details
                return this.dataService.getUsers().pipe(
                    take(1),
                    map(users => {
                        return oppApps.map(app => {
                            // Normalize data: ensure appliedDate exists (handle legacy 'date' field)
                            const normalizedApp: Application = {
                                ...app,
                                appliedDate: app.appliedDate || (app as any).date || new Date().toISOString(),
                                user: users.find(u => String(u.id) === String(app.userId))
                            } as Application;
                            console.log('Normalized application:', normalizedApp);
                            return normalizedApp;
                        });
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
            take(1),
            switchMap(opportunities => {
                const ngoOpportunities = opportunities.filter(o => String(o.ngoId) === String(ngoId));
                const ngoOppIds = ngoOpportunities.map(o => String(o.id));

                if (ngoOppIds.length === 0) return of([]);

                // Then get applications for those opportunities
                return this.dataService.getApplications().pipe(
                    take(1),
                    switchMap(applications => {
                        const relevantApps = applications.filter(a => ngoOppIds.includes(String(a.opportunityId)));
                        if (relevantApps.length === 0) return of([]);

                        // Expand both opportunity and user details
                        return this.dataService.getUsers().pipe(
                            take(1),
                            map(users => {
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
