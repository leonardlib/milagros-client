import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../../_models/user';
import {Donation} from '../../../_models/donation';
import {UtilsService} from '../../../_services/utils.service';
import {UserService} from '../../../_services/user.service';
import {DonateService} from '../../../_services/donate.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {ImageModel} from '../../../_models/image';

@Component({
    selector: 'app-donate-item',
    templateUrl: './donate-item.component.html',
    styleUrls: ['./donate-item.component.scss']
})
export class DonateItemComponent implements OnInit {
    @ViewChild('donateItemForm') form: NgForm;
    public user: User = new User();
    public donation: Donation = new Donation();
    public images: any[] = [];

    constructor(
        private utilsService: UtilsService,
        private userService: UserService,
        private donateService: DonateService,
        private router: Router
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.userService.current().then(user => {
            this.user = user;
            this.donation.name = this.user.name;
            this.donation.email = this.user.email;
        }).catch(error => {
            this.user = new User();
        });
    }

    donate() {
        if (this.form.valid && this.images.length > 0) {
            this.saveDonation();
        } else {
            this.utilsService.showSnackbar('Completa la información');
        }
    }

    saveDonation() {
        this.images.forEach(image => {
            const auxImage = new ImageModel();
            auxImage.file = image['file'];

            this.donation.images.push(auxImage);
        });

        this.utilsService.showSnackbar('Enviando tu solicitud...');
        this.donateService.create(this.donation).then(response => {
            if (response !== null) {
                this.sendEmailToAdmin();
            }
        });
    }

    sendEmailToAdmin() {
        this.utilsService.showSnackbar('Notificando a Milagros del Rincón...');

        const description = 'Alguien quiere donar algún artículo a Milagros del Rincón, '
            + 'en cuanto puedas, entra a la plataforma, échale un vistazo y decide si aceptan o no.';

        this.utilsService.sendMail(
            environment.admin_mails,
            'Solicitud para donar artículo(s)',
            '¡Hola!',
            description,
            'Ver donaciones de artículos',
            ''
        ).then(res => {
            if (res) {
                this.sendEmailToUser();
            } else {
                this.utilsService.showSnackbar('Ocurrió un error al terminar tu solicitud, intenta de nuevo');
            }
        });
    }

    sendEmailToUser() {
        const title = '¡Hola ' + this.donation.name + '!';
        const description = 'Tu solicitud para donar artículo(s) ha sido registrada exitosamente en la plataforma, '
            + 'nosotros te avisaremos si podemos aceptar o no. <br/><br/>¡Muchas gracias!';

        this.utilsService.sendMail(
            [this.donation.email],
            'Solicitud para donar artículo(s)',
            title,
            description,
            'Ver mis donaciones de artículos',
            ''
        ).then(res => {
            if (res) {
                this.router.navigate(['/perfil']);
            } else {
                this.utilsService.showSnackbar('Ocurrió un error al terminar tu solicitud, intenta de nuevo');
            }
        });
    }
}
