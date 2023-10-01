import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from 'apps/app/src/environments/environment';
import * as BezierEasing from 'bezier-easing';
import * as L from 'leaflet';
import { interval, map, switchMap, tap } from 'rxjs';
import {
  AnimalEvent,
  AnimalType,
  ViewBoxCords,
} from '../../services/api.service';
import { MapService } from '../../services/map.service';
import { MapStore } from './map.store';

export const AnimalIcons: Record<AnimalType, string> = {
  [AnimalType.All]: '/assets/markers/all-animals.svg',
  [AnimalType.Wild]: '/assets/markers/wild-animal.svg',
  [AnimalType.Domestic]: '/assets/markers/home-animal.svg',
  [AnimalType.Exotic]: '/assets/markers/exotic-animal.svg',
};

type MapLayers = [L.Marker, ...L.Circle[]];

const POINT_LIFESPAN = 1000 * 60 * 2;
const POINT_OPACITY = 0.25;
const POINT_FILL = '#FF5353';
const REFRESH_INTERVAL = 1000;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapStore],
})
export class MapComponent implements AfterViewInit {
  @Input() center: L.LatLngExpression = [50.049683, 19.944544];
  @Input() zoom = 13;

  map!: L.Map;

  readonly layers: Map<string, MapLayers> = new Map<string, MapLayers>();

  get viewboxCords(): ViewBoxCords {
    const bounds = this.map.getBounds();
    const startLat = bounds.getSouthWest().lat;
    const startLng = bounds.getSouthWest().lng;
    const endLat = bounds.getNorthEast().lat;
    const endLng = bounds.getNorthEast().lng;

    return { startLat, startLng, endLat, endLng };
  }

  constructor(
    private readonly mapStore: MapStore,
    private readonly mapService: MapService
  ) {
    this.mapStore.vm$
      .pipe(
        tap((vm) => {
          this.clearPoints();
          this.drawPoints(vm.events);
        }),
        switchMap((vm) =>
          interval(REFRESH_INTERVAL).pipe(
            map(() => vm.events),
            tap((events) => this.updatePointsInTime(events))
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe();

    this.mapService.destroy();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map = L.map('map', {
        center: this.center,
        zoom: this.zoom,
      });
      this.mapService.create(this.map);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          detectRetina: true,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: environment.MAPBOX_TOKEN,
        }
      ).addTo(this.map);

      this.map.on('zoomend', () => this.mapStore.loadData(this.viewboxCords));
      this.map.on('moveend', () => this.mapStore.loadData(this.viewboxCords));
      this.mapStore.loadData(this.viewboxCords);
    }, 0);
  }

  addSingleHotspot(
    center: L.LatLngExpression,
    weight: number,
    radius: number,
    elements: { kind: string }[]
  ): L.Circle[] {
    const radiuses: number[] = [0.25, 0.5, 0.75, 1].map(
      (e) => e * radius * 30000
    );

    const circles = radiuses.map(() =>
      L.circle(center, {
        color: 'transparent',
        fillColor: POINT_FILL,
        fillOpacity: 0.75 * weight,
        radius: 0,
      })
    );
    circles.forEach((e) => e.addTo(this.map));

    const kinds = new Map<string, number>();
    elements.forEach((e) => {
      const count = kinds.get(e.kind) ?? 0;
      kinds.set(e.kind, count + 1);
    });
    const popupLines = [...kinds.entries()].map(
      (e) => `${e[0]}: <b>${e[1]}</b>`
    );
    circles[circles.length - 1].bindPopup(popupLines.join('<br>'));

    const duration = 300;
    const easing = BezierEasing(0, 0, 0.3, 0.1);
    let starttime: number;

    const animate = (timestamp: number) => {
      if (!starttime) {
        starttime = timestamp;
      }
      const runtime = timestamp - starttime;
      const progress = Math.min(runtime / duration, 1);
      const easedProgress = easing(progress);

      radiuses.map((radius, index) => {
        const animatedRadius = radius * easedProgress;
        circles[index].setRadius(animatedRadius);
      });

      if (progress >= 1) {
        return;
      }

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return circles;
  }

  addHotspot(center: L.LatLngExpression, weight: number): L.Circle[] {
    const radiuses: number[] = [200, 500, 800, 1100];

    const circles = radiuses.map(() =>
      L.circle(center, {
        color: 'transparent',
        fillColor: POINT_FILL,
        fillOpacity: POINT_OPACITY * weight,
        radius: 0,
      })
    );
    circles.forEach((e) => e.addTo(this.map));

    const duration = 300;
    const easing = BezierEasing(0, 0, 0.3, 0.1);
    let starttime: number;

    const animate = (timestamp: number) => {
      if (!starttime) {
        starttime = timestamp;
      }
      const runtime = timestamp - starttime;
      const progress = Math.min(runtime / duration, 1);
      const easedProgress = easing(progress);

      radiuses.map((radius, index) => {
        const animatedRadius = radius * easedProgress;
        circles[index].setRadius(animatedRadius);
      });

      if (progress >= 1) {
        return;
      }

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return circles;
  }

  addMarker(type: AnimalType, cords: L.LatLngExpression): L.Marker {
    const icon = L.icon({
      iconUrl: AnimalIcons[type],
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    const marker = L.marker(cords, { icon });
    marker.addTo(this.map);

    return marker;
  }

  private drawPoints(events: AnimalEvent[]): void {
    events
      .filter((event) => !this.layers.has(event.id) && !this.isExpired(event))
      .forEach((event) => {
        const center: L.LatLngExpression = [event.lat, event.lng];
        const layers: MapLayers = [
          this.addMarker(event.type, center),
          // ...this.addHotspot(center, event.weight ?? 1),
          ...this.addSingleHotspot(
            center,
            event.weight ?? 1,
            event.radius ?? 0,
            event.animals ?? []
          ),
        ];

        this.layers.set(event.id, layers);
      });
  }

  private updatePointsInTime(events: AnimalEvent[]): void {
    events.forEach((event) => {
      const created = event.created.getTime();
      const now = new Date().getTime();
      const expired = this.isExpired(event);
      // const fillOpacity =
      //   POINT_OPACITY * (1 - (now - created) / POINT_LIFESPAN);

      const fillOpacity =
        0.75 * (event.weight ?? 1) * (1 - (now - created) / POINT_LIFESPAN);

      const layers = this.layers.get(event.id) ?? [];
      const [marker, ...hotspots] = layers;

      if (expired) {
        layers.forEach((layer) => this.map.removeLayer(layer));
        this.layers.delete(event.id);
        this.mapStore.markAsExpired(event.id);
      } else {
        hotspots.forEach((circle) => circle.setStyle({ fillOpacity }));
      }
    });
  }

  private isExpired(event: AnimalEvent): boolean {
    const created = event.created.getTime();
    const now = new Date().getTime();

    return now - created > POINT_LIFESPAN;
  }

  private clearPoints(): void {
    this.layers.forEach((layers) => {
      layers.forEach((layer) => this.map.removeLayer(layer));
    });
    this.layers.clear();
  }
}
