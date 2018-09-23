import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Post } from '../_models/post';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: AngularFireList<any>;
    private post: Post;
    private basePath: '/post';

    constructor(
        private fireDatabase: AngularFireDatabase
    ) {}

    index() {
        this.posts = this.fireDatabase.list(this.basePath);
        return this.posts;
    }
}
