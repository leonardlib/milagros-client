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
import {Post} from '../_models/post';
import {SizeService} from './size.service';

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
        private sizeService: SizeService,
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

            const startCreating = async () => {
                // Upload images to Imgur, then replace pet images
                pet.images = await this.uploadImages(pet.images);
                pet.uid = this.utilsService.generateRandomUid();
                this.furService.create(pet.fur);
                this.sizeService.create(pet.size);
                await this.uploadTastes(pet.tastes);

                const newRef = this.petsRef.push(pet);
                pet.key = newRef.key;
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

    update(pet: Pet) {
        return new Promise(resolve => {
            this.petsRef = this.fireDatabase.list<Pet>(this.basePath);

            const startUpdating = async () => {
                // Delete images from Imgur
                await this.deleteImages(pet.images);
                // Upload images to Imgur, then replace pet images
                pet.images = await this.uploadImages(pet['new_images']);
                this.furService.create(pet.fur);
                this.sizeService.create(pet.size);
                await this.uploadTastes(pet.tastes);

                this.petsRef.update(pet.key + '', {
                    uid: pet.uid,
                    name: pet.name,
                    description: pet.description,
                    color: pet.color,
                    tastes: pet.tastes,
                    images: pet.images,
                    birthdate: pet.birthdate,
                    age: pet.age,
                    sex: pet.sex,
                    fur: pet.fur,
                    size: pet.size,
                    adopted: pet.adopted,
                    sponsored: pet.sponsored,
                    admission_date: pet.admission_date,
                    egress_date: pet.egress_date
                });
                return true;
            };

            startUpdating().then(res => {
                if (res) {
                    resolve(pet);
                } else {
                    resolve(null);
                }
            });
        });
    }

    destroy(pet: Pet) {
        return new Promise(resolve => {
            this.petsRef = this.fireDatabase.list<Pet>(this.basePath);

            const startDeleting = async () => {
                // Delete images from Imgur
                await this.deleteImages(pet.images);
                return true;
            };

            startDeleting().then(res => {
                if (res) {
                    this.petsRef.remove(pet.key + '').then(response => {
                        resolve(true);
                    }, error => {
                        resolve(false);
                    });
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

    async deleteImages(images: ImageModel[]) {
        console.log(images);
        for (let index = 0; index < images.length; index++) {
            await this.utilsService.deleteImageFromImgur(images[index].delete_hash);
        }
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
        return moment().diff(pet.birthdate, 'years', false);
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
