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
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { ProfileHomeComponent } from './_components/profile/profile-home/profile-home.component';
import { AdminHomeComponent } from './_components/admin/admin-home/admin-home.component';
import { DonateStoreComponent } from './_components/donate/donate-store/donate-store.component';
import { DonateCardComponent } from './_components/donate/donate-card/donate-card.component';
import { DonateItemComponent } from './_components/donate/donate-item/donate-item.component';
import { PetAdminListComponent } from './_components/pet/pet-admin-list/pet-admin-list.component';
import {PostAdminListComponent} from './_components/post/post-admin-list/post-admin-list.component';

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
            {
                path: '', component: DonateHomeComponent, children: [
                    { path: '', component: DonateStoreComponent },
                    { path: 'card', component: DonateCardComponent },
                    { path: 'item', component: DonateItemComponent }
                ]
            },
        ]
    },
    {
        path: 'about', component: UserInterfaceComponent, children: [
            { path: '', component: ContactComponent }
        ]
    },
    {
        path: 'profile', component: UserInterfaceComponent, canActivate: [AuthGuard], children: [
            { path: '', component: ProfileHomeComponent }
        ]
    },
    {
        path: 'admin', component: UserInterfaceComponent, canActivate: [AdminGuard], children: [
            {
                path: '', component: AdminHomeComponent, children: [
                    { path: 'posts', component: PostAdminListComponent },
                    { path: 'pets', component: PetAdminListComponent },
                ]
            },
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
