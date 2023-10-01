import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TrendMapComponent } from '../../components/trend-map/trend-map.component';

@Component({
  selector: 'app-trend-map-page',
  standalone: true,
  imports: [CommonModule, TrendMapComponent],
  templateUrl: './trend-map-page.component.html',
  styleUrls: ['./trend-map-page.component.css'],
})
export class TrendMapPageComponent {}
