import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {MoviesContainerComponent} from "./components/movies-container/movies-container.component";
import {MovieBoxComponent} from "./components/movies-container/movie-box/movie-box.component";
import {MoviesService} from "./services/movies.service";
import {AppRoutingModule} from "./app-routing.module";
import {MovieModalComponent} from './components/movie-modal/movie-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DescriptionFormatPipe} from "./pipes/ description-format.pipe";
import {FooterComponent} from "./components/footer/footer.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [AppComponent, HeaderComponent, MoviesContainerComponent, MovieBoxComponent, MovieModalComponent, DescriptionFormatPipe, FooterComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, MatDialogModule, BrowserAnimationsModule, FormsModule],
  providers: [MoviesService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
