import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInterfaceComponent } from './_components/layout/user-interface/user-interface.component';
import { StartComponent } from './_components/start/start.component';
import { PageNotFoundComponent } from './_components/layout/page-not-found/page-not-found.component';
import { LoginComponent } from './_components/auth/login/login.component';
import { RegisterComponent } from './_components/auth/register/register.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
    {
        path: '', component: UserInterfaceComponent, children: [
            {
                path: 'auth', children: [
                    { path: '', component: LoginComponent },
                    { path: 'register', component: RegisterComponent }
                ]
            },

            { path: 'home', component: StartComponent, canActivate: [AuthGuard] },

            { path: 'blank', component: PageNotFoundComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', redirectTo: 'blank' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
