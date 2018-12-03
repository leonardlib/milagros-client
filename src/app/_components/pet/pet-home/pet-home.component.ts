import {Component, OnInit} from '@angular/core';
import {PetService} from '../../../_services/pet.service';
import {sa} from '@angular/core/src/render3';
import {UtilsService} from '../../../_services/utils.service';
import {Sex} from '../../../_models/sex';
import {Taste} from '../../../_models/taste';
import {Size} from '../../../_models/size';
import {Fur} from '../../../_models/fur';

@Component({
    selector: 'app-pet-home',
    templateUrl: './pet-home.component.html',
    styleUrls: ['./pet-home.component.scss']
})
export class PetHomeComponent implements OnInit {
    public pets: any = [];
    public tempPets: any = [];
    public sexs: any = [];
    public tastes: any = [];
    public sizes: any = [];
    public furs: any = [];
    public colors: any = [];
    public ageRanges: any = [];
    public ages: any = [];
    public term: any;

    // Filters
    public selectedColor: string;
    public selectedSex: Sex = new Sex();
    public selectedTastes: any = [];
    public selectedAgeRange: any = {
        min: null,
        max: null,
        show: false
    };
    public selectedSize: Size = new Size();
    public selectedFur: Fur = new Fur();

    constructor(
        private petService: PetService,
        public utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.utilsService.showSnackbar('Cargando...');
        this.petService.index().subscribe(pets => {
            this.pets = pets;
            this.tempPets = [...pets];
            this.setFilters();
        });
    }

    setFilters() {
        this.utilsService.showSnackbar('Cargando...');

        this.pets.forEach(pet => {
            // Sexs
            if (!this.utilsService.checkIfExists(this.sexs, pet.sex, 'name')) {
                this.sexs.push(pet.sex);
            }

            // Tastes
            if (this.tastes.length > 0) {
                pet.tastes.forEach(petTaste => {
                    if (!this.utilsService.checkIfExists(this.tastes, petTaste, 'name')) {
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
            if (!this.utilsService.checkIfExists(this.sizes, pet.size, 'name')) {
                this.sizes.push(pet.size);
            }

            // Furs
            if (!this.utilsService.checkIfExists(this.furs, pet.fur, 'name')) {
                this.furs.push(pet.fur);
            }

            // Color
            if (!this.utilsService.checkIfExists(this.colors, pet.color, '', false)) {
                this.colors.push(pet.color);
            }
        });

        this.setAgeRanges();
    }

    setAgeRanges() {
        this.ageRanges = [{
            min: 0,
            max: 1,
            show: false
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

        this.ages.forEach(petAge => {
            this.ageRanges.forEach(range => {
                if (petAge >= range.min && petAge <= range.max) {
                    range.show = true;
                    return;
                }
            });
        });
    }

    filterPets() {
        this.pets = this.tempPets;

        // Sex
        if (this.selectedSex.name && this.selectedSex.name !== '') {
            this.pets = this.pets.filter(pet => pet.sex.name === this.selectedSex.name);
        }

        // Tastes
        if (this.selectedTastes.length > 0) {
            this.selectedTastes.forEach(savedTaste => {
                this.pets = this.pets.filter(pet => {
                    let equal = false;

                    pet.tastes.forEach(petTaste => {
                        if (savedTaste.name.toLowerCase() === petTaste.name.toLowerCase()) {
                            equal = true;
                            return;
                        }
                    });

                    return equal;
                });
            });
        }

        // Age range
        if (this.selectedAgeRange.min) {
            this.pets = this.pets.filter(pet => (pet.age.pet_age >= this.selectedAgeRange.min && pet.age.pet_age <= this.selectedAgeRange.max));
        }

        // Size
        if (this.selectedSize.name && this.selectedSize.name !== '') {
            this.pets = this.pets.filter(pet => pet.size.name === this.selectedSize.name);
        }

        // Fur
        if (this.selectedFur.name && this.selectedFur.name !== '') {
            this.pets = this.pets.filter(pet => pet.fur.name === this.selectedFur.name);
        }

        // Color
        if (this.selectedColor && this.selectedColor !== '') {
            this.pets = this.pets.filter(pet => pet.color === this.selectedColor);
        }
    }

    onCheckSex(sex: Sex) {
        if (this.selectedSex.name.toLowerCase() === sex.name.toLowerCase()) {
            this.selectedSex = new Sex();
        } else {
            this.selectedSex = sex;
        }

        this.filterPets();
    }

    onCheckTaste(taste: Taste, checked: boolean) {
        if (checked) {
            if (!this.utilsService.checkIfExists(this.selectedTastes, taste, 'name')) {
                this.selectedTastes.push(taste);
            }
        } else {
            this.utilsService.removeIfExists(this.selectedTastes, taste, 'name');
        }

        this.filterPets();
    }

    onCheckAgeRange(ageRange: any) {
        if (this.selectedAgeRange.min === ageRange.min) {
            this.selectedAgeRange = {
                min: null,
                max: null,
                show: false
            };
        } else {
            this.selectedAgeRange = ageRange;
        }

        this.filterPets();
    }

    onCheckSize(size: Size) {
        if (this.selectedSize.name.toLowerCase() === size.name.toLowerCase()) {
            this.selectedSize = new Size();
        } else {
            this.selectedSize = size;
        }

        this.filterPets();
    }

    onCheckFur(fur: Fur) {
        if (this.selectedFur.name.toLowerCase() === fur.name.toLowerCase()) {
            this.selectedFur = new Fur();
        } else {
            this.selectedFur = fur;
        }

        this.filterPets();
    }

    onColorClick(color: string) {
        if (this.selectedColor === color) {
            this.selectedColor = null;
        } else {
            this.selectedColor = color;
        }

        this.filterPets();
    }
}
