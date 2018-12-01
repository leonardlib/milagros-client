import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Post} from '../_models/post';
import {Profile} from '../_models/profile';
import {UtilsService} from './utils.service';
import {User} from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private basePath = 'profile';
    private profilesRef: AngularFireList<any>;
    private storageBasePath = 'images/profile/';
    private profiles: Observable<any[]>;

    constructor(
        public database: AngularFirestore,
        public fireAuth: AngularFireAuth,
        private fireDatabase: AngularFireDatabase,
        private utilsService: UtilsService
    ) {}

    current() {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    resolve(user);
                } else {
                    reject('No user logged');
                }
            });
        });
    }

    update(value: any) {
        return new Promise<any>((resolve, reject) => {
            const user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: value.name,
                photoURL: user.photoURL
            }).then(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    verifyAdminEmail(email: string) {
        let exists = false;

        environment.admin_mails.forEach(adminMail => {
            if (adminMail === email) {
                exists = true;
                return;
            }
        });

        return exists;
    }

    getProfile(email: string) {
        this.profilesRef = this.fireDatabase.list<Profile>(this.basePath, ref => {
            return ref.orderByChild('user_email').equalTo(email);
        });
        this.profiles = this.utilsService.setKeys(this.profilesRef);
        return this.profiles;
    }

    saveProfile(profile: Profile) {
        return new Promise(resolve => {
            this.profilesRef = this.fireDatabase.list<Profile>(this.basePath);
            const filesPath = this.storageBasePath + profile.uid;

            // Set profile unique identifier
            profile.uid = this.utilsService.generateRandomUid();

            // Upload files and then save profile
            this.utilsService.uploadFile(profile.official_id, filesPath).then(res => {
                if (res !== '') {
                    profile.official_id = res + '';

                    this.utilsService.uploadFile(profile.address_file, filesPath).then(res2 => {
                        if (res2 !== '') {
                            profile.address_file = res2 + '';

                            // Save profile and set new key
                            const newRef = this.profilesRef.push(profile);
                            profile.key = newRef.key;
                            resolve(profile);
                        } else {
                            resolve(null);
                        }
                    });
                } else {
                    resolve(null);
                }
            });
        });
    }

    updateProfile(profile: Profile) {
        return new Promise(resolve => {
            this.profilesRef = this.fireDatabase.list<Profile>(this.basePath);
            const filesPath = this.storageBasePath + profile.uid;

            // Renew profile unique identifier
            profile.uid = this.utilsService.generateRandomUid();

            // Remove files
            this.utilsService.deleteFile(profile.official_id).then(res => {
                if (res) {
                    this.utilsService.deleteFile(profile.address_file).then(res2 => {
                        if (res2) {
                            // Upload files and then save profile
                            this.utilsService.uploadFile(profile['new_oid'], filesPath).then(res3 => {
                                if (res3 !== '') {
                                    profile.official_id = res3 + '';

                                    this.utilsService.uploadFile(profile['new_adf'], filesPath).then(res4 => {
                                        if (res4 !== '') {
                                            profile.address_file = res4 + '';

                                            this.profilesRef.update(profile.key + '', {
                                                user_email: profile.user_email,
                                                name: profile.name,
                                                last_name: profile.last_name,
                                                mother_last_name: profile.mother_last_name,
                                                phone: profile.phone,
                                                uid: profile.uid,
                                                official_id: profile.official_id,
                                                address_file: profile.address_file
                                            });

                                            resolve(profile);
                                        } else {
                                            resolve(null);
                                        }
                                    });
                                } else {
                                    resolve(null);
                                }
                            });
                        } else {
                            resolve(null);
                        }
                    });
                } else {
                    resolve(null);
                }
            });
        });
    }
}
