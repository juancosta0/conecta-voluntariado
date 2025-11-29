import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserType } from '../../../core/models/user.model';
import { FormValidators } from '../../../core/validators/form-validators';

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
    passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';
    passwordStrengthText = '';

    // Formulário para voluntário
    volunteerForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8), FormValidators.passwordStrength()]],
        passwordConfirm: ['', [Validators.required, FormValidators.passwordMatch('password')]],
        phone: ['', FormValidators.phone()],
        interests: [''],
        skills: [''],
        bio: [''],
        acceptTerms: [false, Validators.requiredTrue]
    });

    // Formulário para ONG
    ngoForm: FormGroup = this.fb.group({
        organizationName: ['', Validators.required],
        cnpj: ['', [Validators.required, FormValidators.cnpj()]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8), FormValidators.passwordStrength()]],
        passwordConfirm: ['', [Validators.required, FormValidators.passwordMatch('password')]],
        phone: ['', FormValidators.phone()],
        description: ['', Validators.required],
        website: [''],
        address: [''],
        acceptTerms: [false, Validators.requiredTrue]
    });

    constructor() {
        // Watch password changes for strength indicator
        this.volunteerForm.get('password')?.valueChanges.subscribe(password => {
            this.calculatePasswordStrength(password);
            // Revalidate password confirmation when password changes
            this.volunteerForm.get('passwordConfirm')?.updateValueAndValidity();
        });

        this.ngoForm.get('password')?.valueChanges.subscribe(password => {
            this.calculatePasswordStrength(password);
            this.ngoForm.get('passwordConfirm')?.updateValueAndValidity();
        });
    }

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

    calculatePasswordStrength(password: string) {
        if (!password) {
            this.passwordStrength = 'weak';
            this.passwordStrengthText = '';
            return;
        }

        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) {
            this.passwordStrength = 'weak';
            this.passwordStrengthText = 'Fraca';
        } else if (strength <= 4) {
            this.passwordStrength = 'medium';
            this.passwordStrengthText = 'Média';
        } else {
            this.passwordStrength = 'strong';
            this.passwordStrengthText = 'Forte';
        }
    }

    getErrorMessage(formGroup: FormGroup, fieldName: string): string {
        const field = formGroup.get(fieldName);
        if (!field || !field.errors || !field.touched) return '';

        if (field.errors['required']) return 'Este campo é obrigatório';
        if (field.errors['email']) return 'Email inválido';
        if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
        if (field.errors['cnpj']) return 'CNPJ inválido';
        if (field.errors['phone']) return 'Telefone inválido. Use (XX) XXXXX-XXXX';
        if (field.errors['passwordMatch']) return 'As senhas não coincidem';
        if (field.errors['uppercase']) return 'Deve conter letra maiúscula';
        if (field.errors['number']) return 'Deve conter número';

        return '';
    }

    formatCNPJ(event: any) {
        const input = event.target;
        input.value = FormValidators.formatCNPJ(input.value);
        this.ngoForm.get('cnpj')?.setValue(input.value, { emitEvent: false });
    }

    formatPhone(event: any, formGroup: FormGroup) {
        const input = event.target;
        input.value = FormValidators.formatPhone(input.value);
        formGroup.get('phone')?.setValue(input.value, { emitEvent: false });
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

            // Remove password confirmation from data
            delete userData.passwordConfirm;

            if (this.authService.register(userData)) {
                alert('Cadastro realizado com sucesso!');
                this.router.navigate(['/']);
            }
        } else {
            // Mark all fields as touched to show errors
            Object.keys(form.controls).forEach(key => {
                form.get(key)?.markAsTouched();
            });
        }
    }
}
