import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Movie} from "../../../models/movie.model";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.scss']
})
export class MovieBoxComponent {
  @Input() movie: Movie = {ImageUrl: '', Description: '', Id: -1, Rating: -1, Runtime: '', Title: '', Year: -1};
  @Output() readMore: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog) {
  }

  onReadMore(): void {
    this.readMore.emit(this.movie);
  }
}
