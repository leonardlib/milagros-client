import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../_models/pet';
import { ColorEvent } from 'ngx-color';

@Component({
    selector: 'app-pet-admin-form',
    templateUrl: './pet-admin-form.component.html',
    styleUrls: ['./pet-admin-form.component.scss']
})
export class PetAdminFormComponent implements OnInit {
    public pet: Pet = new Pet();

    constructor() {}

    ngOnInit() {}

    onChangeColor(event: ColorEvent) {
        this.pet.color = event.color.hex;
    }
}
