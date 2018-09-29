import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        public database: AngularFirestore,
        public fireAuth: AngularFireAuth
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
}
