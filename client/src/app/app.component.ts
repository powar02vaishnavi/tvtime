import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { HelperService } from './utils/operations';
import { Movie } from './models/movie.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Tvtime';
  parentMovies: Movie[] = [];
  favorites: Movie[] = [];
  allMovies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private utils: HelperService,
  ) { }

  ngOnInit() { }

  searchReceiver($event) {
    this.parentMovies = $event;
  }

  reloadTab(event) {
    if (event.tab.textLabel == 'Favorites') {
      this.movieService.getAllFavorites().subscribe(
        favMovies => this.favorites = this.utils.sortByDate(favMovies),
        err => console.log(err)
      );
    } else if (event.tab.textLabel == 'Results')  {
      this.movieService.moviesTabReload()
        .subscribe(
          movies => this.parentMovies = this.utils.sortByDate(movies),
          err => console.log(err.error.message),
        );
    }else{
      this.movieService.getAllMovies()
      .subscribe(
        movies => this.allMovies = this.utils.sortByDate(movies),
        err => console.log(err.error.message)
      )
    }
  }
}
