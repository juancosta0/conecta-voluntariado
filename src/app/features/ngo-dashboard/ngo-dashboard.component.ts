import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OpportunityService, Opportunity } from '../../core/services/opportunity.service';
import { ApplicationService } from '../../core/services/application.service';
import { NotificationService } from '../../core/services/notification.service';
import { Application, ApplicationStatus } from '../../core/models/application.model';
import { NotificationType } from '../../core/models/notification.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface OpportunityWithApplications {
    opportunity: Opportunity;
    applications: Application[];
}

@Component({
    selector: 'app-ngo-dashboard',
    templateUrl: './ngo-dashboard.component.html',
    styleUrls: ['./ngo-dashboard.component.css'],
    standalone: false
})
export class NgoDashboardComponent implements OnInit {
    private authService = inject(AuthService);
    private opportunityService = inject(OpportunityService);
    private applicationService = inject(ApplicationService);
    private notificationService = inject(NotificationService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    opportunitiesWithApplications = signal<OpportunityWithApplications[]>([]);
    stats = signal({
        totalOpportunities: 0,
        totalApplications: 0,
        pendingApplications: 0,
        acceptedApplications: 0
    });

    ngOnInit() {
        console.log('=== NgoDashboard.ngOnInit ===');
        const user = this.authService.currentUser();
        console.log('User in ngOnInit:', user);

        if (!user || (!this.authService.isNGO() && user.username !== 'admin')) {
            console.log('User not authorized, redirecting...');
            this.router.navigate(['/']);
            return;
        }

        console.log('User authorized, loading dashboard data...');
        this.loadDashboardData();
    }

    loadDashboardData() {
        console.log('=== NgoDashboard.loadDashboardData ===');
        const user = this.authService.currentUser();
        console.log('Current user:', user);

        if (!user) {
            console.log('No user found, returning...');
            return;
        }

        console.log('Getting opportunities for NGO ID:', user.id);
        // Get opportunities for this NGO
        this.opportunityService.getOpportunitiesByNgo(user.id).subscribe((opportunities: Opportunity[]) => {
            console.log('Opportunities for NGO:', opportunities);

            // For each opportunity, get its applications (with error handling)
            const requests = opportunities.map((opp: Opportunity) =>
                this.applicationService.getApplicationsWithDetails(opp.id).pipe(
                    catchError(() => of([]))
                )
            );

            console.log('Number of requests:', requests.length);

            if (requests.length > 0) {
                console.log('Calling forkJoin...');
                forkJoin(requests).subscribe((applicationsArrays: Application[][]) => {
                    console.log('=== forkJoin completed ===');
                    console.log('Applications arrays:', applicationsArrays);

                    const data: OpportunityWithApplications[] = opportunities.map((opp: Opportunity, index: number) => ({
                        opportunity: opp,
                        applications: applicationsArrays[index]
                    }));

                    console.log('Final dashboard data:', data);
                    this.opportunitiesWithApplications.set(data);
                    this.calculateStats(data);
                });
            } else {
                console.log('No opportunities found, setting empty array');
                this.opportunitiesWithApplications.set([]);
                this.calculateStats([]);
            }
        });
    }

    calculateStats(data: OpportunityWithApplications[]) {
        const allApplications = data.flatMap(d => d.applications);
        this.stats.set({
            totalOpportunities: data.length,
            totalApplications: allApplications.length,
            pendingApplications: allApplications.filter(a => a.status === 'pending').length,
            acceptedApplications: allApplications.filter(a => a.status === 'accepted').length
        });
    }

    acceptApplication(application: Application) {
        this.applicationService.updateApplicationStatus(application.id, ApplicationStatus.ACCEPTED).subscribe(() => {
            // Create notification for volunteer
            this.notificationService.createNotification({
                userId: application.userId,
                title: 'Candidatura Aceita! 🎉',
                message: `Sua candidatura para "${application.opportunityTitle}" foi aceita! A organização entrará em contato em breve.`,
                type: NotificationType.ACCEPTANCE,
                relatedId: application.id
            }).subscribe();

            this.snackBar.open('Candidatura aceita com sucesso!', 'OK', { duration: 3000 });
            this.loadDashboardData();
        });
    }

    rejectApplication(application: Application) {
        this.applicationService.updateApplicationStatus(application.id, ApplicationStatus.REJECTED).subscribe(() => {
            // Create notification for volunteer
            this.notificationService.createNotification({
                userId: application.userId,
                title: 'Atualização de Candidatura',
                message: `Infelizmente sua candidatura para "${application.opportunityTitle}" não foi selecionada desta vez. Continue procurando outras oportunidades!`,
                type: NotificationType.REJECTION,
                relatedId: application.id
            }).subscribe();

            this.snackBar.open('Candidatura recusada.', 'OK', { duration: 3000 });
            this.loadDashboardData();
        });
    }

    getStatusLabel(status: ApplicationStatus): string {
        const labels: Record<ApplicationStatus, string> = {
            [ApplicationStatus.PENDING]: 'Pendente',
            [ApplicationStatus.ACCEPTED]: 'Aceita',
            [ApplicationStatus.REJECTED]: 'Recusada'
        };
        return labels[status] || status;
    }

    getStatusClass(status: ApplicationStatus): string {
        return `status-${status.toLowerCase()}`;
    }
}
