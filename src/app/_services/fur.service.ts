import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { Fur } from '../_models/fur';

@Injectable({
    providedIn: 'root'
})
export class FurService {
    private basePath = 'fur';
    private fursRef: AngularFireList<any>;
    private furs: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}

    index(query: any = null) {
        this.fursRef = this.fireDatabase.list<Fur>(this.basePath, query);
        this.furs = this.utilsService.setKeys(this.fursRef);
        return this.furs;
    }

    create(fur: Fur) {
        return new Promise(resolve => {
            this.fursRef = this.fireDatabase.list<Fur>(this.basePath);
            this.furs = this.utilsService.setKeys(this.fursRef);

            this.furs.subscribe(list => {
                let exists = false;

                list.forEach(auxFur => {
                    if (fur.name.toLowerCase() === auxFur.name.toLowerCase()) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    this.fursRef.push(fur);
                }

                resolve(exists);
            });
        });
    }

    show(uid: string) {
        this.fursRef = this.fireDatabase.list<Fur>(this.basePath, ref => {
            return ref.orderByChild('uid').equalTo(uid);
        });
        this.furs = this.utilsService.setKeys(this.fursRef);
        return this.furs;
    }
}
