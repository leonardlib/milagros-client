import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../_models/profile';
import {User} from '../../../_models/user';
import {UtilsService} from '../../../_services/utils.service';
import {UserService} from '../../../_services/user.service';

@Component({
    selector: 'app-profile-personal-info',
    templateUrl: './profile-personal-info.component.html',
    styleUrls: ['./profile-personal-info.component.scss']
})
export class ProfilePersonalInfoComponent implements OnInit {
    public profile: Profile = new Profile();
    public officialIdList: any = [];
    public addressFileList: any = [];
    public user: User = new User();
    public editar: boolean;

    constructor(
        public utilsService: UtilsService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.userService.current().then(user => {
            this.user = user;

            this.userService.getProfile(this.user.email).subscribe(profiles => {
                if (profiles.length > 0) {
                    this.profile = profiles[0] as Profile;
                    this.getFiles();
                    this.editar = true;
                } else {
                    this.editar = false;
                }
            });
        });
    }

    getFiles() {
        this.utilsService.getFilePreview(this.profile.official_id, 'official_id').then(res => {
            this.officialIdList[0] = res;
        });
        this.utilsService.getFilePreview(this.profile.address_file, 'address_file').then(res => {
            this.addressFileList[0] = res;
        });
    }

    setFiles() {
        if (this.editar) {
            this.profile['new_oid'] = this.officialIdList[0].file;
            this.profile['new_adf'] = this.addressFileList[0].file;
        } else {
            this.profile.official_id = this.officialIdList[0].file;
            this.profile.address_file = this.addressFileList[0].file;
        }
    }

    send() {
        if (this.validateFiles()) {
            this.setFiles();
            this.utilsService.showSnackbar('Guardando...');

            if (this.editar) {
                this.userService.updateProfile(this.profile).then(response => {
                    if (response !== null) {
                        this.profile = response as Profile;
                        this.utilsService.showSnackbar('Se guardó la información');
                    } else {
                        this.utilsService.showSnackbar('Ocurrió un error al guardar la información, intenta de nuevo');
                    }
                });
            } else {
                this.userService.saveProfile(this.profile).then(response => {
                    if (response !== null) {
                        this.profile = response as Profile;
                        this.utilsService.showSnackbar('Se guardó la información');
                    } else {
                        this.utilsService.showSnackbar('Ocurrió un error al guardar la información, intenta de nuevo');
                    }
                });
            }
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
