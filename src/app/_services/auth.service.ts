import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        public fireAuth: AngularFireAuth
    ) {}

    login(user: User) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(
                user.email,
                user.password
            ).then(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    googleLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');

            this.fireAuth.auth.signInWithPopup(provider).then(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    facebookLogin() {
        return new Promise<any>((resolve, reject) => {
            const provider = new firebase.auth.FacebookAuthProvider();

            this.fireAuth.auth.signInWithPopup(provider).then(response => {
                resolve(response);
            }, error => {
                    reject(error);
            });
        });
    }

    register(user: User) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(
                user.email,
                user.password
            ).then(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    sendResetPasswordMail(user: User) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().sendPasswordResetEmail(user.email).then(response => {
                resolve(response);
            }, error => {
                reject(error);
            });
        });
    }

    logout(){
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.fireAuth.auth.signOut();
                resolve();
            } else {
                reject();
            }
        });
    }
}
