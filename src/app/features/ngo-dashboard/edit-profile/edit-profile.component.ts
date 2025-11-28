import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../core/models/user.model';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css'],
    standalone: false
})
export class EditProfileComponent {
    private fb = inject(FormBuilder);
    public authService = inject(AuthService); // Public so template can access
    private userService = inject(UserService);
    private snackBar = inject(MatSnackBar);

    currentUser = this.authService.currentUser;
    isLoading = signal(false);

    profileForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        organizationName: [''], // Only for NGO
        description: [''], // Only for NGO
        website: [''], // Only for NGO
        address: [''] // Only for NGO
    });

    constructor() {
        const user = this.currentUser();
        if (user) {
            this.profileForm.patchValue({
                name: user.name,
                email: user.email,
                phone: user.phone,
                organizationName: user.organizationName,
                description: user.description,
                website: user.website,
                address: user.address
            });
        }
    }

    onSubmit() {
        if (this.profileForm.valid && this.currentUser()) {
            this.isLoading.set(true);
            const updatedData = this.profileForm.value as Partial<User>;
            const userId = this.currentUser()!.id;

            this.userService.updateUser(userId, updatedData).subscribe({
                next: (updatedUser) => {
                    // Update local state
                    this.authService.currentUser.set(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));

                    this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
                        duration: 3000,
                        horizontalPosition: 'end',
                        verticalPosition: 'top'
                    });
                    this.isLoading.set(false);
                },
                error: (err) => {
                    console.error('Error updating profile:', err);
                    this.snackBar.open('Erro ao atualizar perfil. Tente novamente.', 'Fechar', {
                        duration: 3000,
                        panelClass: ['error-snackbar']
                    });
                    this.isLoading.set(false);
                }
            });
        }
    }
}
