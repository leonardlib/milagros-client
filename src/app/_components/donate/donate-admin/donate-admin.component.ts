import {Component, OnInit} from '@angular/core';
import {PetService} from '../../../_services/pet.service';
import {UtilsService} from '../../../_services/utils.service';
import {DonateService} from '../../../_services/donate.service';

@Component({
    selector: 'app-donate-admin',
    templateUrl: './donate-admin.component.html',
    styleUrls: ['./donate-admin.component.scss']
})
export class DonateAdminComponent implements OnInit {
    public donations: any = [];
    public totalAmount: number;

    constructor(
        private donateService: DonateService,
        public petService: PetService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.donateService.orderBy('is_money', true).subscribe(donations => {
            this.donations = donations;
            this.sumAmount();
        });
    }

    sumAmount() {
        this.totalAmount = 0;

        this.donations.forEach(donation => {
            this.totalAmount += +donation.amount;
        });
    }
}
