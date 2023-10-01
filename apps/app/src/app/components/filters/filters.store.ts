import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AnimalType } from '../../services/api.service';

interface FiltersState {
  currentAnimalKind: AnimalType | undefined;
  currentAnimalSpecie: string | undefined;
}

const initialState: FiltersState = {
  currentAnimalKind: undefined,
  currentAnimalSpecie: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class FiltersStore extends ComponentStore<FiltersState> {
  constructor() {
    super(initialState);
  }

  readonly currentFilters = this.select((state) => ({
    currentAnimalKind: state.currentAnimalKind,
    currentAnimalSpecie: state.currentAnimalSpecie,
  }));

  readonly setAnimalKindFilter = this.updater(
    (state, animalKind: AnimalType | undefined) => ({
      ...state,
      currentAnimalKind: animalKind,
    })
  );

  readonly setAnimalSpecieFilter = this.updater(
    (state, animalSpecie: string | undefined) => ({
      ...state,
      currentAnimalSpecie: animalSpecie,
    })
  );
}
