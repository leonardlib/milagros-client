import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../_services/user.service';
import {Profile} from '../_models/profile';
import {UtilsService} from '../_services/utils.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileCompletedGuard implements CanActivate {
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
                this.userService.getProfile(user.email).subscribe(response => {
                    const profile = new Profile(response[0]);

                    if (profile && profile.isCompleted()) {
                        resolve(true);
                    } else {
                        this.utilsService.redirectUrl = state.url;
                        this.router.navigate(['/perfil/completar']);
                        resolve(false);
                    }
                }, error => {
                    this.utilsService.redirectUrl = state.url;
                    this.router.navigate(['/perfil/completar']);
                    resolve(false);
                });
            });
        });
    }
}
