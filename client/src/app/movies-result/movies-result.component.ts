import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movies-result',
  templateUrl: './movies-result.component.html',
  styleUrls: ['./movies-result.component.scss']
})
export class MoviesResultComponent implements OnInit {
  @Input() movies: Movie[];

  constructor() { }

  ngOnInit() { }

  isEmpty() {
    return this.movies.length === 0;
  }
}
