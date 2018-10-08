import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Post } from '../_models/post';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import {Author} from '../_models/author';
import {AuthorService} from './author.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private basePath = 'post';
    private postsRef: AngularFireList<any>;
    private posts: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router,
        private authorService: AuthorService
    ) {}

    index(query: any = null) {
        this.postsRef = this.fireDatabase.list<Post>(this.basePath, query);
        this.posts = this.utilsService.setKeys(this.postsRef);
        return this.posts;
    }

    show(uid: string) {
        this.postsRef = this.fireDatabase.list<Post>(this.basePath, ref => {
            return ref.orderByChild('uid').equalTo(uid);
        });
        this.posts = this.utilsService.setKeys(this.postsRef);
        return this.posts;
    }

    create(post: Post) {
        return new Promise(resolve => {
            this.postsRef = this.fireDatabase.list<Post>(this.basePath);
            this.posts = this.utilsService.setKeys(this.postsRef);

            // Upload main_image to imgur
            this.utilsService.uploadImageToImgur(post.main_image.url).then(res => {
                if (res !== '') {
                    post.main_image.url = res + '';

                    this.authorService.create(post.author);
                    this.authorService.create(post.main_image.author);
                    this.postsRef.push(post);

                    resolve(post);
                } else {
                    resolve(null);
                }
            });
        });
    }

    update(post: Post) {
        return new Promise(resolve => {
            resolve(true);
        });
    }

    goToDetail(uid: string) {
        this.router.navigate(['/post/content/' + uid]);
    }

    getMainImage(post: Post) {
        return new Promise(resolve => {
            this.utilsService.getFileFromUrl(post.main_image.url, 'main_image').then(resp => {
                const res = resp as File;

                this.utilsService.getDataURLFromFile(res).then(respo => {
                    const data = {
                        id: 0,
                        file: res,
                        icon: respo,
                        size: '(' + (res.size / 1000).toFixed(0) + ' KB)'
                    };

                    resolve(data);
                });
            });
        });
    }
}
