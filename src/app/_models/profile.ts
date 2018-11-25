export class Profile {
    user_email: string;
    name: string;
    last_name: string;
    mother_last_name: string;
    phone: string;
    uid: string;
    official_id: any;
    address_file: any;

    constructor() {}

    isCompleted() {
        return(
            this.user_email
            && this.name
            && this.last_name
            && this.mother_last_name
            && this.phone
            && this.official_id
            && this.address_file
        );
    }
}
