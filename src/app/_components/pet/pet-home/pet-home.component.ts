import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {PetService} from '../../../_services/pet.service';
import {Router} from '@angular/router';
import {SexService} from '../../../_services/sex.service';
import {TasteService} from '../../../_services/taste.service';

@Component({
    selector: 'app-pet-home',
    templateUrl: './pet-home.component.html',
    styleUrls: ['./pet-home.component.scss']
})
export class PetHomeComponent implements OnInit {
    public pets: any = [];
    public sexs: any = [];
    public tastes: any = [];

    constructor(
        private petService: PetService,
        private sexService: SexService,
        private tasteService: TasteService,
        private router: Router
    ) {}

    ngOnInit() {
        this.petService.index().subscribe(pets => {
            this.pets = pets;
        });
        this.sexService.index().subscribe(sexs => {
            this.sexs = sexs;
        });
        this.tasteService.index().subscribe(tastes => {
            this.tastes = tastes;
        });
    }
}
