import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import {UtilsService} from '../_services/utils.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router,
        private utilsService: UtilsService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.userService.current().then(user => {
                if (this.userService.verifyAdminEmail(user.email)) {
                    resolve(true);
                } else {
                    this.utilsService.redirectUrl = state.url;
                    this.router.navigate(['/acceso']);
                    return resolve(false);
                }
            }, error => {
                this.utilsService.redirectUrl = state.url;
                this.router.navigate(['/acceso']);
                return resolve(false);
            });
        });
    }
}
