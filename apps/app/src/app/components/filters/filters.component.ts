import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ChipSelectListComponent,
  ChipSelectOption,
} from '../../inputs/chip-select-list/chip-select-list.component';
import { AnimalType } from '../../services/api.service';
import { FiltersStore } from './filters.store';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, ChipSelectListComponent],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  public animalKindChipSelectList: ChipSelectOption[] = [
    {
      key: 'Wszystkie',
      value: '',
      chipIconSrc: '/assets/markers/all-animals.svg',
    },
    {
      key: 'Dzikie',
      value: AnimalType.Wild,
      chipIconSrc: '/assets/markers/wild-animal.svg',
    },
    {
      key: 'Domowe',
      value: AnimalType.Domestic,
      chipIconSrc: '/assets/markers/home-animal.svg',
    },
    {
      key: 'Egzotyczne',
      value: AnimalType.Exotic,
      chipIconSrc: '/assets/markers/exotic-animal.svg',
    },
  ];

  public animalSpecieChipSelectList: ChipSelectOption[] = [];

  public selectedAnimalKind: AnimalType | undefined;
  public selectedAnimalKindOption: ChipSelectOption;
  public resetSelector = {};

  constructor(private filtersStore: FiltersStore) {}

  setAnimalKind(value: string) {
    if (!value) {
      this.filtersStore.setAnimalKindFilter(undefined);
      this.selectedAnimalKind = undefined;
      this.resetSelector = {};
      return;
    }

    const animalKind: AnimalType = value as AnimalType;
    this.selectedAnimalKind = animalKind;
    this.filtersStore.setAnimalKindFilter(animalKind);
    this.resetSelector = {};

    switch (animalKind) {
      case AnimalType.Wild: {
        this.animalSpecieChipSelectList = [
          { key: 'Lis', value: 'fox' },
          { key: 'Dzik', value: 'boar' },
          { key: 'Niedźwiedź', value: 'bear' },
        ];
        break;
      }
      case AnimalType.Domestic: {
        this.animalSpecieChipSelectList = [
          { key: 'Pies', value: 'dog' },
          { key: 'Kot', value: 'cat' },
          { key: 'Rybka', value: 'fish' },
        ];
        break;
      }
      case AnimalType.Exotic: {
        this.animalSpecieChipSelectList = [
          { key: 'Papuga', value: 'parrot' },
          { key: 'Wąż', value: 'snake' },
        ];
      }
    }
  }

  setAnimalSpecie(value: string) {
    this.filtersStore.setAnimalSpecieFilter(value);
  }
}
