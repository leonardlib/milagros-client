import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        public userService: UserService,
        private router: Router
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
                    this.router.navigate(['/auth']);
                    return resolve(false);
                }
            }, error => {
                this.router.navigate(['/auth']);
                return resolve(false);
            });
        });
    }
}
