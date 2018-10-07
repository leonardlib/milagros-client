import { ImageModel } from './image';

export class Post {
    key: number;
    uid: string;
    title: string;
    main_image: ImageModel;
    content: string;
    author: string;
    date: string;

    constructor() {}
}