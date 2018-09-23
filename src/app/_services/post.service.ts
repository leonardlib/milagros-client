import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Post } from '../_models/post';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private basePath = 'post';
    private postsRef: AngularFireList<any>;
    private posts: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService
    ) {}

    index(query: any = null) {
        this.postsRef = this.fireDatabase.list<Post>(this.basePath, query);
        this.posts = this.utilsService.setKeys(this.postsRef);
        return this.posts;
    }
}
