import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { Age } from '../_models/age';

@Injectable({
    providedIn: 'root'
})
export class AgeService {
    private basePath = 'age';
    private agesRef: AngularFireList<any>;
    private ages: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}
}
