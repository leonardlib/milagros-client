import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Milagros del Rincón';

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.scrollToTop();
    }

    scrollToTop() {
        this.router.events.subscribe(event => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            window.scrollTo(0, 0);
        });
    }
}
