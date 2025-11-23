import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
    { path: 'create-project', component: CreateProjectComponent }
];

@NgModule({
    declarations: [
        CreateProjectComponent
    ],
    imports: [
        SharedModule,
        MatSnackBarModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        CreateProjectComponent
    ]
})
export class NgoDashboardModule { }
