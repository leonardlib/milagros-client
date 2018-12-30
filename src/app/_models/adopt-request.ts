import {ImageModel} from './image';

export class AdoptRequest {
    key: string;
    uid: string;
    place_images: ImageModel[];
    user_email: string;
    pet_uid: string;
    date: string;
    approved: boolean;
    approved_date: string;

    constructor() {
        this.uid = '';
        this.place_images = [];
        this.user_email = '';
        this.pet_uid = '';
        this.date = '';
        this.approved = false;
        this.approved_date = '';
    }
}