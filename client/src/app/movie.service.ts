import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private serverUrl = environment.serverUrl;
  private searchMovieUrl = `${this.serverUrl}/api/search-movies?searchQuery={0}`;
  private getFavoritesUrl = `${this.serverUrl}/api/all-favorites`;
  private favoriteMovieUrl = `${this.serverUrl}/api/favorite?imdbID={0}`;
  private getAllMoviesUrl = `${this.serverUrl}/api/all-movies`

  lastSearch = '';
  lastSuccess = false;

  constructor(
    private httpClient: HttpClient,
  ) { }

  searchMovies(searchValue: string): Observable<any>{
    if (searchValue !== ''){
      this.lastSearch = searchValue;
    }
    let query: string = this.searchMovieUrl.replace("{0}", searchValue);
    return this.httpClient.get(query);
  }

  moviesTabReload(){
    if(this.lastSearch !== '' && this.lastSuccess){
      return this.searchMovies(this.lastSearch);
    }
    return of([]);
  }

  getAllFavorites(): Observable<any>{
    return this.httpClient.get(this.getFavoritesUrl);
  }

  favoriteMovie(movieId: string): Observable<any>{
    let query = this.favoriteMovieUrl.replace("{0}", movieId);
    return this.httpClient.get(query);
  }

  getAllMovies(): Observable<any>{
    return this.httpClient.get(this.getAllMoviesUrl);
  }

  updateLastSuccess(status){
    this.lastSuccess = status;
  }
}
