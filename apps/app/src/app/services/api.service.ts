import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface ViewBoxCords {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export interface AnimalTrendEvent {
  timestamp: Date;
  events: AnimalEvent[];
}
export interface AnimalEvent {
  id: string;
  lat: number;
  lng: number;
  type: AnimalType;
  created: Date;
  radius?: number;
  weight?: number;
  animals: {
    kind: string;
  }[];
}

export type TrendResponse = {
  id: string;
  timestamp: string;
  animals: any[];
  center: {
    x: number;
    y: number;
  };
  radius: number;
  weight: number;
}[][];

export interface GetLiveResponse {
  clusters: {
    id: string;
    timestamp: string;
    animals: any[];
    center: {
      x: number;
      y: number;
    };
    radius: number;
    weight: number;
  }[];
}

export enum AnimalType {
  All = 'all',
  Wild = 'wild',
  Domestic = 'domestic',
  Exotic = 'exotic',
}

const generateMockAnimals = (
  idOffset: number,
  offset: number
): AnimalEvent[] => {
  const mockAnimals: AnimalEvent[] = [];

  for (let i = 0; i < 4; i++) {
    mockAnimals.push({
      id: `${idOffset + i}`,
      lat: 50.049683 + i * 0.02 + offset,
      lng: 19.944544 + i * 0.02 + offset,
      type: i % 2 === 0 ? AnimalType.Wild : AnimalType.Domestic,
      created: new Date(),
      animals: [],
    });
  }

  return mockAnimals;
};

const generateMockTrend = (): AnimalTrendEvent[] => {
  const mock: AnimalTrendEvent[] = [];

  for (let i = 0; i < 30; i++) {
    const timestamp = new Date(new Date().getTime() + i * 1000 * 60 * 60 * 24);
    const events = generateMockAnimals(i * 4, i * 0.001);
    mock.push({ timestamp, events });
  }

  return mock;
};

const MOCK_TREND: AnimalTrendEvent[] = generateMockTrend();
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly base = 'https://hackyeah.xsw22wsx.dev';

  constructor(private readonly http: HttpClient) {}

  getEvents(
    viewbox: ViewBoxCords,
    type: AnimalType,
    spiecie?: string
  ): Observable<AnimalEvent[]> {
    return this.http
      .post<GetLiveResponse>(`${this.base}/map`, {
        area: toArea(viewbox),
        kind: toKind(type),
        spiecie,
      })
      .pipe(
        map((data) =>
          data.clusters.map((item) => ({
            ...item,
            lat: item.center.x,
            lng: item.center.y,
            type,
            created: new Date(),
          }))
        )
      );
  }

  getTrend(
    viewbox: ViewBoxCords,
    from: Date,
    to: Date
  ): Observable<AnimalTrendEvent[]> {
    // return of(MOCK_TREND).pipe(delay(100));

    return this.http
      .post<TrendResponse>(`${this.base}/trends/map`, {
        timestampStartEpochMilisInclusive: 1696145523305,
        intervalInMilis: 86400000,
        iterationTimes: 30,
        area: toArea(viewbox),
      })
      .pipe(
        map((data) =>
          data.map((row, day) => ({
            timestamp: new Date(
              new Date().getTime() - (30 - day) * 1000 * 60 * 60 * 24
            ),
            events: row.map((item) => ({
              ...item,
              lat: item.center.x,
              lng: item.center.y,
              type: AnimalType.All,
              created: new Date(
                new Date().getTime() - (30 - day) * 1000 * 60 * 60 * 24
              ),
            })),
          }))
        )
      );
  }
}

const toArea = (viewbox: ViewBoxCords) => ({
  a: {
    x: viewbox.startLat,
    y: viewbox.startLng,
  },
  b: {
    x: viewbox.endLat,
    y: viewbox.endLng,
  },
});

const toKind = (type: AnimalType) =>
  type === AnimalType.All ? undefined : type;
