import {Component, OnInit} from '@angular/core';
import {DonateService} from '../../../_services/donate.service';
import {UtilsService} from '../../../_services/utils.service';
import {Donation} from '../../../_models/donation';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-donate-item-detail-admin',
    templateUrl: './donate-item-detail-admin.component.html',
    styleUrls: ['./donate-item-detail-admin.component.scss']
})
export class DonateItemDetailAdminComponent implements OnInit {
    public donation: Donation = new Donation();

    constructor(
        private donateService: DonateService,
        public utilsService: UtilsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.donateService.show(uid).subscribe(donations => {
                this.donation = donations[0] as Donation;
            });
        });
    }

    approve() {
        this.donation.approved = true;
        this.donateService.update(this.donation).then(donation => {
            this.donation = donation as Donation;
            this.sendEmailToUser();
        });
    }

    markCollected() {
        this.donation.collected = true;
        this.donateService.update(this.donation).then(donation => {
            this.donation = donation as Donation;
        });
    }

    sendEmailToUser() {
        const title = '¡Hola ' + this.donation.email + '!';
        const description = 'Hemos visto tu solicitud de donación de artículo, y queremos darte las gracias por apoyarnos. ' +
            'En los próximos días te estaremos visitando para recoger el o los artículos.<br/><br/>¡Muchísimas gracias!';

        this.utilsService.sendMail(
            [this.donation.email],
            '¡Muchas gracias!',
            title,
            description,
            'Ver mascotas',
            ''
        ).then(res => {
            if (res) {
                this.utilsService.showSnackbar('Se aprobó la solicitud y se notificó al usuario');
            } else {
                this.utilsService.showSnackbar('Ocurrió un error al aprobar la solicitud, intenta de nuevo');
            }
        });
    }
}
