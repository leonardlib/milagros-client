import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-donate-tienda',
    templateUrl: './donate-tienda.component.html',
    styleUrls: ['./donate-tienda.component.scss']
})
export class DonateTiendaComponent implements OnInit {
    public oxxoCard: string;

    constructor() {}

    ngOnInit() {
        this.oxxoCard = environment.oxxo_card;
    }
}
