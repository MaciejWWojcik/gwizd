import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { environment } from 'apps/app/src/environments/environment';
import * as L from 'leaflet';
import { tap } from 'rxjs';
import {
  AnimalEvent,
  AnimalType,
  ViewBoxCords,
} from '../../services/api.service';
import { MapService } from '../../services/map.service';
import { AnimalIcons } from '../map/map.component';
import { TrendMapStore } from './trend-map.store';

type MapLayers = [L.Marker, ...L.Circle[]];

const POINT_LIFESPAN = 1000 * 60 * 1;
const POINT_OPACITY = 0.25;
const POINT_FILL = '#FF5353';
const REFRESH_INTERVAL = 1000;

@Component({
  selector: 'app-trend-map',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule, MatButtonModule],
  templateUrl: './trend-map.component.html',
  styleUrls: ['./trend-map.component.scss'],
  providers: [TrendMapStore],
})
export class TrendMapComponent implements AfterViewInit {
  @Input() center: L.LatLngExpression = [50.049683, 19.944544];
  @Input() zoom = 13;

  map!: L.Map;

  readonly vm$ = this.mapStore.vm$.pipe(
    tap((vm) => {
      this.clearPoints();
      this.drawPoints(vm.events);
      console.log(vm.events);
    })
  );

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
    private readonly mapStore: TrendMapStore,
    private readonly mapService: MapService
  ) {
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

      this.mapStore.loadData(this.viewboxCords);
    }, 0);
  }

  onPlay(): void {
    this.mapStore.play();
  }

  onPause(): void {
    this.mapStore.pause();
  }

  setFrame(frame: any): void {
    this.mapStore.setFrame(frame);
  }

  private addHotspot(center: L.LatLngExpression): L.Circle[] {
    const radiuses: number[] = [200, 500, 800, 1100];

    const circles = radiuses.map((radius) =>
      L.circle(center, {
        color: 'transparent',
        fillColor: POINT_FILL,
        fillOpacity: POINT_OPACITY,
        radius: radius,
      })
    );
    circles.forEach((e) => e.addTo(this.map));
    return circles;
  }

  private addMarker(type: AnimalType, cords: L.LatLngExpression): L.Marker {
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
      .filter((event) => !this.layers.has(event.id))
      .forEach((event) => {
        const center: L.LatLngExpression = [event.lat, event.lng];
        const layers: MapLayers = [
          this.addMarker(event.type, center),
          ...this.addHotspot(center),
        ];

        this.layers.set(event.id, layers);
      });
  }

  private clearPoints(): void {
    this.layers.forEach((layers) => {
      layers.forEach((layer) => this.map.removeLayer(layer));
    });
    this.layers.clear();
  }
}
