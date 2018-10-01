import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Post } from '../../../_models/post';
import { Author } from '../../../_models/author';
import {AuthorService} from '../../../_services/author.service';
import {UtilsService} from '../../../_services/utils.service';

@Component({
    selector: 'app-post-admin-form',
    templateUrl: './post-admin-form.component.html',
    styleUrls: ['./post-admin-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class PostAdminFormComponent implements OnInit {
    public post: Post = new Post();
    public authors: Author[] = [];
    public selectedAuthors: Author[] = [];
    public loading = false;

    constructor(
        private authorService: AuthorService,
        private utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.authorService.index().subscribe(authors => {
            this.authors = authors;
        });
    }
}
