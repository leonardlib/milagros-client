import { ImageModel } from './image';
import {Author} from './author';
import {PostService} from '../_services/post.service';
import {post} from 'selenium-webdriver/http';
import {AuthorService} from '../_services/author.service';

export class Post {
    key: string;
    uid: string;
    title: string;
    main_image: ImageModel;
    content: string;
    author_uid: string;
    author: Author;
    date: string;

    constructor(post?: Post) {
        if (post) {
            this.key = post.key;
            this.uid = post.uid;
            this.title = post.title;
            this.main_image = post.main_image || new ImageModel();
            this.content = post.content;
            this.author_uid = post.author_uid;
            this.date = post.date;
            this.author = post.author || new Author();
        } else {
            this.uid = '';
            this.title = '';
            this.main_image = new ImageModel();
            this.content = '';
            this.author_uid = '';
            this.date = '';
            this.author = new Author();
        }
    }
}
