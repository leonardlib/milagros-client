import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Pet } from '../_models/pet';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ImageModel } from '../_models/image';
import { FurService } from './fur.service';
import { Taste } from '../_models/taste';
import { TasteService } from './taste.service';

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
        private furService: FurService,
        private tasteService: TasteService
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
                pet.uid = this.utilsService.generateRandomUid();
                this.furService.create(pet.fur);
                await this.uploadTastes(pet.tastes);

                this.petsRef.push(pet);
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

    async uploadTastes(tastes: Taste[]) {
        for (let index = 0; index < tastes.length; index++) {
            await this.tasteService.create(tastes[index]);
        }
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

    calculatePetAge(pet: Pet) {
        return moment().diff(pet.birthday, 'years', false);
    }

    petAgeToHumanAge(pet: Pet) {
        const firstYear = 13;
        const secondYear = 20;

        if (pet.age.pet_age > 2) {
            return secondYear + ((pet.age.pet_age - 2) * 5);
        } else if (pet.age.pet_age === 1) {
            return firstYear;
        } else {
            return secondYear;
        }
    }
}
