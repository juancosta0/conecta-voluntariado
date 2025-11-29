import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidators {

    // Validador de CNPJ
    static cnpj(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const cnpj = control.value.replace(/[^\d]/g, '');

            if (cnpj.length !== 14) {
                return { cnpj: true };
            }

            // Verifica se todos os dígitos são iguais
            if (/^(\d)\1+$/.test(cnpj)) {
                return { cnpj: true };
            }

            // Validação dos dígitos verificadores
            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            const digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--) {
                soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== parseInt(digitos.charAt(0))) {
                return { cnpj: true };
            }

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (let i = tamanho; i >= 1; i--) {
                soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }

            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== parseInt(digitos.charAt(1))) {
                return { cnpj: true };
            }

            return null;
        };
    }

    // Validador de telefone brasileiro
    static phone(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const phone = control.value.replace(/[^\d]/g, '');

            // Aceita 10 ou 11 dígitos (com ou sem 9 no celular)
            if (phone.length < 10 || phone.length > 11) {
                return { phone: true };
            }

            return null;
        };
    }

    // Validador de confirmação de senha
    static passwordMatch(passwordField: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.parent) {
                return null;
            }

            const password = control.parent.get(passwordField);
            const passwordConfirm = control;

            if (!password || !passwordConfirm) {
                return null;
            }

            if (passwordConfirm.value === '') {
                return null;
            }

            if (password.value !== passwordConfirm.value) {
                return { passwordMatch: true };
            }

            return null;
        };
    }

    // Validador de força de senha
    static passwordStrength(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }

            const password = control.value;
            const errors: any = {};

            if (password.length < 8) {
                errors.minLength = true;
            }

            if (!/[A-Z]/.test(password)) {
                errors.uppercase = true;
            }

            if (!/[0-9]/.test(password)) {
                errors.number = true;
            }

            return Object.keys(errors).length > 0 ? errors : null;
        };
    }

    // Formatar CNPJ
    static formatCNPJ(value: string): string {
        if (!value) return '';
        const cnpj = value.replace(/[^\d]/g, '');
        return cnpj
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .substring(0, 18);
    }

    // Formatar telefone
    static formatPhone(value: string): string {
        if (!value) return '';
        const phone = value.replace(/[^\d]/g, '');

        if (phone.length <= 10) {
            return phone
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            return phone
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .substring(0, 15);
        }
    }
}
