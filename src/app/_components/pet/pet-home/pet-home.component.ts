import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {PetService} from '../../../_services/pet.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-pet-home',
    templateUrl: './pet-home.component.html',
    styleUrls: ['./pet-home.component.scss']
})
export class PetHomeComponent implements OnInit {
    public pets = [];

    constructor(
        private petService: PetService,
        private router: Router
    ) {}

    ngOnInit() {
        this.petService.index().subscribe(pets => {
            this.pets = pets;
        });
    }
}
