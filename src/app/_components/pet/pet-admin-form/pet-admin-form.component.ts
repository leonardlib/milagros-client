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

@Component({
    selector: 'app-pet-admin-form',
    templateUrl: './pet-admin-form.component.html',
    styleUrls: ['./pet-admin-form.component.scss']
})
export class PetAdminFormComponent implements OnInit {
    public pet: Pet = new Pet();
    public tastes: Taste[] = [];
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
        private furService: FurService
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

    onChangeBirthday(value: any) {
        console.log(value);
    }

    onChangeAdmission(value: any) {
        console.log(value);
    }

    onDelete() {
        console.log(this.pet);
    }

    onSubmit() {
        console.log(this.pet);
    }
}
