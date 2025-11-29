import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    getErrorMessage(fieldName: string): string {
        const field = this.loginForm.get(fieldName);
        if (!field || !field.errors || !field.touched) return '';

        if (field.errors['required']) return 'Este campo é obrigatório';

        return '';
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.authService.login(username!, password!).subscribe({
                next: (success) => {
                    if (!success) {
                        this.snackBar.open('Credenciais inválidas', 'Fechar', { duration: 3000 });
                    }
                    // Navigation is handled by AuthService on success
                },
                error: (error) => {
                    console.error('Login error:', error);
                    this.snackBar.open('Erro ao fazer login. Verifique se o servidor está rodando.', 'Fechar', { duration: 5000 });
                }
            });
        } else {
            // Mark all fields as touched to show errors
            Object.keys(this.loginForm.controls).forEach(key => {
                this.loginForm.get(key)?.markAsTouched();
            });
        }
    }
}
