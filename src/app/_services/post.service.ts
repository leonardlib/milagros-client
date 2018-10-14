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

            // Upload main_image to imgur
            this.utilsService.uploadImageToImgur(post.main_image.url).then(res => {
                if (res !== '') {
                    post.main_image.url = res['link'] + '';
                    post.main_image.delete_hash = res['deletehash'] + '';
                    post.date = moment().locale('es').format('DD/MM/YYYY');
                    post.uid = this.utilsService.generateRandomUid();

                    this.authorService.create(post.author).then(response => {
                        this.authorService.create(post.main_image.author);
                    });
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
            this.postsRef = this.fireDatabase.list<Post>(this.basePath);

            // Delete image from Imgur
            this.utilsService.deleteImageFromImgur(post.main_image.delete_hash).then(res => {
                if (res) {
                    // Upload new image to Imgur
                    this.utilsService.uploadImageToImgur(post['new_image']).then(res2 => {
                        if (res2) {
                            post.main_image.url = res2['link'] + '';
                            post.main_image.delete_hash = res2['deletehash'] + '';
                            post.date = moment().locale('es').format('DD/MM/YYYY');

                            this.authorService.create(post.author).then(response => {
                                this.authorService.create(post.main_image.author);
                            });
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
                } else {
                    resolve(null);
                }
            });
        });
    }

    destroy(post: Post) {
        return new Promise(resolve => {
            this.postsRef = this.fireDatabase.list<Post>(this.basePath);

            this.utilsService.deleteImageFromImgur(post.main_image.delete_hash).then(res => {
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
        this.router.navigate(['/post/content/' + uid]);
    }

    getMainImage(post: Post) {
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
