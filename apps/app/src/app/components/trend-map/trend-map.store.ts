import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, interval, switchMap, takeWhile, tap } from 'rxjs';
import {
  AnimalTrendEvent,
  ApiService,
  ViewBoxCords,
} from '../../services/api.service';

interface TrendMapState {
  events: AnimalTrendEvent[];
  currentFrame: number;
  playing: boolean;
}

const initialState: TrendMapState = {
  events: [],
  currentFrame: 0,
  playing: false,
};

@Injectable()
export class TrendMapStore extends ComponentStore<TrendMapState> {
  private readonly from = new Date(
    new Date().getTime() - 30 * 24 * 60 * 60 * 1000
  );
  private readonly to = new Date();

  constructor(private readonly api: ApiService) {
    super(initialState);
  }

  readonly vm$ = this.select((state) => ({
    events: state.events[state.currentFrame]?.events ?? [],
    timestamp: state.events[state.currentFrame]?.timestamp ?? new Date(),
    currentFrame: state.currentFrame,
    totalFrames: state.events.length,
    frames: Array(state.events.length)
      .fill(0)
      .map((_, i) => ({ frame: i, timestamp: state.events[i]?.timestamp })),
    playing: state.playing,
  }));

  readonly loadData = this.effect((trigger$: Observable<ViewBoxCords>) =>
    trigger$.pipe(
      switchMap((viewbox) => this.api.getTrend(viewbox, this.from, this.to)),
      tap((events) =>
        this.patchState({
          events,
          currentFrame: 0,
        })
      )
    )
  );

  readonly play = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.patchState({ playing: true })),
      switchMap(() =>
        interval(300).pipe(takeWhile(() => this.get().playing === true))
      ),
      tap(() => {
        const nextFrame = this.get().currentFrame + 1;
        if (nextFrame >= this.get().events.length) {
          this.patchState({ playing: false });
        } else {
          this.patchState({ currentFrame: this.get().currentFrame + 1 });
        }
      })
    )
  );

  readonly pause = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(tap(() => this.patchState({ playing: false })))
  );

  readonly setFrame = this.effect((trigger$: Observable<number>) =>
    trigger$.pipe(tap((frame) => this.patchState({ currentFrame: frame })))
  );
}
