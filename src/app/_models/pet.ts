import { Taste } from './taste';
import { Age } from './age';
import { Sex } from './sex';
import { Fur } from './fur';
import { ImageModel } from './image';
import {Size} from './size';

export class Pet {
    key: string;
    uid: string;
    name: string;
    description: string;
    color: string;
    tastes: Taste[];
    images: ImageModel[];
    birthdate: any;
    age: Age;
    sex: Sex;
    fur: Fur;
    size: Size;
    adopted: boolean;
    in_adopted_process: boolean;
    sponsored: boolean;
    admission_date: any;
    egress_date: any;

    constructor() {}
}
