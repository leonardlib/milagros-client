import { Author } from './author';

export class ImageModel {
    key: string;
    author: Author;
    url: string;
    file: File;

    constructor() {
        this.author = new Author();
        this.url = '';
        this.file = null;
    }
}
