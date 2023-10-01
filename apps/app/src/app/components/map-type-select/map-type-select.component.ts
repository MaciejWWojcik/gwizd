import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetMapPathPipe } from './get-map-path.pipe';

export enum MapType {
  DEAFULT = 'Default',
  HEATMAP = 'HeatMap',
}

@Component({
  selector: 'app-map-type-select',
  standalone: true,
  imports: [CommonModule, GetMapPathPipe, RouterModule],
  templateUrl: './map-type-select.component.html',
  styleUrls: ['./map-type-select.component.scss'],
})
export class MapTypeSelectComponent implements OnInit {
  public selectedMapType: MapType = MapType.DEAFULT;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedMapType = this.router.url.split('/').slice(-1)[0] === 'live' ? MapType.DEAFULT : MapType.HEATMAP
  }

  toggleMapType() {
    this.selectedMapType = this.selectedMapType === MapType.DEAFULT ? MapType.HEATMAP : MapType.DEAFULT;
    this.router.navigate([this.selectedMapType === MapType.DEAFULT ? './live' : './trend'], { relativeTo: this.route })
  }
}
