import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from './data.service';

export interface Opportunity {
    id: number | string;
    title: string;
    organization: string;
    rating: number;
    location: string;
    description: string;
    imageUrl: string;
    categories: string[];
    volunteersActive: number;
    urgentNeeds: string[];
    ngoId?: number | string;
    organizationId?: number | string;
}

@Injectable({
    providedIn: 'root'
})
export class OpportunityService {
    private dataService = inject(DataService);

    getOpportunities(): Observable<Opportunity[]> {
        return this.dataService.getOpportunities();
    }

    searchOpportunities(term: string): Observable<Opportunity[]> {
        return this.dataService.getOpportunities().pipe(
            map(opportunities => {
                if (!term) return opportunities;
                const lowerTerm = term.toLowerCase();
                return opportunities.filter(opp =>
                    opp.title.toLowerCase().includes(lowerTerm) ||
                    opp.organization.toLowerCase().includes(lowerTerm) ||
                    opp.description.toLowerCase().includes(lowerTerm)
                );
            })
        );
    }

    getOpportunityById(id: number | string): Observable<Opportunity> {
        return this.dataService.getOpportunities().pipe(
            map(opportunities => opportunities.find(o => String(o.id) === String(id)))
        );
    }

    apply(opportunityId: number | string, userId: number | string): Observable<any> {
        // This is now handled by ApplicationService, but keeping for compatibility if needed
        // Ideally should be removed or delegate to ApplicationService
        return new Observable(observer => {
            observer.next({ success: true });
            observer.complete();
        });
    }

    // NGO Methods
    createOpportunity(opportunity: Partial<Opportunity>): Observable<Opportunity> {
        const newOpportunity = {
            ...opportunity,
            id: Date.now().toString(),
            volunteersActive: 0,
            rating: 0
        };
        return this.dataService.addItem('opportunities', newOpportunity);
    }

    updateOpportunity(id: number | string, opportunity: Partial<Opportunity>): Observable<Opportunity> {
        return this.dataService.updateItem('opportunities', id, opportunity);
    }

    deleteOpportunity(id: number | string): Observable<void> {
        return this.dataService.deleteItem('opportunities', id);
    }

    getOpportunitiesByNgo(ngoId: number | string): Observable<Opportunity[]> {
        return this.dataService.getOpportunities().pipe(
            map(opportunities => opportunities.filter(o => String(o.ngoId) === String(ngoId)))
        );
    }
}
