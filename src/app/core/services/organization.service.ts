import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from './data.service';

import { Organization } from '../models/organization.model';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    private dataService = inject(DataService);

    getOrganizations(): Observable<Organization[]> {
        return this.dataService.getOrganizations();
    }

    getOrganizationById(id: number | string): Observable<Organization> {
        return this.dataService.getOrganizations().pipe(
            map(orgs => orgs.find(o => String(o.id) === String(id)))
        );
    }

    getOrganizationByNgoId(ngoId: number | string): Observable<Organization> {
        return this.dataService.getOrganizations().pipe(
            map(orgs => orgs.find(o => String(o.ngoId) === String(ngoId)))
        );
    }

    createOrganization(organization: Partial<Organization>): Observable<Organization> {
        const newOrg = {
            ...organization,
            id: Date.now()
        };
        return this.dataService.addItem('organizations', newOrg);
    }

    updateOrganization(id: number | string, organization: Partial<Organization>): Observable<Organization> {
        return this.dataService.updateItem('organizations', id, organization);
    }

    deleteOrganization(id: number | string): Observable<void> {
        return this.dataService.deleteItem('organizations', id);
    }
}
