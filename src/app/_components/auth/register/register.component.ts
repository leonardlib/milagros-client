import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../../_services/utils.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public user: User = new User();

    constructor(
        private authService: AuthService,
        private router: Router,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
    }

    register() {
        this.utilsService.showSnackbar('Registrando...');
        this.authService.register(this.user).then(response => {
            this.router.navigate(['/home']);
        }, error => {
            if (error.code === 'auth/email-already-in-use') {
                this.utilsService.showSnackbar('¡Ops!, este correo ya está siendo utilizado.');
            } else if (error.code === 'auth/weak-password') {
                this.utilsService.showSnackbar('¡Ops!, la contraseña debe ser mayor a 6 caracteres.');
            } else {
                this.utilsService.showSnackbar('¡Ops!, ocurrió un error. Intenta de nuevo.');
            }
        });
    }
}
