import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Author } from '../_models/author';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    private basePath = 'author';
    private authorRef: AngularFireList<any>;
    private authors: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}

    index(query: any = null) {
        this.authorRef = this.fireDatabase.list<Author>(this.basePath, query);
        this.authors = this.utilsService.setKeys(this.authorRef);
        return this.authors;
    }

    create(author: Author) {
        return new Promise(resolve => {
            this.authorRef = this.fireDatabase.list<Author>(this.basePath);
            this.authors = this.utilsService.setKeys(this.authorRef);

            this.authors.subscribe(list => {
                let exists = false;

                list.forEach(auxAuthor => {
                    if (author.name.toLowerCase() === auxAuthor.name.toLowerCase()) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    author.uid = this.utilsService.generateRandomUid();
                    this.authorRef.push(author);
                }

                resolve(exists);
            });
        });
    }
}
