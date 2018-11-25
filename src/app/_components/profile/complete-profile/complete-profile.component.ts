import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../_models/profile';

@Component({
    selector: 'app-complete-profile',
    templateUrl: './complete-profile.component.html',
    styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
    public profile: Profile = new Profile();

    constructor() {}

    ngOnInit() {}

    send() {}
}
