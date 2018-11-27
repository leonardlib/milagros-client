import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';
import {AdoptRequestService} from '../../../_services/adopt-request.service';

@Component({
    selector: 'app-profile-adopt-request-list',
    templateUrl: './profile-adopt-request-list.component.html',
    styleUrls: ['./profile-adopt-request-list.component.scss']
})
export class ProfileAdoptRequestListComponent implements OnInit {
    public user: User = new User();

    constructor(
        private userService: UserService,
        private adoptRequestService: AdoptRequestService
    ) {}

    ngOnInit() {
        this.userService.current().then(user => {
            this.user = user;

            this.adoptRequestService.showByUser(this.user.email).subscribe(response => {

            });
        });
    }
}
