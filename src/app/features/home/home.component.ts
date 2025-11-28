import { Component, inject, OnInit, signal } from '@angular/core';
import { Opportunity, OpportunityService } from '../../core/services/opportunity.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
    private opportunityService = inject(OpportunityService);

    opportunities = signal<Opportunity[]>([]);
    currentSlide = 0;

    ngOnInit() {
        this.loadOpportunities();
    }

    loadOpportunities() {
        this.opportunityService.getOpportunities().subscribe(data => {
            this.opportunities.set(data);
        });
    }

    scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    nextSlide() {
        const opps = this.opportunities();
        if (opps.length > 0) {
            this.currentSlide = (this.currentSlide + 1) % opps.length;
        }
    }

    prevSlide() {
        const opps = this.opportunities();
        if (opps.length > 0) {
            this.currentSlide = (this.currentSlide - 1 + opps.length) % opps.length;
        }
    }

    goToSlide(index: number) {
        this.currentSlide = index;
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = 'https://via.placeholder.com/1200x500/e0e0e0/666666?text=Imagem+Indisponível';
    }
}
