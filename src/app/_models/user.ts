export class User {
    name: string;
    image: string;
    provider: string;
    email: string;
    password: string;
    admin?: boolean;

    constructor() {
        this.name = '';
        this.image = '';
        this.provider = '';
        this.admin = false;
    }
}