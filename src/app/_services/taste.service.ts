import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { Taste } from '../_models/taste';

@Injectable({
    providedIn: 'root'
})
export class TasteService {
    private basePath = 'taste';
    private tastesRef: AngularFireList<any>;
    private tastes: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}

    index(query: any = null) {
        this.tastesRef = this.fireDatabase.list<Taste>(this.basePath, query);
        this.tastes = this.utilsService.setKeys(this.tastesRef);
        return this.tastes;
    }

    create(taste: Taste) {
        return new Promise(resolve => {
            this.tastesRef = this.fireDatabase.list<Taste>(this.basePath);
            this.tastes = this.utilsService.setKeys(this.tastesRef);

            this.tastes.subscribe(list => {
                let exists = false;

                list.forEach(auxTaste => {
                    if (taste.name.toLowerCase() === auxTaste.name.toLowerCase()) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    this.tastesRef.push(taste);
                }

                resolve(exists);
            });
        });
    }

    show(uid: string) {
        this.tastesRef = this.fireDatabase.list<Taste>(this.basePath, ref => {
            return ref.orderByChild('uid').equalTo(uid);
        });
        this.tastes = this.utilsService.setKeys(this.tastesRef);
        return this.tastes;
    }
}
