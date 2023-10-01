import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: L.Map | null = null;

  create(map: L.Map) {
    this.map = map;
  }

  destroy() {
    if (this.map) {
      this.map.off();
      this.map.remove();
      this.map = null;
    }
  }
}
