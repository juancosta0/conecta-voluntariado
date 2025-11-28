import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpportunityService, Opportunity } from '../../../core/services/opportunity.service';

@Component({
    selector: 'app-opportunities-list',
    templateUrl: './opportunities-list.component.html',
    styleUrls: ['./opportunities-list.component.css'],
    standalone: false
})
export class OpportunitiesListComponent implements OnInit {
    private opportunityService = inject(OpportunityService);
    private route = inject(ActivatedRoute);

    opportunities: Opportunity[] = [];
    searchTerm = '';

    ngOnInit() {
        // Check for organization filter from query params
        this.route.queryParams.subscribe(params => {
            const organizationId = params['organizationId'];
            if (organizationId) {
                this.loadOpportunitiesByOrganization(organizationId);
            } else {
                this.loadOpportunities();
            }
        });
    }

    loadOpportunities() {
        this.opportunityService.getOpportunities().subscribe(
            data => this.opportunities = data
        );
    }

    loadOpportunitiesByOrganization(organizationId: number | string) {
        this.opportunityService.getOpportunities().subscribe(
            data => this.opportunities = data.filter(opp => String(opp.organizationId) === String(organizationId))
        );
    }

    onSearch() {
        if (this.searchTerm.trim()) {
            this.opportunityService.searchOpportunities(this.searchTerm).subscribe(
                data => this.opportunities = data
            );
        } else {
            this.loadOpportunities();
        }
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'https://via.placeholder.com/800x400/e0e0e0/666666?text=Imagem+Indisponível';
    }
}
