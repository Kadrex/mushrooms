import {AfterViewInit, Component, OnInit} from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {MushroomsService} from "./mushrooms.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddMushroomPointDialogComponent} from "../add-mushroom-point-dialog/add-mushroom-point-dialog.component";
import {LatLng} from "../models/latLng";
import {MushroomDialogResult} from "../models/mushroomDialogResult";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IsItWaterService} from "../service/is-it-water.service";

@Component({
  selector: 'app-mushrooms-map',
  templateUrl: './mushrooms-map.component.html',
  styleUrls: ['./mushrooms-map.component.css']
})
export class MushroomsMapComponent implements OnInit, AfterViewInit {

  urlTemplate: string = 'https://tile.openstreetmap.org/level/tileX/tileY.png';

  private map: any;
  private currentLatLng: LatLng;

  checkWater: boolean = true;
  private loadingWaterInfo: boolean = false;

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
    private isItWaterService: IsItWaterService,
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

  async onMapClick(e:any) {
    if (this.loadingWaterInfo) return;

    this.currentLatLng = e.latlng;
    let water = this.checkWater ? await this.isWater(e.latlng) : false;

    const popupContent = this.constructPopupContent(water, e.latlng);

    const popup = L.popup();
    popup
      .setLatLng(e.latlng)
      .setContent(popupContent)
      .openOn(this.map);

    if (!water) {
      // @ts-ignore
      document.getElementById('addNewBtn').addEventListener('click', (e) => {
        this.add();
      });
    }
  }

  private async isWater(latLng: LatLng): Promise<boolean> {
    let water = false;
    this.changeCursorTo('wait');
    this.loadingWaterInfo = true;
    await this.isItWaterService.isItWater(latLng).toPromise()
      .then(result => {
        water = result?.water ?? false;
        this.changeCursorTo('grab');
        this.loadingWaterInfo = false;
      }, error => {
        // Just in case my API key expires or something.
        water = false;
        this.changeCursorTo('grab');
        this.loadingWaterInfo = false;
      });
    return water;
  }

  private constructPopupContent(water: boolean, latLng: LatLng): string {
    if (water) {
      return 'This is water.';
    } else {
      const firstLine = 'Coordinates:<br>Latitude: ' + latLng.lat + '<br>Longitude: ' + latLng.lng;
      const secondLine = 'Add a mushroom point here?';
      const buttonStyles = this.copyMatButtonStyles();
      const button = "<button style='" + buttonStyles + "' id='addNewBtn'>Add</button>";
      return firstLine + '<br><br>' + secondLine + '<br><br>' + button;
    }
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

  private changeCursorTo(cursorMode: string): void {
    document.getElementById('map').style.cursor = cursorMode;
  }

  private copyMatButtonStyles() {
    return 'box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); ' +
      'background-color: #3f51b5; ' +
      'color: #fff; ' +
      'cursor: pointer; ' +
      'border: none; ' +
      'min-width: 64px; ' +
      'line-height: 36px; ' +
      'padding: 0 16px; ' +
      'border-radius: 4px;';
  }

}
