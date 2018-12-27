import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Donation } from '../_models/donation';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {Fur} from '../_models/fur';

@Injectable({
  providedIn: 'root'
})
export class DonateService {
    private basePath = 'donation';
    private donationRef: AngularFireList<any>;
    private donations: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}

    index(query: any = null) {
        this.donationRef = this.fireDatabase.list<Donation>(this.basePath, query);
        this.donations = this.utilsService.setKeys(this.donationRef);
        return this.donations;
    }

    create(donation: Donation) {
        return new Promise(resolve => {
            this.donationRef = this.fireDatabase.list<Donation>(this.basePath);
            this.donations = this.utilsService.setKeys(this.donationRef);

            // Set donation unique identifier
            donation.uid = this.utilsService.generateRandomUid();

            // Set donation date
            donation.date = moment().locale('es').format('YYYY-MM-DD');

            // Save donation and set new key
            const newRef = this.donationRef.push(donation);
            donation.key = newRef.key;
            resolve(donation);
        });
    }

    onlyMoney(isMoney: boolean = true) {
        return this.index(ref => {
            return ref.orderByChild('is_money').equalTo(isMoney);
        });
    }
}
