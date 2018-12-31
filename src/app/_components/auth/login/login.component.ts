import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { User } from '../../../_models/user';
import { AuthService } from '../../../_services/auth.service';
import { UtilsService } from '../../../_services/utils.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @ViewChild('loginForm') form: NgForm;
    public user: User = new User();

    constructor(
        private authService: AuthService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        document.getElementById('image-div').classList.add('bg-image-1');
    }

    ngOnDestroy() {
        document.getElementById('image-div').classList.remove('bg-image-1');
    }

    login() {
        if (this.form.valid) {
            this.utilsService.showSnackbar('Iniciando sesión...');
            this.authService.login(this.user).then(response => {
                this.utilsService.redirect();
            }, error => {
                this.utilsService.showSnackbar('¡Ops!, verifica que la información sea correcta.');
            });
        }
    }
}
