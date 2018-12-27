import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import {UtilsService} from '../_services/utils.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router,
        private utilsService: UtilsService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.userService.current().then(user => {
                resolve(true);
            }).catch(error => {
                this.utilsService.redirectUrl = state.url;
                this.router.navigate(['/acceso']);
                resolve(false);
            });
        });
    }
}
