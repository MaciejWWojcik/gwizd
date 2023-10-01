import { Pipe, PipeTransform } from '@angular/core';
import { MapType } from "./map-type-select.component";

@Pipe({
  name: 'getMapPath',
  standalone: true,
})
export class GetMapPathPipe implements PipeTransform {
  transform(value: MapType): string {
    const path = '/assets/images/'
    switch (value) {
      case MapType.HEATMAP: {
        return path + 'map1.png';
      }
      case MapType.DEAFULT: {
        return path + 'map3.png';
      }
    }
  }
}
