import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-privacy',
    standalone: true,
    imports: [CommonModule, MatCardModule, RouterLink, MatButtonModule],
    templateUrl: './privacy.component.html',
    styleUrl: './privacy.component.css'
})
export class PrivacyComponent {

}
