import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from '@ngx-gallery/core';
import { PostService } from '../../_services/post.service';
import { Post } from '../../_models/post';
import {PetService} from '../../_services/pet.service';
import {Pet} from '../../_models/pet';
import {UtilsService} from '../../_services/utils.service';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
    public posts: any = [];
    public pets: any = [];
    public mainPosts: any = [];
    public mainPets: any = [];
    public galleryRef: GalleryRef = null;

    constructor(
        public postService: PostService,
        public petService: PetService,
        private gallery: Gallery
    ) {}

    ngOnInit() {
        this.galleryRef = this.gallery.ref('postGallery');

        this.postService.index().subscribe(posts => {
            this.posts = posts;
        });

        this.petService.index().subscribe(pets => {
            this.pets = pets;
        });

        this.postService.index(ref => {
            return ref.limitToLast(3);
        }).subscribe(posts => {
            this.mainPosts = posts;

            if (this.mainPosts.length > 0) {
                this.setImages('posts');
            }
        });

        this.petService.index(ref => {
            return ref.limitToLast(3);
        }).subscribe(pets => {
            this.mainPets = pets;

            if (this.mainPets.length > 0) {
                this.setImages('pets');
            }
        });
    }

    setImages(arg: string) {
        if (arg === 'posts') {
            this.mainPosts.forEach(item => {
                const post = item as Post;

                this.galleryRef.addImage({
                    src: post.main_image.url,
                    thumb: post.main_image.url,
                    title: post.title,
                    uid: post.uid,
                    type: 'post'
                });
            });
        }

        if (arg === 'pets') {
            this.mainPets.forEach(item => {
                const pet = item as Pet;

                this.galleryRef.addImage({
                    src: pet.images[0].url,
                    thumb: pet.images[0].url,
                    title: pet.name,
                    uid: pet.uid,
                    type: 'pet'
                });
            });
        }
    }
}
