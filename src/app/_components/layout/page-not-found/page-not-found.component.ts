import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
    public users: any = [];

    constructor(
        private userService: UserService
    ) {}

    ngOnInit() {
        this.userService.index().subscribe(response => {
            console.log(response);
        });
    }
}
