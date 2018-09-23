import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from '@ngx-gallery/core';
import { PostService } from '../../_services/post.service';
import { Post } from '../../_models/post';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
    public posts: any = [];
    public mainPosts: any = [];
    public galleryRef: GalleryRef = null;

    constructor(
        public postService: PostService,
        private gallery: Gallery
    ) {}

    ngOnInit() {
        this.galleryRef = this.gallery.ref('postGallery');

        this.postService.index().subscribe(posts => {
            this.posts = posts;
        });

        this.postService.index(ref => {
            return ref.limitToLast(3);
        }).subscribe(posts => {
            this.mainPosts = posts;
            this.setImages();
        });
    }

    setImages() {
        this.mainPosts.forEach(item => {
            const post = item as Post;

            this.galleryRef.addImage({
                src: post.main_image.url,
                thumb: post.main_image.url,
                title: post.title
            });
        });
    }
}
