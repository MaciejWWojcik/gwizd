import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, debounceTime, map, switchMap, tap } from 'rxjs';
import {
  AnimalEvent,
  AnimalType,
  ApiService,
  ViewBoxCords,
} from '../../services/api.service';
import { FiltersStore } from '../filters/filters.store';

interface EventMeta {
  expired?: boolean;
}

interface MapState {
  events: (AnimalEvent & EventMeta)[];
}

const initialState: MapState = {
  events: [],
};

@Injectable()
export class MapStore extends ComponentStore<MapState> {
  constructor(
    private readonly api: ApiService,
    private readonly filters: FiltersStore
  ) {
    super(initialState);
  }

  readonly vm$ = this.select((state) => ({
    events: state.events.filter((e) => !e.expired),
  }));

  readonly markAsExpired = this.updater((state, id: string) => {
    const events = state.events.map((event) =>
      event.id === id ? { ...event, expired: true } : event
    );

    return { ...state, events };
  });

  readonly loadData = this.effect((trigger$: Observable<ViewBoxCords>) =>
    trigger$.pipe(
      debounceTime(200),
      switchMap((viewbox) =>
        this.filters.currentFilters.pipe(
          map((filters) => ({ viewbox, filters }))
        )
      ),
      switchMap(({ filters, viewbox }) =>
        this.api.getEvents(
          viewbox,
          filters.currentAnimalKind ?? AnimalType.All,
          filters.currentAnimalSpecie
        )
      ),
      tap((events) => this.patchState({ events }))
    )
  );
}
