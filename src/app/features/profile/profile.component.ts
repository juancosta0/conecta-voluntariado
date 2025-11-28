import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ApplicationService } from '../../core/services/application.service';
import { Application } from '../../core/models/application.model';
import { User } from '../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit {
    private authService = inject(AuthService);
    private applicationService = inject(ApplicationService);
    private router = inject(Router);

    currentUser = signal<User | null>(null);
    myApplications = signal<Application[]>([]);
    isEditing = signal(false);

    ngOnInit() {
        const user = this.authService.currentUser();
        if (!user) {
            this.router.navigate(['/login']);
            return;
        }

        this.currentUser.set(user);
        this.loadMyApplications();
    }

    loadMyApplications() {
        const user = this.currentUser();
        if (!user || !user.id) return;

        this.applicationService.getMyApplications(Number(user.id)).subscribe(applications => {
            this.myApplications.set(applications);
        });
    }

    toggleEdit() {
        this.isEditing.update(v => !v);
    }

    saveProfile() {
        // TODO: Implement save profile logic
        this.isEditing.set(false);
    }

    getStatusClass(status: string): string {
        return `status-${status.toLowerCase()}`;
    }

    getStatusLabel(status: string): string {
        const labels: Record<string, string> = {
            'pending': 'Pendente',
            'accepted': 'Aceita',
            'rejected': 'Recusada'
        };
        return labels[status] || status;
    }
}
