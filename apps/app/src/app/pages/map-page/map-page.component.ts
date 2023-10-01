import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapTypeSelectComponent } from '../../components/map-type-select/map-type-select.component';
import { FiltersComponent } from "../../components/filters/filters.component";

@Component({
  selector: 'app-map-page',
  standalone: true,
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
    imports: [CommonModule, RouterModule, MapTypeSelectComponent, FiltersComponent],
})
export class MapPageComponent {}
