package com.db.tvtime.operations;

import com.db.tvtime.repositories.MovieRepository;
import com.db.tvtime.exceptions.EmptySearchQueryException;
import com.db.tvtime.exceptions.ResourceNotFoundException;
import com.db.tvtime.models.Movie;
import com.db.tvtime.wrappers.MovieListWrapper;
import com.db.tvtime.wrappers.SimpleMovieWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Component
public class WatchlistOperations {

    @Value("${imdb.key}")
    private String apiKey;

    @Value("${imdb.search.movie.url}")
    private String multipleMovieUrl;

    @Value("${imdb.get.movie.id.url}")
    private String byIDMovieUrl;

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    public Movie getMovieByID(String movieId){
        return movieRepository
                .findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", movieId));
    }

    public List<Movie> getAllFavorites(){
        return movieRepository.findByFavorite(true);
    }

    public Movie favoriteMovie(String movieId){
        Optional<Movie> movieChecker = movieRepository.findById(movieId);
        if (movieChecker.isPresent()) {
            Movie chosenMovie = movieChecker.get();
            chosenMovie.setFavorite(!chosenMovie.getFavorite());
            movieRepository.save(chosenMovie);
            return chosenMovie;
        } else {
            throw new ResourceNotFoundException("Movie", "id", movieId);
        }
    }

    public List<Movie> searchMovies(String searchQuery){
        if (searchQuery.isEmpty()){
            throw new EmptySearchQueryException();
        }

        RestTemplate restTemplate = new RestTemplate();

        MovieListWrapper simpleMovieListWrapper = restTemplate.getForObject(
                String.format(multipleMovieUrl, searchQuery, apiKey), MovieListWrapper.class);

        if (Objects.requireNonNull(simpleMovieListWrapper).getResponse().equalsIgnoreCase("True")) {
            List<Movie> movies = fetchAndSaveMovies(simpleMovieListWrapper);
            return removeDuplicates(movies);
        } else {
            throw new ResourceNotFoundException("Movie", "title", searchQuery);
        }
    }

    private List<Movie> fetchAndSaveMovies(MovieListWrapper simpleMovieListWrapper) {
        List<Movie> movies = new ArrayList<>();
        for (SimpleMovieWrapper m : simpleMovieListWrapper.getMovies()) {
            Optional<Movie> movieChecker = movieRepository.findById(m.getImdbID());
            if (movieChecker.isPresent()) {
                Movie existentMovie = movieChecker.get();
                movies.add(existentMovie);
            } else {
                Movie newMovie = fetchSingleMovieByID(m.getImdbID());
                if (newMovie != null) {
                    movieRepository.save(newMovie);
                    movies.add(newMovie);
                }
            }
        }
        return movies;
    }

    private Movie fetchSingleMovieByID(String imdbID) {
        RestTemplate restTemplate = new RestTemplate();
        Movie movie = restTemplate.getForObject(String.format(byIDMovieUrl, imdbID, apiKey), Movie.class);
        if (movie != null && movie.getResponse().equalsIgnoreCase("True")) {
            return movie;
        }
        return null;
    }

    private List<Movie> removeDuplicates(List<Movie> movieList){
        Set<Movie> set = new LinkedHashSet<>(movieList);
        movieList.clear();
        movieList.addAll(set);
        return movieList;
    }
}
