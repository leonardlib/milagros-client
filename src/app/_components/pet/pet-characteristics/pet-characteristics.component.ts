import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from '@ngx-gallery/core';
import { UtilsService } from '../../../_services/utils.service';

@Component({
    selector: 'app-pet-characteristics',
    templateUrl: './pet-characteristics.component.html',
    styleUrls: ['./pet-characteristics.component.scss']
})
export class PetCharacteristicsComponent implements OnInit {
    public galleryRef: GalleryRef = null;

    constructor(
        private gallery: Gallery,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.galleryRef = this.gallery.ref('petGallery');

        this.galleryRef.addImage({
            src: 'https://i.imgur.com/zUvzL0F.jpg',
            thumb: 'https://i.imgur.com/zUvzL0F.jpg'
        });

        this.galleryRef.addImage({
            src: 'https://i.imgur.com/zUvzL0F.jpg',
            thumb: 'https://i.imgur.com/zUvzL0F.jpg'
        });
    }
}
