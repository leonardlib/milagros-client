export class Profile {
    key: string;
    user_email: string;
    name: string;
    last_name: string;
    mother_last_name: string;
    phone: string;
    uid: string;
    official_id: any;
    address_file: any;

    constructor(profile?: Profile) {
        if (profile) {
            this.key = profile.key;
            this.user_email = profile.user_email;
            this.name = profile.name;
            this.last_name = profile.last_name;
            this.mother_last_name = profile.mother_last_name;
            this.phone = profile.phone;
            this.uid = profile.uid;
            this.official_id = profile.official_id;
            this.address_file = profile.address_file;
        } else {
            this.user_email = '';
            this.name = '';
            this.last_name = '';
            this.mother_last_name = '';
            this.phone = '';
            this.uid = '';
            this.official_id = '';
            this.address_file = '';
        }
    }

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
