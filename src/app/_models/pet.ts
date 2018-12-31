import { Taste } from './taste';
import { Age } from './age';
import { Sex } from './sex';
import { Fur } from './fur';
import { ImageModel } from './image';
import { Size } from './size';

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

    constructor() {
        this.uid = '';
        this.name = '';
        this.description = '';
        this.color = '';
        this.tastes = [];
        this.images = [];
        this.birthdate = '';
        this.age = new Age();
        this.sex = new Sex();
        this.fur = new Fur();
        this.size = new Size();
        this.adopted = false;
        this.in_adopted_process = false;
        this.sponsored = false;
        this.admission_date = '';
        this.egress_date = '';
    }
}
