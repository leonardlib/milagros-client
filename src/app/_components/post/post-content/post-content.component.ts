import { Component, OnInit } from '@angular/core';
import { Post } from '../../../_models/post';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../_services/utils.service';
import { PostService } from '../../../_services/post.service';
import { ShareButtons } from '@ngx-share/core';

@Component({
    selector: 'app-post-content',
    templateUrl: './post-content.component.html',
    styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
    public post: Post = new Post();

    constructor(
        private route: ActivatedRoute,
        public utilsService: UtilsService,
        public postService: PostService,
        public share: ShareButtons
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.postService.show(uid).subscribe(response => {
                this.post = response[0] as Post;
            });
        });
    }
}
