import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { MomentModule } from 'angular2-moment';
import { ShareModule } from '@ngx-share/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { MatDialogModule } from '@angular/material/dialog';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorBlockModule } from 'ngx-color/block';
import { ColorCircleModule } from 'ngx-color/circle';
import { ColorCompactModule } from 'ngx-color/compact';
import { ColorSliderModule } from 'ngx-color/slider';
import { ColorTwitterModule } from 'ngx-color/twitter';
import { QuillModule } from 'ngx-quill';
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxCurrencyModule } from 'ngx-currency';

import { AppComponent } from './app.component';
import { UserInterfaceComponent } from './_components/layout/user-interface/user-interface.component';
import { StartComponent } from './_components/start/start.component';
import { PageNotFoundComponent } from './_components/layout/page-not-found/page-not-found.component';
import { UserService } from './_services/user.service';
import { LoginComponent } from './_components/auth/login/login.component';
import { RegisterComponent } from './_components/auth/register/register.component';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { SendPasswordResetEmailComponent } from './_components/auth/send-password-reset-email/send-password-reset-email.component';
import { NavbarComponent } from './_components/layout/navbar/navbar.component';
import { FooterComponent } from './_components/layout/footer/footer.component';
import { PostService } from './_services/post.service';
import { PostContentComponent } from './_components/post/post-content/post-content.component';
import { PetHomeComponent } from './_components/pet/pet-home/pet-home.component';
import { PetCharacteristicsComponent } from './_components/pet/pet-characteristics/pet-characteristics.component';
import { DonateHomeComponent } from './_components/donate/donate-home/donate-home.component';
import { ContactComponent } from './_components/contact/contact.component';
import { ProfileHomeComponent } from './_components/profile/profile-home/profile-home.component';
import { AdminHomeComponent } from './_components/admin/admin-home/admin-home.component';
import { DonateItemComponent } from './_components/donate/donate-item/donate-item.component';
import { PetAdminListComponent } from './_components/pet/pet-admin-list/pet-admin-list.component';
import { PostAdminListComponent } from './_components/post/post-admin-list/post-admin-list.component';
import { PostAdminFormComponent } from './_components/post/post-admin-form/post-admin-form.component';
import { ModalComponent } from './_components/layout/modal/modal.component';
import { SafeHtmlPipe } from './_pipes/safe-html.pipe';
import { PetAdminFormComponent } from './_components/pet/pet-admin-form/pet-admin-form.component';
import { AuthorService } from './_services/author.service';
import { PetService } from './_services/pet.service';
import { TasteService } from './_services/taste.service';
import { UtilsService } from './_services/utils.service';
import { DonateAdminComponent } from './_components/donate/donate-admin/donate-admin.component';
import { DonateService } from './_services/donate.service';
import { PetAdoptComponent } from './_components/pet/pet-adopt/pet-adopt.component';
import { CompleteProfileComponent } from './_components/profile/complete-profile/complete-profile.component';
import { ProfileAdoptRequestListComponent } from './_components/profile/profile-adopt-request-list/profile-adopt-request-list.component';
import {AdoptRequestService} from './_services/adopt-request.service';
import { ProfilePersonalInfoComponent } from './_components/profile/profile-personal-info/profile-personal-info.component';
import { DonatePaypalComponent } from './_components/donate/donate-paypal/donate-paypal.component';
import { DonateTiendaComponent } from './_components/donate/donate-tienda/donate-tienda.component';
import {PaymentService} from './_services/payment.service';
import { PetSponsorComponent } from './_components/pet/pet-sponsor/pet-sponsor.component';
import { AdoptRequestsAdminComponent } from './_components/adopt/adopt-requests-admin/adopt-requests-admin.component';
import { AdoptRequestDetailComponent } from './_components/adopt/adopt-request-detail/adopt-request-detail.component';

const config: InputFileConfig = {};

@NgModule({
    declarations: [
        AppComponent,
        UserInterfaceComponent,
        StartComponent,
        PageNotFoundComponent,
        LoginComponent,
        RegisterComponent,
        SendPasswordResetEmailComponent,
        NavbarComponent,
        FooterComponent,
        PostContentComponent,
        PetHomeComponent,
        PetCharacteristicsComponent,
        DonateHomeComponent,
        ContactComponent,
        ProfileHomeComponent,
        AdminHomeComponent,
        DonateItemComponent,
        PetAdminListComponent,
        PostAdminListComponent,
        PostAdminFormComponent,
        ModalComponent,
        SafeHtmlPipe,
        PetAdminFormComponent,
        DonateAdminComponent,
        PetAdoptComponent,
        CompleteProfileComponent,
        ProfileAdoptRequestListComponent,
        ProfilePersonalInfoComponent,
        DonatePaypalComponent,
        DonateTiendaComponent,
        PetSponsorComponent,
        AdoptRequestsAdminComponent,
        AdoptRequestDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        MaterializeModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        MatSnackBarModule,
        MatTooltipModule,
        GalleryModule.forRoot({
            counter: false
        }),
        LightboxModule.forRoot({
            panelClass: 'fullscreen'
        }),
        GallerizeModule,
        MomentModule,
        ShareModule.forRoot(),
        NgxDatatableModule,
        NgSelectModule,
        MatSidenavModule,
        MatDatepickerModule,
        MatNativeDateModule,
        InputFileModule.forRoot(config),
        MatDialogModule,
        ColorSketchModule,
        ColorBlockModule,
        ColorCircleModule,
        ColorCompactModule,
        ColorSliderModule,
        ColorTwitterModule,
        QuillModule,
        MatTabsModule,
        AppRoutingModule,
        NgxPayPalModule,
        NgxCurrencyModule,
        MatSlideToggleModule,
        AgmCoreModule.forRoot({
            apiKey: environment.gmaps.api_key
        }),
        Ng2SearchPipeModule
    ],
    providers: [
        UserService,
        AuthService,
        AuthGuard,
        PostService,
        AuthorService,
        PetService,
        TasteService,
        UtilsService,
        DonateService,
        AdoptRequestService,
        PaymentService
    ],
    entryComponents: [
        ModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
