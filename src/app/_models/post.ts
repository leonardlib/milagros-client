import { ImageModel } from './image';
import { Author } from './author';

export class Post {
    key: string;
    uid: string;
    title: string;
    main_image: ImageModel;
    content: string;
    author: Author;
    date: string;

    constructor() {}
}
