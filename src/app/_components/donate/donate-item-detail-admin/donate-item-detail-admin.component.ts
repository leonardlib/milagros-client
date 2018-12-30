import {Component, OnInit} from '@angular/core';
import {DonateService} from '../../../_services/donate.service';
import {UtilsService} from '../../../_services/utils.service';
import {Donation} from '../../../_models/donation';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter} from '@angular/material';
import * as moment from 'moment';
import {Gallery, GalleryRef} from '@ngx-gallery/core';

@Component({
    selector: 'app-donate-item-detail-admin',
    templateUrl: './donate-item-detail-admin.component.html',
    styleUrls: ['./donate-item-detail-admin.component.scss']
})
export class DonateItemDetailAdminComponent implements OnInit {
    public donation: Donation = new Donation();
    public minDate: any;
    public galleryRef: GalleryRef = null;
    public contain: any;

    constructor(
        private donateService: DonateService,
        public utilsService: UtilsService,
        private gallery: Gallery,
        private route: ActivatedRoute,
        private datepickerAdapter: DateAdapter<any>
    ) {
        this.minDate = new Date();
    }

    ngOnInit() {
        this.datepickerAdapter.setLocale('es');
        this.galleryRef = this.gallery.ref('donationGallery');
        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.donateService.show(uid).subscribe(donations => {
                this.donation = donations[0] as Donation;
                this.setImages();
            });
        });
    }

    setImages() {
        this.donation.images.forEach(image => {
            this.galleryRef.addImage({
                src: image.url,
                thumb: image.url
            });
        });
    }

    approve() {
        if (this.donation.collected_estimated_date !== '') {
            this.utilsService.showSnackbar('Aprobando...');
            this.donation.approved = true;
            this.donateService.update(this.donation).then(donation => {
                this.donation = donation as Donation;
                this.sendEmailToUser();
            });
        } else {
            this.utilsService.showSnackbar('Ingresa una fecha estimada de recolección');
        }
    }

    markCollected() {
        this.utilsService.showSnackbar('Marcando como recogida...');
        this.donation.collected = true;
        this.donateService.update(this.donation).then(donation => {
            this.donation = donation as Donation;
            this.utilsService.showSnackbar('Se marco como recogida la donación');
        });
    }

    sendEmailToUser() {
        const title = '¡Hola ' + this.donation.name + '!';
        const description = 'Hemos visto tu solicitud de donación de artículo, y queremos darte las gracias por apoyarnos. ' +
            'Te estaremos visitando aproximadamente el ' +
            moment(this.donation.collected_estimated_date).locale('es').format('LL') +
            ' para recoger el artículo o los artículos que nos quieres donar.<br/><br/>¡Muchísimas gracias!';

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
