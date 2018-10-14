import { Taste } from './taste';
import { Age } from './age';
import { Sex } from './sex';
import { Fur } from './fur';
import { ImageModel } from './image';

export class Pet {
    key: string;
    uid: string;
    name: string;
    description: string;
    color: string;
    tastes: Taste[];
    images: ImageModel[];
    birthday: string;
    age: Age;
    sex: Sex;
    fur: Fur;
    adopted: boolean;
    sponsored: boolean;
    admission_date: string;
    egress_date: string;
}