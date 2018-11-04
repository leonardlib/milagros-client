import {Component, OnInit} from '@angular/core';
import {PetService} from '../../../_services/pet.service';
import {sa} from '@angular/core/src/render3';
import {UtilsService} from '../../../_services/utils.service';
import {Sex} from '../../../_models/sex';
import {Taste} from '../../../_models/taste';

@Component({
    selector: 'app-pet-home',
    templateUrl: './pet-home.component.html',
    styleUrls: ['./pet-home.component.scss']
})
export class PetHomeComponent implements OnInit {
    public pets: any = [];
    public sexs: any = [];
    public tastes: any = [];
    public sizes: any = [];
    public furs: any = [];
    public colors: any = [];
    public ageRanges: any = [];
    public ages: any = [];

    // Filters
    public selectedColor: string;
    public selectedSexs: any = [];
    public selectedTastes: any = [];
    public selectedAgeRanges: any = [];
    public selectedSizes: any = [];
    public selectedFurs: any = [];

    constructor(
        private petService: PetService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.petService.index().subscribe(pets => {
            this.pets = pets;
            this.setFilters();
        });
        this.ageRanges = [{
            min: 0,
            max: 1,
            show: true
        }, {
            min: 2,
            max: 3,
            show: false
        }, {
            min: 4,
            max: 5,
            show: false
        }, {
            min: 6,
            max: 99,
            show: false
        }];
    }

    setFilters() {
        this.utilsService.showSnackbar('Cargando...');

        this.pets.forEach(pet => {
            // Sexs
            if (this.sexs.length > 0) {
                let exists = false;

                this.sexs.forEach(savedSex => {
                    if (savedSex.name.toLowerCase() === pet.sex.name.toLowerCase()) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    this.sexs.push(pet.sex);
                }
            } else {
                this.sexs.push(pet.sex);
            }

            // Tastes
            if (this.tastes.length > 0) {
                pet.tastes.forEach(petTaste => {
                    let exists = false;

                    this.tastes.forEach(savedTaste => {
                        if (savedTaste.name.toLowerCase() === petTaste.name.toLowerCase()) {
                            exists = true;
                            return;
                        }
                    });

                    if (!exists) {
                        this.tastes.push(petTaste);
                    }
                });
            } else {
                pet.tastes.forEach(petTaste => {
                    this.tastes.push(petTaste);
                });
            }

            // Ages
            this.ages.push(pet.age.pet_age);

            // Sizes
            if (this.sizes.length > 0) {
                let exists = false;

                this.sizes.forEach(savedSize => {
                    if (savedSize.name.toLowerCase() === pet.size.name.toLowerCase()) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    this.sizes.push(pet.size);
                }
            } else {
                this.sizes.push(pet.size);
            }

            // Furs
            if (this.furs.length > 0) {
                let exists = false;

                this.furs.forEach(savedFur => {
                    if (savedFur.name.toLowerCase() === pet.fur.name.toLowerCase()) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    this.furs.push(pet.fur);
                }
            } else {
                this.furs.push(pet.fur);
            }

            // Color
            if (this.colors.length > 0) {
                let exists = false;

                this.colors.forEach(savedColor => {
                    if (savedColor === pet.color) {
                        exists = true;
                        return;
                    }
                });

                if (!exists) {
                    this.colors.push(pet.color);
                }
            } else {
                this.colors.push(pet.color);
            }
        });

        this.setAgeRanges();
    }

    setAgeRanges() {
        this.ages.forEach(petAge => {
            this.ageRanges.forEach(range => {
                if (petAge >= range.min && petAge <= range.max) {
                    range.show = true;
                    return;
                }
            });
        });
    }

    onColorClick(color: string) {
        if (this.selectedColor === color) {
            this.selectedColor = null;
        } else {
            this.selectedColor = color;
        }
    }

    searchFilteredPets() {}

    onCheckSex(sex: Sex) {
        if (this.selectedSexs.length > 0) {
            let exists = false;

            this.selectedSexs.forEach(savedSex => {
                if (sex.name.toLowerCase() === savedSex.name.toLowerCase()) {
                    exists = true;
                    return;
                }
            });

            if (!exists) {
                this.selectedSexs.push(sex);
            }
        } else {
            this.selectedSexs.push(sex);
        }

        this.searchFilteredPets();
    }
}
