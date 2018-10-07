import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor(
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private router: Router
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
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

    facebookLogin() {
        this.authService.facebookLogin().then(response => {
            this.router.navigate(['/home']);
        }, error => {
            this.showSnackbar('¡Ops!, ocurrió un error. Intenta de nuevo.');
        });
    }

    googleLogin() {
        this.authService.googleLogin().then(response => {
            this.router.navigate(['/home']);
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
}
