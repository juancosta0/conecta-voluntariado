import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Panel Home Component - Landing page with navigation buttons
@Component({
    selector: 'app-panel-home',
    templateUrl: './panel-home.component.html',
    styleUrls: ['./panel-home.component.css'],
    standalone: false
})
export class PanelHomeComponent {
    constructor(private router: Router) { }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }
}
