import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Post } from '../_models/post';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { AuthorService } from './author.service';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private basePath = 'post';
    private storageBasePath = 'images/post/';
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

            // Set post unique identifier
            post.uid = this.utilsService.generateRandomUid();

            // Upload main_image
            this.utilsService.uploadFile(post.main_image.file, this.storageBasePath + post.uid).then(res => {
                if (res !== '') {
                    post.main_image.url = res + '';
                    post.date = moment().locale('es').format('YYYY-MM-DD');

                    // Save post and image authors
                    this.authorService.create(post.author).then(response => {
                        this.authorService.create(post.main_image.author);
                    });

                    // Save post and set new key
                    const newRef = this.postsRef.push(post);
                    post.key = newRef.key;
                    resolve(post);
                } else {
                    resolve(null);
                }
            });
        });
    }

    update(post: Post) {
        return new Promise(resolve => {
            this.postsRef = this.fireDatabase.list<Post>(this.basePath);

            // Delete image
            this.utilsService.deleteFile(post.main_image.url).then(res => {
                // Upload new image
                this.utilsService.uploadFile(post['new_image'].file, this.storageBasePath + post.uid).then(res2 => {
                    if (res2) {
                        post.main_image.url = res2 + '';
                        post.date = moment().locale('es').format('YYYY-MM-DD');

                        // Save post and image authors
                        this.authorService.create(post.author).then(response => {
                            this.authorService.create(post.main_image.author);
                        });

                        // Update post info
                        this.postsRef.update(post.key + '', {
                            uid: post.uid,
                            title: post.title,
                            main_image: post.main_image,
                            content: post.content,
                            author: post.author,
                            date: post.date
                        });

                        resolve(post);
                    } else {
                        resolve(null);
                    }
                });
            }).catch(error => {
                resolve(null);
            });
        });
    }

    destroy(post: Post) {
        return new Promise(resolve => {
            this.postsRef = this.fireDatabase.list<Post>(this.basePath);

            this.utilsService.deleteFile(post.main_image.url).then(res => {
                if (res) {
                    this.postsRef.remove(post.key + '').then(response => {
                        resolve(true);
                    }, error => {
                        resolve(false);
                    });
                } else {
                    resolve(false);
                }
            });
        });
    }

    goToDetail(uid: string) {
        this.router.navigate(['/publicacion/contenido/' + uid]);
    }

    getMainImagePreview(post: Post) {
        return new Promise(resolve => {
            this.utilsService.getFileFromUrl(post.main_image.url, 'main_image').then(resp => {
                const res = resp as File;

                this.utilsService.getDataURLFromFile(res).then(respo => {
                    const data = {
                        file: res,
                        preview: respo
                    };

                    resolve(data);
                });
            });
        });
    }
}
