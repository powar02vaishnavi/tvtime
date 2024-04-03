import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesResultComponent } from './movies-result/movies-result.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { FavoriteResultComponent } from './favorite-result/favorite-result.component';
import { StorageResultComponent } from './storage-result/storage-result.component';
import { MovieModalComponent } from './movie-modal/movie-modal.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MoviesResultComponent,
    MovieItemComponent,
    FavoriteResultComponent,
    StorageResultComponent,
    MovieModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MovieModalComponent,
  ]
})
export class AppModule { }
