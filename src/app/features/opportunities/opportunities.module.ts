import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { OpportunityDetailComponent } from './opportunity-detail/opportunity-detail.component';
import { OpportunitiesListComponent } from './opportunities-list/opportunities-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
    { path: '', component: OpportunitiesListComponent },
    { path: ':id', component: OpportunityDetailComponent }
];

@NgModule({
    declarations: [
        OpportunityDetailComponent,
        OpportunitiesListComponent
    ],
    imports: [
        SharedModule,
        MatSnackBarModule,
        RouterModule.forChild(routes)
    ]
})
export class OpportunitiesModule { }
