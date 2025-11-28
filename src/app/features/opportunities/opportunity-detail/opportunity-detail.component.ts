import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opportunity, OpportunityService } from '../../../core/services/opportunity.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

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
    private authService = inject(AuthService);
    private snackBar = inject(MatSnackBar);

    opportunity = signal<Opportunity | null>(null);

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                const id = Number(params.get('id'));
                return this.opportunityService.getOpportunityById(id);
            })
        ).subscribe(opp => {
            this.opportunity.set(opp);
        });
    }

    apply() {
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

        if (opp && user) {
            this.opportunityService.apply(opp.id, user.id).subscribe(() => {
                this.snackBar.open('Candidatura enviada com sucesso!', 'OK', { duration: 3000 });
            });
        }
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'https://via.placeholder.com/800x400/e0e0e0/666666?text=Imagem+Indispon%C3%ADvel';
    }
}
