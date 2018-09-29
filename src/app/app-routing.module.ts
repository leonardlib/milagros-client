import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInterfaceComponent } from './_components/layout/user-interface/user-interface.component';
import { StartComponent } from './_components/start/start.component';
import { PageNotFoundComponent } from './_components/layout/page-not-found/page-not-found.component';
import { LoginComponent } from './_components/auth/login/login.component';
import { RegisterComponent } from './_components/auth/register/register.component';
import { SendPasswordResetEmailComponent } from './_components/auth/send-password-reset-email/send-password-reset-email.component';
import { PostContentComponent } from './_components/post/post-content/post-content.component';
import { PetHomeComponent } from './_components/pet/pet-home/pet-home.component';
import { PetCharacteristicsComponent } from './_components/pet/pet-characteristics/pet-characteristics.component';
import { DonateHomeComponent } from './_components/donate/donate-home/donate-home.component';
import { ContactComponent } from './_components/contact/contact.component';

const routes: Routes = [
    {
        path: 'auth', children: [
            { path: '', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgot-password', component: SendPasswordResetEmailComponent }
        ]
    },
    {
        path: 'home', component: UserInterfaceComponent, children: [
            { path: '', component: StartComponent }
        ]
    },
    {
        path: 'post', component: UserInterfaceComponent, children: [
            { path: 'content/:uid', component: PostContentComponent }
        ]
    },
    {
        path: 'pet', component: UserInterfaceComponent, children: [
            { path: '', component: PetHomeComponent },
            { path: 'characteristics/:uid', component: PetCharacteristicsComponent }
        ]
    },
    {
        path: 'donate', component: UserInterfaceComponent, children: [
            { path: '', component: DonateHomeComponent }
        ]
    },
    {
        path: 'about', component: UserInterfaceComponent, children: [
            { path: '', component: ContactComponent }
        ]
    },
    { path: 'blank', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'blank' },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
