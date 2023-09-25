import {AfterViewInit, Component, OnInit} from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {MushroomsService} from "./mushrooms.service";

@Component({
  selector: 'app-mushrooms-map',
  templateUrl: './mushrooms-map.component.html',
  styleUrls: ['./mushrooms-map.component.css']
})
export class MushroomsMapComponent implements OnInit, AfterViewInit {

  urlTemplate: string = 'https://tile.openstreetmap.org/level/tileX/tileY.png';

  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [58.62, 24.76],
      zoom: 8
    });
    var southWest = L.latLng(59.949509, 21.588135),
      northEast = L.latLng(57.492214, 28.311768);
    var bounds = L.latLngBounds(southWest, northEast);
    this.map.setMaxBounds(bounds);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    var myLines = [{
      "type": "LineString",
      "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
    }, {
      "type": "LineString",
      "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
    }];

    L.geoJSON(myLines);
  }

  constructor(
    private service: MushroomsService
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.initClickListeners();
  }

  ngOnInit() {
    this.getMushrooms();
  }

  onMapClick(e:any) {
    const popup = L.popup();
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(this.map);
  }

  private initClickListeners() {
    this.map.on('click', this.onMapClick.bind(this));
  }

  private getMushrooms() {
    this.service.getMushroomPoints().subscribe(mushrooms => {
      for (const mushroom of mushrooms) {
        const geoJSONPoint = L.geoJSON(mushroom).addTo(this.map);
        geoJSONPoint.bindPopup("Here you can find " + mushroom.properties.name);
      }
    })
  }

}
