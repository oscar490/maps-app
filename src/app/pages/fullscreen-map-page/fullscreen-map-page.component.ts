import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from "@angular/core";
import {Map, setWorkerUrl} from 'maplibre-gl';

declare const maplibregl: any;


@Component({
  selector: 'fullscreen',
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
    div {
      widht: 100vw;
      height: calc(100vh - 64px);
    }
  `
})

export class FullScreenMapPageComponent implements AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (!this.mapContainer.nativeElement) {
      return;
    }

    const map = new maplibregl.Map({
      container: this.mapContainer?.nativeElement,
      style: 'https://tiles.openfreemap.org/styles/liberty', 
      center: [-6.3539, 36.7789], // Madrid, España [Longitud, Latitud]
      zoom: 9
    });
  }
  
}
