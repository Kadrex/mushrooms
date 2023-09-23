import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {MushroomsService} from "./mushrooms.service";

@Component({
  selector: 'app-mushrooms-map',
  templateUrl: './mushrooms-map.component.html',
  styleUrls: ['./mushrooms-map.component.css']
})
export class MushroomsMapComponent implements OnInit {

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
  }

  constructor(
    private service: MushroomsService
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit() {
    this.getMushrooms();
  }

  private getMushrooms() {
    this.service.getMushroomPoints().subscribe(mushrooms => {
      for (const mushroom of mushrooms) {
        var marker = L.marker([mushroom.xcoordinates, mushroom.ycoordinates]).addTo(this.map);
        marker.bindPopup("Here you can find " + mushroom.type);
      }
    })
  }

}
