import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { Sex } from '../_models/sex';

@Injectable({
    providedIn: 'root'
})
export class SexService {
    private basePath = 'sex';
    private sexsRef: AngularFireList<any>;
    private sexs: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}

    index(query: any = null) {
        this.sexsRef = this.fireDatabase.list<Sex>(this.basePath, query);
        this.sexs = this.utilsService.setKeys(this.sexsRef);
        return this.sexs;
    }
}
