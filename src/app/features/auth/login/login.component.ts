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

    onSubmit() {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            if (this.authService.login(username!, password!)) {
                this.router.navigate(['/']);
            } else {
                this.snackBar.open('Credenciais inválidas (Tente admin/admin)', 'Fechar', { duration: 3000 });
            }
        }
    }
}
