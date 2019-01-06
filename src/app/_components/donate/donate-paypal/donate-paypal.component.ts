import {Component, OnInit} from '@angular/core';
import {PayPalConfig, PayPalEnvironment, PayPalFunding, PayPalIntegrationType} from 'ngx-paypal';
import {environment} from '../../../../environments/environment';
import {UtilsService} from '../../../_services/utils.service';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';
import {Donation} from '../../../_models/donation';
import {DonateService} from '../../../_services/donate.service';

@Component({
    selector: 'app-donate-paypal',
    templateUrl: './donate-paypal.component.html',
    styleUrls: ['./donate-paypal.component.scss']
})
export class DonatePaypalComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
