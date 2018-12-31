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
    public paypalConfig: PayPalConfig = null;
    public user: User = new User();
    public donation: Donation = new Donation();

    constructor(
        private utilsService: UtilsService,
        private userService: UserService,
        private donateService: DonateService
    ) {}

    ngOnInit() {
        this.setPaypalConfig();

        this.userService.current().then(user => {
            this.user = user;
            this.donation.name = this.user.name;
            this.donation.email = this.user.email;
        }).catch(error => {
            this.user = new User();
        });
    }

    setPaypalConfig() {
        this.paypalConfig = new PayPalConfig(
            PayPalIntegrationType.ClientSideREST,
            PayPalEnvironment.Sandbox, {
                commit: true,
                client: {
                    sandbox: environment.paypal.client_id,
                },
                button: {
                    label: 'paypal',
                    layout: 'vertical'
                },
                onPaymentComplete: (data, actions) => {
                    this.completedPayment();
                },
                onError: error => {
                    console.log(error);
                },
                transactions: [{
                    amount: {
                        currency: 'MXN',
                        total: 5
                    }
                }],
                experience: {
                    noShipping: true,
                    brandName: 'Milagros del Rincón',
                }
            }
        );
    }

    completedPayment() {
        this.donation.amount = this.paypalConfig.transactions[0].amount.total;
        this.donation.is_money = true;

        this.donateService.create(this.donation).then(response => {
            if (response !== null) {
                this.utilsService.showSnackbar('¡Muchas gracias por tu donación!, has ayudado a todas nuestras mascotas.');

                if (this.donation.name && this.donation.email) {
                    this.sendEmailToUser();
                }
            }
        });
    }

    sendEmailToUser() {
        const title = '¡Hola ' + this.donation.name + '!';
        const description = 'Estamos muy agradecidos por tu donación, ahora eres parte de Milagros del Rincón, ' +
            'con esto has ayudado a todos nuestros pequeñines a vivir en óptimas condiciones y a poder darles una mejor ' +
            'vida en general. Nos encantaría que nos visitaras, te esperamos con los brazos abiertos.<br/><br/>¡Muchísimas gracias!';

        this.utilsService.sendMail(
            [this.donation.email],
            '¡Muchas gracias!',
            title,
            description,
            'Ver mascotas',
            ''
        );
    }
}
