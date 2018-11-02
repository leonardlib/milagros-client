import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UtilsService} from './utils.service';
import {Router} from '@angular/router';
import {Size} from '../_models/size';

@Injectable({
    providedIn: 'root'
})
export class SizeService {
    private basePath = 'size';
    private sizesRef: AngularFireList<any>;
    private sizes: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}

    index(query: any = null) {
        this.sizesRef = this.fireDatabase.list<Size>(this.basePath, query);
        this.sizes = this.utilsService.setKeys(this.sizesRef);
        return this.sizes;
    }

    create(size: Size) {
        return new Promise(resolve => {
            this.sizesRef = this.fireDatabase.list<Size>(this.basePath);
            this.sizes = this.utilsService.setKeys(this.sizesRef);

            this.sizes.subscribe(list => {
                let exists = false;

                list.forEach(auxSize => {
                    if (size.name.toLowerCase() === auxSize.name.toLowerCase()) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    this.sizesRef.push(size);
                }

                resolve(exists);
            });
        });
    }

    show(uid: string) {
        this.sizesRef = this.fireDatabase.list<Size>(this.basePath, ref => {
            return ref.orderByChild('uid').equalTo(uid);
        });
        this.sizes = this.utilsService.setKeys(this.sizesRef);
        return this.sizes;
    }
}
