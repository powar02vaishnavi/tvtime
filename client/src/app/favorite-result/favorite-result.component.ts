import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-favorite-result',
  templateUrl: './favorite-result.component.html',
  styleUrls: ['./favorite-result.component.scss']
})
export class FavoriteResultComponent implements OnInit {
  @Input() favorites: Movie[];
  constructor() { }

  ngOnInit() {
  }

}
