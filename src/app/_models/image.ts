import {Author} from './author';

export class ImageModel {
    key: string;
    author_uid: string;
    author: Author;
    url: string;
    file: File;

    constructor(imageModel?: ImageModel) {
        if (imageModel) {
            this.key = imageModel.key;
            this.author_uid = imageModel.author_uid;
            this.author = imageModel.author || new Author();
            this.url = imageModel.url;
            this.file = imageModel.file || null;
        } else {
            this.author_uid = '';
            this.author = new Author();
            this.url = '';
            this.file = null;
        }
    }
}
