import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opportunity, OpportunityService } from '../../../core/services/opportunity.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { ApplicationService } from '../../../core/services/application.service';

@Component({
    selector: 'app-opportunity-detail',
    templateUrl: './opportunity-detail.component.html',
    styleUrls: ['./opportunity-detail.component.css'],
    standalone: false
})
export class OpportunityDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private opportunityService = inject(OpportunityService);
    private applicationService = inject(ApplicationService);
    private authService = inject(AuthService);
    private snackBar = inject(MatSnackBar);

    opportunity = signal<Opportunity | null>(null);

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id')!;
                return this.opportunityService.getOpportunityById(id);
            })
        ).subscribe(opp => {
            this.opportunity.set(opp);
        });
    }

    apply() {
        console.log('=== APPLY CLICKED ===');
        console.log('Is authenticated:', this.authService.isAuthenticated());
        console.log('Is volunteer:', this.authService.isVolunteer());

        if (!this.authService.isAuthenticated()) {
            this.snackBar.open('Faça login para se candidatar', 'Login', { duration: 3000 })
                .onAction().subscribe(() => this.router.navigate(['/login']));
            return;
        }

        if (!this.authService.isVolunteer()) {
            this.snackBar.open('Apenas voluntários podem se candidatar', 'OK', { duration: 3000 });
            return;
        }

        const opp = this.opportunity();
        const user = this.authService.currentUser();

        console.log('Opportunity:', opp);
        console.log('User:', user);

        if (opp && user) {
            console.log('Submitting application for opportunity:', opp.id, 'user:', user.id);
            this.applicationService.submitApplication(opp.id, user.id).subscribe({
                next: (result) => {
                    console.log('Application submitted successfully:', result);
                    this.snackBar.open('Candidatura enviada com sucesso!', 'OK', { duration: 3000 });
                },
                error: (err) => {
                    console.error('Error submitting application:', err);
                    this.snackBar.open('Erro ao enviar candidatura', 'OK', { duration: 3000 });
                }
            });
        } else {
            console.error('Missing opportunity or user data');
        }
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'https://via.placeholder.com/800x400/e0e0e0/666666?text=Imagem+Indispon%C3%ADvel';
    }
}
