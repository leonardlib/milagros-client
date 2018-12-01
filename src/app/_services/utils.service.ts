import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';
declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    public redirectUrl: string;

    constructor(
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private router: Router,
        private fireStorage: AngularFireStorage,
        private http: HttpClient
    ) {}

    /**
     * Function to show a snackbar alert
     * @param text
     * @author Leonardo Lira Becerra
     * @date 10/09/2018
     */
    showSnackbar(text) {
        this.snackbar.open(text, 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    facebookLogin() {
        this.authService.facebookLogin().then(response => {
            this.redirect();
        }, error => {
            this.showSnackbar('¡Ops!, ocurrió un error. Intenta de nuevo.');
        });
    }

    googleLogin() {
        this.authService.googleLogin().then(response => {
            this.redirect();
        }, error => {
            this.showSnackbar('¡Ops!, ocurrió un error. Intenta de nuevo.');
        });
    }

    setKeys(ref: AngularFireList<any>) {
        return ref.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({
                    key: c.payload.key, ...c.payload.val()
                }))
            )
        );
    }

    getFileFromUrl(path: string, name: string) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', path, true);
            xhr.responseType = 'blob';
            xhr.onload = (e) => {
                if (xhr.status === 200) {
                    const blob = xhr.response;

                    blob['lastModifiedDate'] = new Date();
                    blob['name'] = name;
                    blob['webkitRelativePath'] = '';
                    const file = blob as File;

                    resolve(file);
                }
            };

            xhr.send();
        });
    }

    getDataURLFromFile(file: File) {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                resolve(e.target.result);
            };

            reader.readAsDataURL(file);
        });
    }

    uploadFile(file: File, path: string) {
        return new Promise(resolve => {
            const fileRef = this.fireStorage.ref(path);
            const task = this.fireStorage.upload(path, file);

            task.then(res => {
                fileRef.getDownloadURL().subscribe(url => {
                    resolve(url);
                }, error2 => {
                    resolve('');
                });
            }, error => {
                resolve('');
            });
        });
    }

    deleteFile(url: string) {
        return this.fireStorage.storage.refFromURL(url).delete();
    }

    generateRandomUid() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    checkIfExists(data: any, item: any, prop: string, isString: boolean = true) {
        let exists = false;

        if (data.length > 0) {
            data.forEach(savedData => {
                if (prop !== '') {
                    if (isString) {
                        if (item[prop].toLowerCase() === savedData[prop].toLowerCase()) {
                            exists = true;
                            return;
                        }
                    } else {
                        if (item[prop] === savedData[prop]) {
                            exists = true;
                            return;
                        }
                    }
                } else {
                    if (isString) {
                        if (item.toLowerCase() === savedData.toLowerCase()) {
                            exists = true;
                            return;
                        }
                    } else {
                        if (item === savedData) {
                            exists = true;
                            return;
                        }
                    }
                }
            });
        }

        return exists;
    }

    removeIfExists(data: any, item: any, prop: string, isString: boolean = true) {
        if (data.length > 0) {
            data.forEach((savedData, index) => {
                if (prop !== '') {
                    if (isString) {
                        if (item[prop].toLowerCase() === savedData[prop].toLowerCase()) {
                            data.splice(index, 1);
                            return;
                        }
                    } else {
                        if (item[prop] === savedData[prop]) {
                            data.splice(index, 1);
                            return;
                        }
                    }
                } else {
                    if (isString) {
                        if (item.toLowerCase() === savedData.toLowerCase()) {
                            data.splice(index, 1);
                            return;
                        }
                    } else {
                        if (item === savedData) {
                            data.splice(index, 1);
                            return;
                        }
                    }
                }
            });
        }
    }

    redirect() {
        if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
        } else {
            this.router.navigate(['/inicio']);
        }
    }

    rejectedFile() {
        this.showSnackbar('El archivo es demasiado pesado o no es el tipo requerido');
    }

    getFilePreview(url: string, name: string) {
        return new Promise(resolve => {
            this.getFileFromUrl(url, name).then(resp => {
                const res = resp as File;

                this.getDataURLFromFile(res).then(respo => {
                    const data = {
                        file: res,
                        preview: respo
                    };

                    resolve(data);
                });
            });
        });
    }

    getTemplate(url: string) {
        $('#html-inserted').load(url);
        return $('#html-inserted').innerHTML;
    }

    sendMail(to: string, subject: string, html: string) {
        const url = 'https://us-central1-milagros-0.cloudfunctions.net/helloWorld';

        return this.http.post(url, {
            to: to,
            subject: subject,
            html: html
        });
    }
}
