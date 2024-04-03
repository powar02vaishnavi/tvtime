import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../models/movie.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit, OnChanges {
  @Input() movie: Movie;

  favorite: boolean = false;
  favoriteIcon: string = 'favorite_border';

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isFavorite();
  }

  ngOnChanges() { }


  openModal(): void {
    console.log("Opening Model");
    const dialogRef = this.dialog.open(MovieModalComponent, {
      width: '50%',
      maxHeight: window.innerHeight + 'px',
      data: {movie: this.movie}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  favoriteMovie() {
    this.movieService.favoriteMovie(this.movie.imdbID).subscribe(
      movie => {
        this.movie = movie;
        this.isFavorite();
      },
      err => console.log("Error Favoriting Movie.")
    );
  }

  isFavorite() {
    if (this.movie.Favorite) {
      this.favoriteIcon = 'favorite';
    } else {
      this.favoriteIcon = 'favorite_border';
    }
  }
}
