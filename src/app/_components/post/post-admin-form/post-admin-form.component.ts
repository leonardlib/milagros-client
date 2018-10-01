import { Component, OnInit } from '@angular/core';
import { Post } from '../../../_models/post';
import { Author } from '../../../_models/author';

@Component({
    selector: 'app-post-admin-form',
    templateUrl: './post-admin-form.component.html',
    styleUrls: ['./post-admin-form.component.scss']
})
export class PostAdminFormComponent implements OnInit {
    public post: Post = new Post();
    public authors: Author[] = [];
    public selectedAuthors: Author[] = [];

    constructor() {}

    ngOnInit() {}
}
