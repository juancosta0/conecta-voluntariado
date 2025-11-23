import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserType } from '../../../core/models/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: false
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private authService = inject(AuthService);

    currentStep = 1;
    selectedUserType: UserType | null = null;
    UserType = UserType;

    // Formulário para voluntário
    volunteerForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        phone: [''],
        interests: [''],
        skills: [''],
        bio: ['']
    });

    // Formulário para ONG
    ngoForm: FormGroup = this.fb.group({
        organizationName: ['', Validators.required],
        cnpj: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        phone: [''],
        description: ['', Validators.required],
        website: [''],
        address: ['']
    });

    selectUserType(type: UserType) {
        this.selectedUserType = type;
        this.currentStep = 2;
    }

    goBack() {
        if (this.currentStep === 2) {
            this.currentStep = 1;
            this.selectedUserType = null;
        }
    }

    onSubmit() {
        const form = this.selectedUserType === UserType.VOLUNTEER ? this.volunteerForm : this.ngoForm;

        if (form.valid) {
            const userData = {
                ...form.value,
                userType: this.selectedUserType,
                name: this.selectedUserType === UserType.NGO ? form.value.organizationName : form.value.name,
                interests: form.value.interests ? form.value.interests.split(',').map((i: string) => i.trim()) : [],
                skills: form.value.skills ? form.value.skills.split(',').map((s: string) => s.trim()) : []
            };

            if (this.authService.register(userData)) {
                alert('Cadastro realizado com sucesso!');
                this.router.navigate(['/']);
            }
        }
    }
}
