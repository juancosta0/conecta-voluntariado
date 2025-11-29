import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-terms',
    standalone: true,
    imports: [CommonModule, MatCardModule, RouterLink, MatButtonModule],
    templateUrl: './terms.component.html',
    styleUrl: './terms.component.css'
})
export class TermsComponent {

}
