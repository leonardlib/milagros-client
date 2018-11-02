import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Donation } from '../_models/donation';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
}
