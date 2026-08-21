import { AfterViewInit, Component, ElementRef, signal, ViewChild } from "@angular/core";
import {v4 as UuidV4} from 'uuid';

declare const maplibregl: any;

interface Marker {
  id: string,
  marker: any
}

@Component({
  selector: 'markers',
  templateUrl: './markers-page.component.html'
})

export class MarkersPageComponent  implements AfterViewInit{
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
  map!: any;
  markers = signal<Marker[]>([]);


  ngAfterViewInit(): void {
     if (!this.mapContainer.nativeElement) {
      return;
    }


    const map = new maplibregl.Map({
      container: this.mapContainer?.nativeElement,
      style: 'https://tiles.openfreemap.org/styles/liberty', 
      center: [-6.355662, 36.770446], // Madrid, España [Longitud, Latitud]
      zoom: 14
    });

    /*
    const market = new maplibregl.Marker({draggable: false, color: 'red'})
      .setLngLat([-6.355662, 36.770446])
      .addTo(map);

    market.on('dragend', (event: any) => {
      console.log(event);
    })
    */

    this.mapListeners(map);
  }

  mapListeners(map: any) {

    map.on('click', (event: any) => this.mapClick(event));

    this.map = map;

  }

  mapClick(event: any) {

    if (!this.map) {
      return;
    }

    const marker = new maplibregl.Marker({draggable: false, color: 'red'})
      .setLngLat(event.lngLat)
      .addTo(this.map);

    const newMarker: Marker = {
      id: UuidV4(),
      marker: marker
    }

    this.markers.update(markers => [newMarker, ...markers]);

    console.log(this.markers());
   
  }


}
