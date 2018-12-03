import {ImageModel} from './image';

export class AdoptRequest {
    key: string;
    uid: string;
    place_images: ImageModel[];
    user_email: string;
    pet_uid: string;
    date: string;
    approved: boolean;

    constructor() {}
}