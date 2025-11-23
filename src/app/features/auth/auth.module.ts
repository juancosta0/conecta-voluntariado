import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// No routes here - components are used directly in app routing
const routes: Routes = [];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        SharedModule,
        MatSnackBarModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule { }
