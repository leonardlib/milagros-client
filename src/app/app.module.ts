import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserInterfaceComponent } from './_components/layout/user-interface/user-interface.component';
import { StartComponent } from './_components/start/start.component';
import { PageNotFoundComponent } from './_components/layout/page-not-found/page-not-found.component';
import { UserService } from './_services/user.service';

@NgModule({
    declarations: [
        AppComponent,
        UserInterfaceComponent,
        StartComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MaterializeModule,
        AppRoutingModule
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
