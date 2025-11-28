import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OpportunityService, Opportunity } from '../../core/services/opportunity.service';
import { ApplicationService } from '../../core/services/application.service';
import { NotificationService } from '../../core/services/notification.service';
import { Application, ApplicationStatus } from '../../core/models/application.model';
import { NotificationType } from '../../core/models/notification.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

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
        const user = this.authService.currentUser();
        if (!user || (!this.authService.isNGO() && user.username !== 'admin')) {
            this.router.navigate(['/']);
            return;
        }

        this.loadDashboardData();
    }

    loadDashboardData() {
        const user = this.authService.currentUser();
        if (!user) return;

        // Get opportunities for this NGO
        this.opportunityService.getOpportunitiesByNgo(user.id).subscribe((opportunities: Opportunity[]) => {
            // For each opportunity, get its applications
            const requests = opportunities.map((opp: Opportunity) =>
                this.applicationService.getApplicationsWithDetails(opp.id)
            );

            if (requests.length > 0) {
                forkJoin(requests).subscribe((applicationsArrays: Application[][]) => {
                    const data: OpportunityWithApplications[] = opportunities.map((opp: Opportunity, index: number) => ({
                        opportunity: opp,
                        applications: applicationsArrays[index]
                    }));

                    this.opportunitiesWithApplications.set(data);
                    this.calculateStats(data);
                });
            } else {
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
                userId: application.volunteerId,
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
                userId: application.volunteerId,
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
