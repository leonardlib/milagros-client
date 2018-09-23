import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';
import { PostService } from '../../_services/post.service';
import { Post } from '../../_models/post';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
    public posts: any = [];
    public images: GalleryItem[];

    constructor(
        public postService: PostService
    ) {}

    ngOnInit() {
        const x = this.postService.index();
        x.snapshotChanges().subscribe(item => {
            item.forEach(element => {
                const y = element.payload.toJSON();
                this.posts.push(y as Post);
            });

            console.log(this.posts);
        });

        console.log(this.posts);
        this.images = [
            new ImageItem({
                src: 'https://i.imgur.com/zUvzL0F.jpg',
                thumb: 'https://i.imgur.com/zUvzL0F.jpg',
                title: 'Hola'
            }),
            new ImageItem({
                src: 'https://i.imgur.com/zUvzL0F.jpg',
                thumb: 'https://i.imgur.com/zUvzL0F.jpg'
            }),
            new ImageItem({
                src: 'https://i.imgur.com/zUvzL0F.jpg',
                thumb: 'https://i.imgur.com/zUvzL0F.jpg'
            })
        ];
    }
}
