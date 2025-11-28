import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Opportunity {
    id: number;
    title: string;
    organization: string;
    rating: number;
    location: string;
    description: string;
    imageUrl: string;
    categories: string[];
    volunteersActive: number;
    urgentNeeds: string[];
    ngoId?: number;
    organizationId?: number;
}

@Injectable({
    providedIn: 'root'
})
export class OpportunityService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    getOpportunities(): Observable<Opportunity[]> {
        return this.http.get<Opportunity[]>(`${this.apiUrl}/opportunities`);
    }

    searchOpportunities(term: string): Observable<Opportunity[]> {
        // json-server supports q parameter for full-text search
        // We can also filter by specific fields using title_like or organization_like
        return this.http.get<Opportunity[]>(`${this.apiUrl}/opportunities?q=${encodeURIComponent(term)}`);
    }

    getOpportunityById(id: number): Observable<Opportunity> {
        return this.http.get<Opportunity>(`${this.apiUrl}/opportunities/${id}`);
    }

    apply(opportunityId: number, userId: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/applications`, {
            opportunityId,
            userId,
            date: new Date().toISOString(),
            status: 'pending'
        });
    }

    // NGO Methods
    createOpportunity(opportunity: Partial<Opportunity>): Observable<Opportunity> {
        return this.http.post<Opportunity>(`${this.apiUrl}/opportunities`, opportunity);
    }

    updateOpportunity(id: number, opportunity: Partial<Opportunity>): Observable<Opportunity> {
        return this.http.patch<Opportunity>(`${this.apiUrl}/opportunities/${id}`, opportunity);
    }

    deleteOpportunity(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/opportunities/${id}`);
    }

    getOpportunitiesByNgo(ngoId: number): Observable<Opportunity[]> {
        return this.http.get<Opportunity[]>(`${this.apiUrl}/opportunities?ngoId=${ngoId}`);
    }
}
