import { Component } from '@angular/core';

@Component({
    selector: 'app-organizations',
    templateUrl: './organizations.component.html',
    styleUrls: ['./organizations.component.css'],
    standalone: false
})
export class OrganizationsComponent {
    organizations = [
        {
            id: 1,
            name: 'Instituto Esperança',
            description: 'Trabalhamos com educação e desenvolvimento comunitário há mais de 15 anos.',
            imageUrl: 'https://images.unsplash.com/photo-1427751840561-9852520f8ce8?w=400',
            category: 'Educação',
            volunteers: 45,
            projects: 12
        },
        {
            id: 2,
            name: 'Mãos que Ajudam',
            description: 'Focados em combater a fome e ajudar pessoas em situação de vulnerabilidade.',
            imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400',
            category: 'Social',
            volunteers: 78,
            projects: 8
        },
        {
            id: 3,
            name: 'Verde Vida',
            description: 'Preservação ambiental e reflorestamento urbano são nossas prioridades.',
            imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400',
            category: 'Meio Ambiente',
            volunteers: 32,
            projects: 15
        },
        {
            id: 4,
            name: 'Futuro Jovem',
            description: 'Capacitação profissional e mentoria para jovens de baixa renda.',
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
            category: 'Educação',
            volunteers: 56,
            projects: 20
        }
    ];
}
