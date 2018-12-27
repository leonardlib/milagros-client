import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../_services/utils.service';
import {ImageModel} from '../../../_models/image';
import {AdoptRequest} from '../../../_models/adopt-request';
import {Pet} from '../../../_models/pet';
import {ActivatedRoute, Router} from '@angular/router';
import {PetService} from '../../../_services/pet.service';
import {UserService} from '../../../_services/user.service';
import {User} from '../../../_models/user';
import {AdoptRequestService} from '../../../_services/adopt-request.service';
import {environment} from '../../../../environments/environment';
declare var $: any;

@Component({
    selector: 'app-pet-adopt',
    templateUrl: './pet-adopt.component.html',
    styleUrls: ['./pet-adopt.component.scss']
})
export class PetAdoptComponent implements OnInit {
    public photosList: any = [];
    public adoptRequest: AdoptRequest = new AdoptRequest();
    public pet: Pet = new Pet();
    public user: User = new User();

    constructor(
        public utilsService: UtilsService,
        private route: ActivatedRoute,
        private petService: PetService,
        private userService: UserService,
        private adoptRequestService: AdoptRequestService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.petService.show(uid).subscribe(response => {
                this.pet = response[0] as Pet;

                this.userService.current().then(user => {
                    this.user = user;
                }).catch(error => {
                    this.user = new User();
                });
            });
        });
    }

    send() {
        if (this.photosList.length > 0) {
            this.adoptRequest.pet_uid = this.pet.uid;
            this.adoptRequest.user_email = this.user.email;
            this.setImages();

            this.utilsService.showSnackbar('Enviando tu solicitud...');
            this.adoptRequestService.create(this.adoptRequest).then(response => {
                if (response !== null) {
                    this.updatePet();
                } else {
                    this.utilsService.showSnackbar('Ocurrió un error al terminar tu solicitud, intenta de nuevo');
                }
            });
        } else {
            this.utilsService.showSnackbar('Agrega fotos para continuar');
        }
    }

    setImages() {
        const images = [];

        this.photosList.forEach(image => {
            const auxImage = new ImageModel();
            auxImage.file = image['file'];
            images.push(auxImage);
        });

        this.adoptRequest.place_images = images;
    }

    updatePet() {
        this.utilsService.showSnackbar('Actualizando mascota...');
        this.pet.in_adopted_process = true;
        this.petService.update(this.pet, false).then(response => {
            if (response !== null) {
                this.sendEmailToAdmin();
            } else {
                this.utilsService.showSnackbar('Ocurrió un error al terminar tu solicitud, intenta de nuevo');
            }
        });
    }

    sendEmailToAdmin() {
        this.utilsService.showSnackbar('Notificando a Milagros del Rincón...');
        const description = 'Se registró una nueva solicitud de adopción en la plataforma de Milagros del Rincón, '
            + 'en cuanto puedas, échale un vistazo y decide si es aprobada o no.';

        this.utilsService.sendMail(
            environment.admin_mails,
            'Solicitud de adopción',
            '¡Hola!',
            description,
            'Ver lista de solicitudes',
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
        const title = '¡Hola ' + this.user.email + '!';
        const description = 'Tu solicitud de adopción ha sido registrada exitosamente en la plataforma, '
            + 'nosotros te avisaremos si es aceptada o no.<br/><br/>¡Mucha suerte!';

        this.utilsService.sendMail(
            environment.admin_mails,
            'Solicitud de adopción',
            title,
            description,
            'Ver mi solicitud',
            ''
        ).then(res => {
            if (res) {
                this.router.navigate(['/perfil/solicitudes']);
            } else {
                this.utilsService.showSnackbar('Ocurrió un error al terminar tu solicitud, intenta de nuevo');
            }
        });
    }
}
