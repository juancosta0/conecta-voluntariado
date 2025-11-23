import { Component, OnInit, inject } from '@angular/core';
import { OpportunityService, Opportunity } from '../../../core/services/opportunity.service';

@Component({
    selector: 'app-opportunities-list',
    templateUrl: './opportunities-list.component.html',
    styleUrls: ['./opportunities-list.component.css'],
    standalone: false
})
export class OpportunitiesListComponent implements OnInit {
    private opportunityService = inject(OpportunityService);
    opportunities: Opportunity[] = [];
    searchTerm = '';

    ngOnInit() {
        this.loadOpportunities();
    }

    loadOpportunities() {
        this.opportunityService.getOpportunities().subscribe(
            data => this.opportunities = data
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
}
