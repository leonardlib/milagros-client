import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from '../../../_models/user';
import { AuthService } from '../../../_services/auth.service';
import { UtilsService } from '../../../_services/utils.service';

@Component({
    selector: 'app-send-password-reset-email',
    templateUrl: './send-password-reset-email.component.html',
    styleUrls: ['./send-password-reset-email.component.scss']
})
export class SendPasswordResetEmailComponent implements OnInit, OnDestroy {
    public user: User = new User();
    public mailSended = false;

    constructor(
        private authService: AuthService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        document.getElementById('image-div').classList.add('bg-image-3');
    }

    ngOnDestroy() {
        document.getElementById('image-div').classList.remove('bg-image-3');
    }

    sendMail() {
        this.authService.sendResetPasswordMail(this.user).then(response => {
            this.mailSended = true;
        }, error => {
            this.utilsService.showSnackbar('¡Ops!, ocurrió un error. Intenta de nuevo.');
        });
    }
}
