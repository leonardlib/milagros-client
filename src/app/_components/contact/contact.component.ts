import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    public lat = 21.025131;
    public lng = -101.880757;
    public zoom = 15;

    constructor() {}

    ngOnInit() {}
}
