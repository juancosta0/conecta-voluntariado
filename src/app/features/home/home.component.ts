import { Component, inject, OnInit, signal } from '@angular/core';
import { Opportunity, OpportunityService } from '../../core/services/opportunity.service';
import { OrganizationService } from '../../core/services/organization.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
    private opportunityService = inject(OpportunityService);
    private organizationService = inject(OrganizationService);

    opportunities = signal<Opportunity[]>([]);
    currentSlide = 0;

    // Dynamic statistics
    stats = signal({
        volunteers: 0,
        organizations: 0,
        livesImpacted: 0,
        cities: 0
    });

    ngOnInit() {
        this.loadOpportunities();
        this.loadStatistics();
    }

    loadOpportunities() {
        this.opportunityService.getOpportunities().subscribe(data => {
            this.opportunities.set(data);
        });
    }

    loadStatistics() {
        this.organizationService.getOrganizations().subscribe(orgs => {
            // Calculate total volunteers from all organizations
            const totalVolunteers = orgs.reduce((sum, org) => sum + (org.volunteers || 0), 0);

            // Calculate total lives impacted (volunteers * 2 as approximation)
            const livesImpacted = totalVolunteers * 2;

            // Get unique cities from opportunities
            this.opportunityService.getOpportunities().subscribe(opps => {
                const uniqueCities = new Set(opps.map(opp => opp.location.split(',')[0].trim()));

                this.stats.set({
                    volunteers: totalVolunteers,
                    organizations: orgs.length,
                    livesImpacted: livesImpacted,
                    cities: uniqueCities.size
                });
            });
        });
    }

    scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    nextSlide() {
        const opps = this.opportunities();
        if (opps.length > 0) {
            this.currentSlide = (this.currentSlide + 1) % opps.length;
        }
    }

    prevSlide() {
        const opps = this.opportunities();
        if (opps.length > 0) {
            this.currentSlide = (this.currentSlide - 1 + opps.length) % opps.length;
        }
    }

    goToSlide(index: number) {
        this.currentSlide = index;
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'https://via.placeholder.com/1200x500/e0e0e0/666666?text=Imagem+Indisponível';
    }
}
