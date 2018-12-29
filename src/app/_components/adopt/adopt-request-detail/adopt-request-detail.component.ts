import {Component, OnInit} from '@angular/core';
import {Pet} from '../../../_models/pet';
import {AdoptRequest} from '../../../_models/adopt-request';
import {User} from '../../../_models/user';
import {UtilsService} from '../../../_services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PetService} from '../../../_services/pet.service';
import {UserService} from '../../../_services/user.service';
import {AdoptRequestService} from '../../../_services/adopt-request.service';
import {Gallery, GalleryRef} from '@ngx-gallery/core';
import {Profile} from '../../../_models/profile';

@Component({
    selector: 'app-adopt-request-detail',
    templateUrl: './adopt-request-detail.component.html',
    styleUrls: ['./adopt-request-detail.component.scss']
})
export class AdoptRequestDetailComponent implements OnInit {
    public adoptRequest: AdoptRequest = new AdoptRequest();
    public user: User = new User();
    public profile: Profile = new Profile();
    public galleryRef: GalleryRef = null;
    public contain: any;

    constructor(
        public utilsService: UtilsService,
        private route: ActivatedRoute,
        private petService: PetService,
        private userService: UserService,
        private adoptRequestService: AdoptRequestService,
        private router: Router,
        private gallery: Gallery
    ) {}

    ngOnInit() {
        this.galleryRef = this.gallery.ref('petGallery');

        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.adoptRequestService.show(uid).subscribe(adoptRequests => {
                this.adoptRequest = adoptRequests[0] as AdoptRequest;

                this.petService.show(this.adoptRequest.pet_uid).subscribe(pets => {
                    this.adoptRequest['pet'] = pets[0] as Pet;
                    this.setImages();
                });

                this.userService.getProfile(this.adoptRequest.user_email).subscribe(profiles => {
                    this.profile = profiles[0] as Profile;
                });
            });
        });
    }

    setImages() {
        this.adoptRequest['pet'].images.forEach(image => {
            this.galleryRef.addImage({
                src: image.url,
                thumb: image.url
            });
        });
    }

    approveAdoptRequest() {
        console.log('GG');
    }
}
