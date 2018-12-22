import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../../_models/user';
import {Donation} from '../../../_models/donation';
import {UtilsService} from '../../../_services/utils.service';
import {UserService} from '../../../_services/user.service';
import {DonateService} from '../../../_services/donate.service';

@Component({
    selector: 'app-donate-item',
    templateUrl: './donate-item.component.html',
    styleUrls: ['./donate-item.component.scss']
})
export class DonateItemComponent implements OnInit {
    @ViewChild('donateItemForm') form: NgForm;
    public user: User = new User();
    public donation: Donation = new Donation();

    constructor(
        private utilsService: UtilsService,
        private userService: UserService,
        private donateService: DonateService
    ) {}

    ngOnInit() {
        this.userService.current().then(user => {
            this.user = user;
            this.donation.name = this.user.name || '';
            this.donation.email = this.user.email || '';
        });
    }

    donate() {
        if (this.form.valid) {
            console.log('send mail');
        }
    }
}
