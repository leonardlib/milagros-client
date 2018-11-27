import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../_models/profile';
import {UtilsService} from '../../../_services/utils.service';

@Component({
    selector: 'app-pet-adopt',
    templateUrl: './pet-adopt.component.html',
    styleUrls: ['./pet-adopt.component.scss']
})
export class PetAdoptComponent implements OnInit {
    public photosList: any = [];

    constructor(
        public utilsService: UtilsService
    ) {}

    ngOnInit() {}

    send() {
        if (this.photosList.length > 0) {
            console.log('Hola');
        } else {
            this.utilsService.showSnackbar('Agrega fotos para continuar');
        }
    }
}
