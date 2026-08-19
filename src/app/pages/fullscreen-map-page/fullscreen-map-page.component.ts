import { DecimalPipe, JsonPipe } from "@angular/common";
import { AfterViewInit, Component, effect, ElementRef, OnInit, signal, ViewChild, viewChild } from "@angular/core";


declare const maplibregl: any;


@Component({
  selector: 'fullscreen',
  templateUrl: './fullscreen-map-page.component.html',
  imports: [DecimalPipe, JsonPipe],
  styles: `
    div {
      widht: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid;
      width: 250px
    }
  `
})

export class FullScreenMapPageComponent implements AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  map!: any;
  zoom = signal(14);
  coordinates = signal({
    lng: -6.3539, 
    lat: 36.7789
  })

  zoomEffect = effect(() => {
    const zoom = this.zoom();
    this.map?.zoomTo(zoom);
  })

  ngAfterViewInit(): void {
    if (!this.mapContainer.nativeElement) {
      return;
    }

    const {lat, lng} = this.coordinates();

    const map = new maplibregl.Map({
      container: this.mapContainer?.nativeElement,
      style: 'https://tiles.openfreemap.org/styles/liberty', 
      center: [lng, lat], // Madrid, España [Longitud, Latitud]
      zoom: this.zoom()
    });

    this.mapListeners(map);
  }

  mapListeners(map: any) {

    map.on('zoomend', (event: any) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    })

    map.on('moveend', (event: any) => {
      const center = map.getCenter();
      this.coordinates.set(center);
    })

    this.map = map;

  }
  
}
