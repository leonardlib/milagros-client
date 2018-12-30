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
    public collectedDonations: any = [];
    public noCollectedDonations: any = [];

    constructor(
        public donateService: DonateService,
        public petService: PetService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.donateService.orderBy('is_money', false).subscribe(donations => {
            this.donations = donations;
            this.filterDonations();
        });
    }

    filterDonations() {
        this.donations.forEach(donation => {
            if (donation.collected) {
                this.collectedDonations.push(donation);
            } else {
                this.noCollectedDonations.push(donation);
            }
        });
    }
}
