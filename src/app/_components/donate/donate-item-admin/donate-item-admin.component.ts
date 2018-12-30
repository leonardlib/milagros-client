import {Component, OnInit} from '@angular/core';
import {DonateService} from '../../../_services/donate.service';
import {PetService} from '../../../_services/pet.service';
import {UtilsService} from '../../../_services/utils.service';

@Component({
    selector: 'app-donate-item-admin',
    templateUrl: './donate-item-admin.component.html',
    styleUrls: ['./donate-item-admin.component.scss']
})
export class DonateItemAdminComponent implements OnInit {
    public donations: any = [];

    constructor(
        public donateService: DonateService,
        public petService: PetService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.donateService.byMoney(false).subscribe(donations => {
            this.donations = donations;
        });
    }
}
