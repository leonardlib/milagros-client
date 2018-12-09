import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from '../../../_models/user';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../../_services/utils.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    public user: User = new User();

    constructor(
        private authService: AuthService,
        private router: Router,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        document.getElementById('image-div').classList.add('bg-image-1');
    }

    ngOnDestroy() {
        document.getElementById('image-div').classList.remove('bg-image-1');
    }

    login() {
        this.authService.login(this.user).then(response => {
            this.utilsService.redirect();
        }, error => {
            this.utilsService.showSnackbar('¡Ops!, verifica que la información sea correcta.');
        });
    }
}
