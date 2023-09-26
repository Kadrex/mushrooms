import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MushroomsMapComponent } from './mushrooms-map/mushrooms-map.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule} from '@angular/material/dialog';
import { AddMushroomPointDialogComponent } from './add-mushroom-point-dialog/add-mushroom-point-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MushroomsMapComponent,
    AddMushroomPointDialogComponent,
  ],
    imports: [
      BrowserModule, HttpClientModule, MatDialogModule, NoopAnimationsModule,
      MatInputModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
      MatButtonModule, MatSnackBarModule, MatSlideToggleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
