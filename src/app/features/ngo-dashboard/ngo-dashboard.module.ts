import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { NgoDashboardComponent } from './ngo-dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: '',
        component: PanelLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: NgoDashboardComponent },
            { path: 'create-project', component: CreateProjectComponent },
            { path: 'profile', component: EditProfileComponent }
        ]
    }
];

@NgModule({
    declarations: [
        CreateProjectComponent,
        NgoDashboardComponent,
        PanelLayoutComponent,
        EditProfileComponent
    ],
    imports: [
        SharedModule,
        MatSnackBarModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        CreateProjectComponent,
        NgoDashboardComponent
    ]
})
export class NgoDashboardModule { }
