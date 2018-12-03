import {Component, OnInit} from '@angular/core';
import {PayPalConfig, PayPalEnvironment, PayPalFunding, PayPalIntegrationType} from 'ngx-paypal';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-donate-paypal',
    templateUrl: './donate-paypal.component.html',
    styleUrls: ['./donate-paypal.component.scss']
})
export class DonatePaypalComponent implements OnInit {
    public paypalConfig: PayPalConfig = null;

    constructor() {}

    ngOnInit() {
        this.setPaypalConfig();
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
                onPaymentComplete: this.completedPayment,
                onCancel: this.canceledPayment,
                onError: this.errorPayment,
                transactions: [{
                    amount: {
                        currency: 'MXN',
                        total: 0
                    }
                }],
                experience: {
                    noShipping: true,
                    brandName: 'Milagros del Rincón',
                }
            }
        );
    }

    completedPayment(data, actions) {
        console.log(data);
        console.log(actions);
    }

    canceledPayment(data, actions) {
        console.log(data);
        console.log(actions);
    }

    errorPayment(error) {
        console.log(error);
    }
}
