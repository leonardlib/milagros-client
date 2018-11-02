import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../_models/pet';
import { ColorEvent } from 'ngx-color';
import { Taste } from '../../../_models/taste';
import { TasteService } from '../../../_services/taste.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../_services/utils.service';
import { PetService } from '../../../_services/pet.service';
import { MatDialog } from '@angular/material';
import { Age } from '../../../_models/age';
import { Sex } from '../../../_models/sex';
import { Fur } from '../../../_models/fur';
import { SexService } from '../../../_services/sex.service';
import { FurService } from '../../../_services/fur.service';
import { DateAdapter } from '@angular/material/core';
import { ImageModel } from '../../../_models/image';
import * as moment from 'moment';
import {ModalComponent} from '../../layout/modal/modal.component';

@Component({
    selector: 'app-pet-admin-form',
    templateUrl: './pet-admin-form.component.html',
    styleUrls: ['./pet-admin-form.component.scss']
})
export class PetAdminFormComponent implements OnInit {
    public pet: Pet = new Pet();
    public tastes: Taste[] = [];
    public tastesSelected: any = [];
    public sexs: Sex[] = [];
    public furs: Fur[] = [];
    public images: any[] = [];
    public loading = false;
    public editar: boolean;
    public minDate: any;
    public maxDate: any;
    public birthdate: any;
    public admissionDate: any;

    constructor(
        private tasteService: TasteService,
        private route: ActivatedRoute,
        private utilsService: UtilsService,
        public petService: PetService,
        private dialog: MatDialog,
        private router: Router,
        private sexService: SexService,
        private furService: FurService,
        private datepickerAdapter: DateAdapter<any>
    ) {
        this.editar = false;
        this.pet.age = new Age();
        this.pet.sex = new Sex();
        this.pet.fur = new Fur();
        this.pet.tastes = [];
        this.pet.images = [];
        this.pet.adopted = false;
        this.pet.sponsored = false;
        this.pet.egress_date = '';
        this.minDate = new Date(1950, 0, 1);
        this.maxDate = new Date();
    }

    ngOnInit() {
        this.sexService.index().subscribe(sexs => {
            this.sexs = sexs;
        });
        this.furService.index().subscribe(furs => {
            this.furs = furs;
        });
        this.tasteService.index().subscribe(tastes => {
            this.tastes = tastes;
        });
        this.datepickerAdapter.setLocale('es');

        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.petService.show(uid).subscribe(response => {
                this.pet = response[0] as Pet;
                this.getTastes();
                this.getImages();
                this.getDates();
                this.editar = true;
            });
        });
    }

    onChangeColor(event: ColorEvent) {
        this.pet.color = event.color.hex;
    }

    onSubmit() {
        if (this.validateForm()) {
            this.utilsService.showSnackbar('Guardando...');

            this.setTastes();
            this.setImages(this.editar);
            this.setDates();
            this.setAges();

            if (this.editar) {
                this.petService.update(this.pet).then(response => {
                    if (response) {
                        this.pet = response as Pet;
                        this.utilsService.showSnackbar('La mascota ha sido guardada');
                    } else {
                        this.utilsService.showSnackbar('Ocurrió un error al guardar. Intenta de nuevo');
                    }
                });
            } else {
                this.petService.create(this.pet).then(response => {
                    if (response) {
                        this.pet = response as Pet;
                        this.editar = true;
                        this.utilsService.showSnackbar('La mascota ha sido guardada');
                    } else {
                        this.utilsService.showSnackbar('Ocurrió un error al guardar. Intenta de nuevo');
                    }
                });
            }
        } else {
            this.utilsService.showSnackbar('Completa la información por favor');
        }
    }

    setTastes() {
        this.tastesSelected.forEach(taste => {
            const auxTaste = new Taste();
            auxTaste.name = taste;
            this.pet.tastes.push(auxTaste);
        });
    }

    getTastes() {
        const tastesList: any = [];

        this.pet.tastes.forEach(taste => {
            tastesList.push(taste.name);
        });

        this.tastesSelected = tastesList;
    }

    setImages(updating = false) {
        this.pet['new_images'] = [];

        this.images.forEach(image => {
            const auxImage = new ImageModel();
            auxImage.url = image['preview'];

            if (updating) {
                this.pet['new_images'].push(auxImage);
            } else {
                this.pet.images.push(auxImage);
            }
        });
    }

    getImages() {
        this.pet.images.forEach((image, index) => {
            this.petService.getImage(image.url, '' + (index + 1)).then(res => {
                this.images.push(res);
            });
        });
    }

    setDates() {
        this.pet.birthdate = moment(this.birthdate).locale('es').format('YYYY-MM-DD');
        this.pet.admission_date = moment(this.admissionDate).locale('es').format('YYYY-MM-DD');
    }

    getDates() {
        this.birthdate = moment(this.pet.birthdate).locale('es').toDate();
        this.admissionDate = moment(this.pet.admission_date).locale('es').toDate();
    }

    setAges() {
        this.pet.age.pet_age = this.petService.calculatePetAge(this.pet);
        this.pet.age.human_age = this.petService.petAgeToHumanAge(this.pet);
    }

    validateForm() {
        return (
            this.pet.name && this.pet.name !== '' &&
            this.pet.description && this.pet.description !== '' &&
            this.tastesSelected.length > 0 &&
            this.images.length > 0 &&
            this.birthdate && this.birthdate !== '' &&
            this.pet.sex.name && this.pet.sex.name !== '' &&
            this.pet.fur.name && this.pet.fur.name !== '' &&
            this.pet.color && this.pet.color !== '' &&
            this.admissionDate && this.admissionDate !== ''
        );
    }

    onDelete() {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '300px',
            data: {
                title: '¿Estás seguro de eliminar esta mascota?',
                content: 'Esta acción no podrá revertirse, una vez eliminada no se podrá recuperar después.',
                closeBtnText: 'Cancelar',
                confirmBtnText: 'OK'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deletePet();
            }
        });
    }

    deletePet() {
        this.utilsService.showSnackbar('Eliminando...');
        this.petService.destroy(this.pet).then(response => {
            if (response) {
                this.utilsService.showSnackbar('Mascota eliminada');
                this.router.navigate(['/admin/pets']);
            } else {
                this.utilsService.showSnackbar('No se ha podido eliminar esta mascota');
            }
        });
    }
}
