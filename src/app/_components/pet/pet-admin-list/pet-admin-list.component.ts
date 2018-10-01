import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../_services/post.service';

@Component({
    selector: 'app-pet-admin-list',
    templateUrl: './pet-admin-list.component.html',
    styleUrls: ['./pet-admin-list.component.scss']
})
export class PetAdminListComponent implements OnInit {
    public rows = [];
    public loadingIndicator = true;
    public reorderable = true;
    public columns = [{
        prop: 'name',
        name: 'Nombre'
    }, {
        prop: 'color',
        name: 'Color'
    }, {
        prop: 'age',
        name: 'Edad'
    }];

    constructor(
    ) {

    }

    ngOnInit() {

    }
}
