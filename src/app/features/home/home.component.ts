import { Component, inject, OnInit, signal } from '@angular/core';
import { Opportunity, OpportunityService } from '../../core/services/opportunity.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
    private opportunityService = inject(OpportunityService);

    opportunities = signal<Opportunity[]>([]);
    searchControl = new FormControl('');

    ngOnInit() {
        // Initial load
        this.loadOpportunities();

        // Search logic
        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term => {
                if (!term) return this.opportunityService.getOpportunities();
                return this.opportunityService.searchOpportunities(term);
            })
        ).subscribe(data => {
            this.opportunities.set(data);
        });
    }

    loadOpportunities() {
        this.opportunityService.getOpportunities().subscribe(data => {
            this.opportunities.set(data);
        });
    }
}
