import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { User } from '../../../_models/user';
import { AuthService } from '../../../_services/auth.service';
import { UtilsService } from '../../../_services/utils.service';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-send-password-reset-email',
    templateUrl: './send-password-reset-email.component.html',
    styleUrls: ['./send-password-reset-email.component.scss']
})
export class SendPasswordResetEmailComponent implements OnInit, OnDestroy {
    @ViewChild('resetForm') form: NgForm;
    public user: User = new User();
    public mailSent = false;

    constructor(
        private authService: AuthService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        document.getElementById('image-div').classList.add('bg-image-3');
    }

    ngOnDestroy() {
        document.getElementById('image-div').classList.remove('bg-image-3');
    }

    sendMail() {
        if (this.form.valid) {
            this.utilsService.showSnackbar('Enviando instrucciones...');
            this.authService.sendResetPasswordMail(this.user).then(response => {
                this.utilsService.showSnackbar('Instrucciones enviadas, verifica tu correo');
                this.mailSent = true;
            }, error => {
                this.utilsService.showSnackbar('¡Ops!, ocurrió un error. Intenta de nuevo.');
            });
        }
    }
}
