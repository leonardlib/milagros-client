import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Pet } from '../_models/pet';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { AuthorService } from './author.service';
import * as moment from 'moment';
import {Post} from '../_models/post';
import {ImageModel} from '../_models/image';

@Injectable({
    providedIn: 'root'
})
export class PetService {
    private basePath = 'pet';
    private petsRef: AngularFireList<any>;
    private pets: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router,
        private authorService: AuthorService
    ) {}

    index(query: any = null) {
        this.petsRef = this.fireDatabase.list<Pet>(this.basePath, query);
        this.pets = this.utilsService.setKeys(this.petsRef);
        return this.pets;
    }

    show(uid: string) {
        this.petsRef = this.fireDatabase.list<Pet>(this.basePath, ref => {
            return ref.orderByChild('uid').equalTo(uid);
        });
        this.pets = this.utilsService.setKeys(this.petsRef);
        return this.pets;
    }

    create(pet: Pet) {
        return new Promise(resolve => {
            this.petsRef = this.fireDatabase.list<Pet>(this.basePath);

            // Upload images to imgur
            const startCreating = async () => {
                // Then, replace pet images
                pet.images = await this.uploadImages(pet.images);

                /*
                pet.age.pet_age = this.utilsService.calculateAge(pet.birthday);
                pet.age.human_age = this.utilsService.petAgeToHumanAge(pet.age.pet_age);
                pet.uid = this.utilsService.generateRandomUid();

                this.furService.create(pet.fur);
                this.tasteService.create(pet.tastes);

                this.petsRef.push(pet);
                */

                return true;
            };

            startCreating().then(res => {
                if (res) {
                    resolve(pet);
                } else {
                    resolve(null);
                }
            });
        });
    }

    async uploadImages(images: ImageModel[]) {
        for (let index = 0; index < images.length; index++) {
            await this.utilsService.uploadImageToImgur(images[index].url).then(res => {
                if (res !== '') {
                    images[index].url = res['link'] + '';
                    images[index].delete_hash = res['deletehash'] + '';
                }
            });
        }

        return images;
    }

    getImage(url: string, name: string) {
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
}
