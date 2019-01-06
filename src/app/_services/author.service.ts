import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Author } from '../_models/author';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import {Post} from '../_models/post';

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

    show(uid: string) {
        this.authorRef = this.fireDatabase.list<Author>(this.basePath, ref => {
            return ref.orderByChild('uid').equalTo(uid);
        });
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
                    if (author.uid === auxAuthor.uid) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    author.uid = this.utilsService.generateRandomUid();
                    const newRef = this.authorRef.push(author);
                    author.key = newRef.key;
                } else {
                    this.authorRef.update(author.key + '', {
                        uid: author.uid,
                        name: author.name,
                        social_link: author.social_link
                    });
                }

                resolve(author);
            });
        });
    }
}
