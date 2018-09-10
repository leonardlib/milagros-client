import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
}
