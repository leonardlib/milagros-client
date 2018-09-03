import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInterfaceComponent } from './_components/layout/user-interface/user-interface.component';
import { StartComponent } from './_components/start/start.component';
import { PageNotFoundComponent } from './_components/layout/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '', component: UserInterfaceComponent, children: [
            { path: 'home', component: StartComponent },

            { path: '404', component: PageNotFoundComponent },
            { path: '', redirectTo: '404', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
