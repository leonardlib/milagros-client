export class Author {
    key: string;
    uid: string;
    name: string;
    social_link: string;

    constructor(author?: Author) {
        if (author) {
            this.key = author.key;
            this.uid = author.uid;
            this.name = author.name;
            this.social_link = author.social_link;
        } else {
            this.uid = '';
            this.name = '';
            this.social_link = '';
        }
    }
}