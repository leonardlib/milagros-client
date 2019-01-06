import {Component, OnInit} from '@angular/core';
import {PetService} from '../../../_services/pet.service';
import {UtilsService} from '../../../_services/utils.service';
import {AdoptRequestService} from '../../../_services/adopt-request.service';
import {Pet} from '../../../_models/pet';

@Component({
    selector: 'app-adopt-requests-admin',
    templateUrl: './adopt-requests-admin.component.html',
    styleUrls: ['./adopt-requests-admin.component.scss']
})
export class AdoptRequestsAdminComponent implements OnInit {
    public adoptRequestsList: any = [];
    public adoptRequestsListAdopted: any = [];
    public noAdoptRequestsListAdopted: any = [];

    constructor(
        public adoptRequestService: AdoptRequestService,
        public petService: PetService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.adoptRequestService.index().subscribe(adoptRequests => {
            this.adoptRequestsList = adoptRequests;
            this.setPets();
        });
    }

    setPets() {
        this.adoptRequestsList.forEach(adoptRequest => {
            this.petService.show(adoptRequest.pet_uid).subscribe(pets => {
                adoptRequest['pet'] = pets[0] as Pet;

                if (adoptRequest['pet'].adopted && adoptRequest.approved) {
                    this.adoptRequestsListAdopted.push(adoptRequest);
                } else {
                    this.noAdoptRequestsListAdopted.push(adoptRequest);
                }
            });
        });
    }
}
