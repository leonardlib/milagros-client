import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { PetService } from '../../../_services/pet.service';
import { Pet } from '../../../_models/pet';

@Component({
    selector: 'app-pet-admin-list',
    templateUrl: './pet-admin-list.component.html',
    styleUrls: ['./pet-admin-list.component.scss']
})
export class PetAdminListComponent implements OnInit {
    public rows = [];
    public temp = [];
    public loadingIndicator = true;
    public reorderable = true;
    public columns = [];
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public messages: any = {};

    constructor(
        private petService: PetService,
        private router: Router
    ) {}

    ngOnInit() {
        this.columns = [{
            prop: 'name',
            name: 'Nombre'
        }, {
            prop: 'fur.name',
            name: 'Pelaje'
        }, {
            prop: 'age.pet_age',
            name: 'Edad (años)'
        }];
        this.messages = {
            emptyMessage: 'Ningún resultado',
            totalMessage: 'en total'
        };

        this.petService.index().subscribe(pets => {
            this.temp = [...pets];
            this.rows = pets;

            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1500);
        });
    }

    onFilter(value: string) {
        const data = this.temp.filter(d => {
            return d.name.toLowerCase().indexOf(value) !== -1 || !value;
        });
        this.rows = data;
        this.table.offset = 0;
    }

    onSelect(event: any) {
        const pet = event.selected[0] as Pet;
        this.router.navigate(['/administrador/mascotas/editar/' + pet.uid]);
    }
}
