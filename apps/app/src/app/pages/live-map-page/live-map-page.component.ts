import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-live-map-page',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './live-map-page.component.html',
  styleUrls: ['./live-map-page.component.css'],
})
export class LiveMapPageComponent {}
