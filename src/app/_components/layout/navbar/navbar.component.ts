import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { UserService } from '../../../_services/user.service';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public user: User = new User();
    public profileRoute: string;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.userService.current().then(user => {
            this.user = user;

            if (this.userService.verifyAdminEmail(this.user.email)) {
                this.profileRoute = '/admin';
            } else {
                this.profileRoute = '/profile';
            }
        });
    }

    logout() {
        this.authService.logout().then(response => {
            if (response) {
                this.router.navigate(['/home']);
            }
        });
    }
}
