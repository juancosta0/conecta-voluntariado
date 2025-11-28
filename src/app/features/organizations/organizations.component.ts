import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from '../../core/models/organization.model';
import { OrganizationService } from '../../core/services/organization.service';

@Component({
    selector: 'app-organizations',
    templateUrl: './organizations.component.html',
    styleUrls: ['./organizations.component.css'],
    standalone: false
})
export class OrganizationsComponent implements OnInit {
    private organizationService = inject(OrganizationService);
    private router = inject(Router);

    organizations: Organization[] = [];

    ngOnInit() {
        this.loadOrganizations();
    }

    loadOrganizations() {
        this.organizationService.getOrganizations().subscribe(
            data => this.organizations = data
        );
    }

    viewProjects(organizationId: number) {
        // Navigate to opportunities page filtered by organization
        this.router.navigate(['/opportunities'], {
            queryParams: { organizationId: organizationId }
        });
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'https://via.placeholder.com/400x300/e0e0e0/666666?text=Logo+Indispon%C3%ADvel';
    }
}
