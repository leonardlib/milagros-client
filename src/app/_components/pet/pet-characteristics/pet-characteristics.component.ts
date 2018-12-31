import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from '@ngx-gallery/core';
import { UtilsService } from '../../../_services/utils.service';
import {ActivatedRoute} from '@angular/router';
import {PetService} from '../../../_services/pet.service';
import {Pet} from '../../../_models/pet';

@Component({
    selector: 'app-pet-characteristics',
    templateUrl: './pet-characteristics.component.html',
    styleUrls: ['./pet-characteristics.component.scss']
})
export class PetCharacteristicsComponent implements OnInit {
    public galleryRef: GalleryRef = null;
    public pet: Pet = new Pet();
    public contain: any;

    constructor(
        private gallery: Gallery,
        public utilsService: UtilsService,
        private route: ActivatedRoute,
        public petService: PetService
    ) {}

    ngOnInit() {
        this.galleryRef = this.gallery.ref('petGallery');

        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.petService.show(uid).subscribe(response => {
                this.pet = response[0] as Pet;
                this.setImages();
            });
        });
    }

    setImages() {
        this.pet.images.forEach(image => {
            this.galleryRef.addImage({
                src: image.url,
                thumb: image.url
            });
        });
    }
}
