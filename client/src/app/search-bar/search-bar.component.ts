import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../movie.service';
import { HelperService } from '../utils/operations';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchOutput = new EventEmitter<any>();

  messageError = '';
  error = false;
  loading = false;

  constructor(
    private movieService: MovieService,
    private utils: HelperService,
  ) { }

  ngOnInit() { }

  searchMovie(searchValue: string) {
    this.loading = true;
    this.movieService.searchMovies(searchValue).subscribe(
      movies => {
        let orderedMovies = this.utils.sortByDate(movies);
        this.searchOutput.emit(orderedMovies);
        this.error = false;
        this.loading = false;
      },
      err => {
        this.handleError(err);
        this.loading = false;
        this.movieService.updateLastSuccess(false);
      },
      () => this.movieService.updateLastSuccess(true)
    );
  }

  handleError(error) {
    this.messageError = error.error.message;
    this.error = true;
  }
}
