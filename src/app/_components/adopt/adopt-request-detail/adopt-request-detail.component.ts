import {Component, OnInit} from '@angular/core';
import {Pet} from '../../../_models/pet';
import {AdoptRequest} from '../../../_models/adopt-request';
import {UtilsService} from '../../../_services/utils.service';
import {ActivatedRoute} from '@angular/router';
import {PetService} from '../../../_services/pet.service';
import {UserService} from '../../../_services/user.service';
import {AdoptRequestService} from '../../../_services/adopt-request.service';
import {Gallery, GalleryRef} from '@ngx-gallery/core';
import {Profile} from '../../../_models/profile';

@Component({
    selector: 'app-adopt-request-detail',
    templateUrl: './adopt-request-detail.component.html',
    styleUrls: ['./adopt-request-detail.component.scss']
})
export class AdoptRequestDetailComponent implements OnInit {
    public adoptRequest: AdoptRequest = new AdoptRequest();
    public pet: Pet = new Pet();
    public profile: Profile = new Profile();
    public galleryRef: GalleryRef = null;
    public placeGalleryRef: GalleryRef = null;
    public contain: any;

    constructor(
        public utilsService: UtilsService,
        private route: ActivatedRoute,
        private petService: PetService,
        private userService: UserService,
        private adoptRequestService: AdoptRequestService,
        private gallery: Gallery
    ) {}

    ngOnInit() {
        this.galleryRef = this.gallery.ref('petGallery');
        this.placeGalleryRef = this.gallery.ref('placeGallery');

        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.adoptRequestService.show(uid).subscribe(adoptRequests => {
                this.adoptRequest = adoptRequests[0] as AdoptRequest;
                this.setImages();

                this.petService.show(this.adoptRequest.pet_uid).subscribe(pets => {
                    this.pet = pets[0] as Pet;
                    this.setPetImages();
                });

                this.userService.getProfile(this.adoptRequest.user_email).subscribe(profiles => {
                    this.profile = profiles[0] as Profile;
                });
            });
        });
    }

    setImages() {
        this.adoptRequest.place_images.forEach(image => {
            this.placeGalleryRef.addImage({
                src: image.url,
                thumb: image.url
            });
        });
    }

    setPetImages() {
        this.pet.images.forEach(image => {
            this.galleryRef.addImage({
                src: image.url,
                thumb: image.url
            });
        });
    }

    approveAdoptRequest() {
        this.adoptRequest.approved = true;

        this.utilsService.showSnackbar('Aprobando solicitud...');
        this.adoptRequestService.update(this.adoptRequest, false).then(response => {
            if (response !== null) {
                this.updatePet();
            } else {
                this.utilsService.showSnackbar('Ocurrió un error al aprobar la solicitud, intenta de nuevo');
            }
        });
    }

    updatePet() {
        this.utilsService.showSnackbar('Actualizando mascota...');
        this.pet.adopted = true;
        this.pet.in_adopted_process = false;
        this.petService.update(this.pet, false).then(response => {
            if (response !== null) {
                this.sendEmailToUser();
            } else {
                this.utilsService.showSnackbar('Ocurrió un error al aprobar la solicitud, intenta de nuevo');
            }
        });
    }

    sendEmailToUser() {
        const title = '¡Hola ' + this.profile.name + '!';
        const description = 'Tu solicitud de adopción de la mascota "' + this.pet.name
            + '" ha sido revisada y aprobada, tienes 10 días para pasar por ella a la dirección que aparece más abajo'
            + ' o envianos un correo a adopciones@milagrosdelrincon.mx si te gustaría que nosotros la llevemos.<br/><br/>¡Muchas gracias!';

        this.utilsService.sendMail(
            [this.profile.user_email],
            '¡Felicidades!',
            title,
            description,
            'Ver mi adopción',
            ''
        ).then(res => {
            if (res) {
                this.utilsService.showSnackbar('Se aprobó la solicitud y se notificó al usuario.');
            } else {
                this.utilsService.showSnackbar('Ocurrió un error al al aprobar solicitud, intenta de nuevo');
            }
        });
    }
}
