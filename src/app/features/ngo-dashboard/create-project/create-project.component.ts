import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpportunityService } from '../../../core/services/opportunity.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-project',
    templateUrl: './create-project.component.html',
    styleUrls: ['./create-project.component.css'],
    standalone: false
})
export class CreateProjectComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private opportunityService = inject(OpportunityService);
    private authService = inject(AuthService);
    private snackBar = inject(MatSnackBar);

    projectForm: FormGroup = this.fb.group({
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(50)]],
        location: ['', Validators.required],
        categories: ['', Validators.required],
        volunteersNeeded: [1, [Validators.required, Validators.min(1)]],
        imageUrl: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800']
    });

    onSubmit() {
        const user = this.authService.currentUser();
        const isNGO = this.authService.isNGO();
        const isAdmin = user?.username === 'admin';

        if (this.projectForm.valid && (isNGO || isAdmin)) {
            if (!user) return;

            const categories = this.projectForm.value.categories
                .split(',')
                .map((c: string) => c.trim());

            const newOpportunity = {
                title: this.projectForm.value.title,
                description: this.projectForm.value.description,
                location: this.projectForm.value.location,
                categories: categories,
                imageUrl: this.projectForm.value.imageUrl,
                organization: user.organizationName || user.name,
                rating: 5.0,
                volunteersActive: 0,
                urgentNeeds: [],
                ngoId: user.id
            };

            this.opportunityService.createOpportunity(newOpportunity).subscribe({
                next: () => {
                    this.snackBar.open('Projeto criado com sucesso!', 'OK', { duration: 3000 });
                    this.router.navigate(['/opportunities']);
                },
                error: () => {
                    this.snackBar.open('Erro ao criar projeto', 'OK', { duration: 3000 });
                }
            });
        } else {
            this.snackBar.open('Apenas ONGs e administradores podem criar projetos', 'OK', { duration: 3000 });
        }
    }
}
