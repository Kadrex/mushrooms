import {AfterViewInit, Component, OnInit} from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {MushroomsService} from "./mushrooms.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddMushroomPointDialogComponent} from "../add-mushroom-point-dialog/add-mushroom-point-dialog.component";
import {LatLng} from "../models/latLng";
import {MushroomDialogResult} from "../models/mushroomDialogResult";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-mushrooms-map',
  templateUrl: './mushrooms-map.component.html',
  styleUrls: ['./mushrooms-map.component.css']
})
export class MushroomsMapComponent implements OnInit, AfterViewInit {

  urlTemplate: string = 'https://tile.openstreetmap.org/level/tileX/tileY.png';

  private map: any;
  private currentLatLng: LatLng | undefined;

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
    private service: MushroomsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.initClickListeners();
  }

  ngOnInit() {
    this.getMushrooms();
  }

  async add() {
    const dialogConf: MatDialogConfig = {
      data: this.currentLatLng
    };
    const result: MushroomDialogResult = await this.dialog.open(AddMushroomPointDialogComponent, dialogConf).afterClosed().toPromise();
    if (!result) return;

    // @ts-ignore
    this.service.save(result, this.currentLatLng).subscribe((success) => {
      this.showMessage('Successfully saved a new mushroom point!');
      this.getMushrooms();
    }, error => {
      this.showMessage('Failed to save the mushroom. Sorry!')
    });
  }

  onMapClick(e:any) {
    this.currentLatLng = e.latlng;
    const popup = L.popup();
    popup
      .setLatLng(e.latlng)
      .setContent("Add a mushroom point here <button id='addNewBtn'>Add</button><br>" + e.latlng.toString())
      .openOn(this.map);

    // @ts-ignore
    document.getElementById('addNewBtn').addEventListener('click', (e) => {
      this.add();
    });
  }

  private initClickListeners() {
    this.map.on('click', this.onMapClick.bind(this));
  }

  private getMushrooms() {
    this.service.getMushroomPoints().subscribe(mushrooms => {
      for (const mushroom of mushrooms) {
        const geoJSONPoint = L.geoJSON(mushroom).addTo(this.map);
        let popupContent = "Here you can find " + mushroom.properties.name;
        if (mushroom.properties.details?.length) {
          popupContent += "<br>Details: " + mushroom.properties.details;
        }
        geoJSONPoint.bindPopup(popupContent);
      }
    }, error => {
      this.showMessage('Failed to load the mushrooms. Sorry!')
    })
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'OK', {duration: 4000});
  }

}
