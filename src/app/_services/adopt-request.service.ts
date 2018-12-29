import {Injectable} from '@angular/core';
import {AdoptRequest} from '../_models/adopt-request';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UtilsService} from './utils.service';
import {ImageModel} from '../_models/image';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {Pet} from '../_models/pet';

@Injectable({
    providedIn: 'root'
})
export class AdoptRequestService {
    private basePath = 'adopt_request';
    private storageBasePath = 'images/adopt_request/';
    private adoptRequestsRef: AngularFireList<any>;
    private adoptRequests: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}

    index(query: any = null) {
        this.adoptRequestsRef = this.fireDatabase.list<AdoptRequest>(this.basePath, query);
        this.adoptRequests = this.utilsService.setKeys(this.adoptRequestsRef);
        return this.adoptRequests;
    }

    show(uid: string) {
        this.adoptRequestsRef = this.fireDatabase.list<AdoptRequest>(this.basePath, ref => {
            return ref.orderByChild('uid').equalTo(uid);
        });
        this.adoptRequests = this.utilsService.setKeys(this.adoptRequestsRef);
        return this.adoptRequests;
    }

    create(adoptRequest: AdoptRequest) {
        return new Promise(resolve => {
            this.adoptRequestsRef = this.fireDatabase.list<AdoptRequest>(this.basePath);

            // Set request unique identifier
            adoptRequest.uid = this.utilsService.generateRandomUid();

            const startCreating = async () => {
                // Upload images, then replace request place images
                adoptRequest.place_images = await this.uploadImages(
                    adoptRequest.place_images,
                    adoptRequest.uid
                );

                adoptRequest.approved = false;
                adoptRequest.date = moment().locale('es').format('YYYY-MM-DD');

                // Save adopt request and set new key
                const newRef = this.adoptRequestsRef.push(adoptRequest);
                adoptRequest.key = newRef.key;
                return true;
            };

            startCreating().then(res => {
                if (res) {
                    resolve(adoptRequest);
                } else {
                    resolve(null);
                }
            });
        });
    }

    showByUser(user_email: string) {
        this.adoptRequestsRef = this.fireDatabase.list<AdoptRequest>(this.basePath, ref => {
            return ref.orderByChild('user_email').equalTo(user_email);
        });
        this.adoptRequests = this.utilsService.setKeys(this.adoptRequestsRef);
        return this.adoptRequests;
    }

    async uploadImages(images: ImageModel[], uid: string) {
        for (let index = 0; index < images.length; index++) {
            const pathName = this.storageBasePath + uid + '-0' + (index + 1);

            await this.utilsService.uploadFile(images[index].file, pathName).then(res => {
                if (res !== '') {
                    images[index].url = res + '';
                }
            });
        }

        return images;
    }

    async deleteImages(images: ImageModel[]) {
        for (let index = 0; index < images.length; index++) {
            await this.utilsService.deleteFile(images[index].url);
        }
    }

    getImagePreview(url: string, name: string) {
        return new Promise(resolve => {
            this.utilsService.getFileFromUrl(url, name).then(resp => {
                const res = resp as File;

                this.utilsService.getDataURLFromFile(res).then(respo => {
                    const data = {
                        file: res,
                        preview: respo
                    };

                    resolve(data);
                });
            });
        });
    }

    goToDetail(uid: string) {
        this.router.navigate(['/administrador/mascotas/adoptar/' + uid]);
    }
}
