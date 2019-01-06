import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';
import {AdoptRequestService} from '../../../_services/adopt-request.service';
import {PetService} from '../../../_services/pet.service';
import {Pet} from '../../../_models/pet';
import {AdoptRequest} from '../../../_models/adopt-request';
import {UtilsService} from '../../../_services/utils.service';

@Component({
    selector: 'app-profile-adopt-request-list',
    templateUrl: './profile-adopt-request-list.component.html',
    styleUrls: ['./profile-adopt-request-list.component.scss']
})
export class ProfileAdoptRequestListComponent implements OnInit {
    public user: User = new User();
    public adoptRequestsListAdopted: any = [];
    public noAdoptRequestsListAdopted: any = [];

    constructor(
        private userService: UserService,
        private adoptRequestService: AdoptRequestService,
        public petService: PetService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.userService.current().then(user => {
            this.user = user;

            this.adoptRequestService.showByUser(this.user.email).subscribe(response => {
                response.forEach(adoptRequestItem => {
                    const adoptRequest = adoptRequestItem as AdoptRequest;

                    this.petService.show(adoptRequest.pet_uid).subscribe(pets => {
                        adoptRequest['pet'] = pets[0] as Pet;

                        if (adoptRequest['pet'].adopted && adoptRequest.approved) {
                            this.adoptRequestsListAdopted.push(adoptRequest);
                        } else {
                            this.noAdoptRequestsListAdopted.push(adoptRequest);
                        }
                    });
                });
            });
        }).catch(error => {
            this.user = new User();
        });
    }
}
