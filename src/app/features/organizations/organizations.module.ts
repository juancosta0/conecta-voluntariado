import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { OrganizationsComponent } from './organizations.component';

const routes: Routes = [
    { path: '', component: OrganizationsComponent }
];

@NgModule({
    declarations: [
        OrganizationsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class OrganizationsModule { }
