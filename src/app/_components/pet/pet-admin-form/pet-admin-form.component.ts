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
    public froalaOptions: any = {};
    public editar: boolean;

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
        const buttons = [
            'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
            'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
            'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink',
            'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons',
            'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help',
            'html', '|', 'undo', 'redo'
        ];

        this.froalaOptions = {
            language: 'es',
            toolbarButtons: buttons,
            toolbarButtonsMD: buttons,
            toolbarButtonsSM: buttons,
            toolbarButtonsXS: buttons,
            imageUploadURL: 'https://i.froala.com/upload?x'
        };
        this.editar = false;
        this.pet.age = new Age();
        this.pet.sex = new Sex();
        this.pet.fur = new Fur();
        this.pet.tastes = [];
        this.pet.images = [];
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.petService.show(uid).subscribe(response => {
                this.pet = response[0] as Pet;
                this.getImages();
                this.editar = true;
            });
        });

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
    }

    getImages() {
        this.pet.images.forEach((image, index) => {
            this.petService.getImage(image.url, '' + (index + 1)).then(res => {
                this.images.push(res);
            });
        });
    }

    onChangeColor(event: ColorEvent) {
        this.pet.color = event.color.hex;
    }

    onDelete() {
        console.log(this.pet);
    }

    onSubmit() {
        if (this.validateForm()) {
            this.utilsService.showSnackbar('Guardando...');

            this.setTastes();
            this.setImages();
            this.formatDates('YYYY-MM-DD');
            this.setAges();
            this.formatDates('DD/MM/YYYY');

            if (this.editar) {
                /*
                this.petService.update(this.pet).then(response => {
                    if (response) {
                        this.pet = response as Pet;
                        this.utilsService.showSnackbar('La mascota ha sido guardada');
                    } else {
                        this.utilsService.showSnackbar('Ocurrió un error al guardar. Intenta de nuevo');
                    }
                });
                */
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

    setImages() {
        this.images.forEach(image => {
            const auxImage = new ImageModel();
            auxImage.url = image['preview'];
            this.pet.images.push(auxImage);
        });
    }

    formatDates(format: string) {
        this.pet.birthday = moment(this.pet.birthday).locale('es').format(format);
        this.pet.admission_date = moment(this.pet.admission_date).locale('es').format(format);
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
            this.pet.birthday && this.pet.birthday !== '' &&
            this.pet.sex.name && this.pet.sex.name !== '' &&
            this.pet.fur.name && this.pet.fur.name !== '' &&
            this.pet.color && this.pet.color !== '' &&
            this.pet.admission_date && this.pet.admission_date !== ''
        );
    }
}
