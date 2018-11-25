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
            return ref.orderByChild('email').equalTo(email);
        });
        this.profiles = this.utilsService.setKeys(this.profilesRef);
        return this.profiles;
    }
}
