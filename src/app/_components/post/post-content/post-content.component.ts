import { Component, OnInit } from '@angular/core';
import { Post } from '../../../_models/post';
import {ActivatedRoute, Router} from '@angular/router';
import { UtilsService } from '../../../_services/utils.service';
import { PostService } from '../../../_services/post.service';
import {Author} from '../../../_models/author';
import {AuthorService} from '../../../_services/author.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-post-content',
    templateUrl: './post-content.component.html',
    styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
    public post: Post = new Post();
    public description: string;

    constructor(
        private route: ActivatedRoute,
        public utilsService: UtilsService,
        public postService: PostService,
        private authorService: AuthorService
    ) {}

    ngOnInit() {
        this.description = 'Échale un vistazo a la publicación de Milagros del Rincón';

        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.postService.show(uid).subscribe(response => {
                this.post = new Post(response[0] as Post);
                this.getAuthors();
            });
        });
    }

    getAuthors() {
        this.authorService.show(this.post.author_uid).subscribe(res => {
            this.post.author = new Author(res[0] as Author);
        });
        this.authorService.show(this.post.main_image.author_uid).subscribe(res => {
            this.post.main_image.author = new Author(res[0] as Author);
        });
    }
}
