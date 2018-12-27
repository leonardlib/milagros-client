import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../_models/profile';
import {UtilsService} from '../../../_services/utils.service';
import {UserService} from '../../../_services/user.service';
import {User} from '../../../_models/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-complete-profile',
    templateUrl: './complete-profile.component.html',
    styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
    public profile: Profile = new Profile();
    public officialIdList: any = [];
    public addressFileList: any = [];
    public user: User = new User();

    constructor(
        public utilsService: UtilsService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.userService.current().then(user => {
            this.user = user;
            this.profile.name = this.user.name;
            this.profile.user_email = this.user.email;
        }).catch(error => {
            this.user = new User();
            this.profile.name = '';
            this.profile.user_email = '';
        });
    }

    send() {
        if (this.validateFiles()) {
            this.profile.official_id = this.officialIdList[0].file;
            this.profile.address_file = this.addressFileList[0].file;

            this.utilsService.showSnackbar('Guardando...');
            this.userService.saveProfile(this.profile).then(response => {
                if (response !== null) {
                    this.profile = response as Profile;
                    this.utilsService.redirect();
                } else {
                    this.utilsService.showSnackbar('Ocurrió un error al guardar la información, intenta de nuevo');
                }
            });
        } else {
            this.utilsService.showSnackbar('Completa la información por favor');
        }
    }

    validateFiles() {
        return (
            this.officialIdList.length > 0
            && this.addressFileList.length > 0
        );
    }
}
