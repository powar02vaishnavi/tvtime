package com.db.tvtime.controllers;

import java.util.*;

import com.db.tvtime.models.Movie;
import com.db.tvtime.operations.WatchlistOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class WatchlistController {

    @Autowired
    private WatchlistOperations watchlistOperations;

    @RequestMapping(value = "/search-movies", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody
    List<Movie> searchMovies(@RequestParam(value = "searchQuery") String searchQuery) {
        return watchlistOperations.searchMovies(searchQuery);
    }

    @GetMapping(path = "/all-movies")
    public @ResponseBody
    Iterable<Movie> getAllMovies() {
        return watchlistOperations.getAllMovies();
    }

    @GetMapping("/movie/{id}")
    public @ResponseBody
    Movie getMovieById(@PathVariable(value = "id") String movieId) {
        return watchlistOperations.getMovieByID(movieId);
    }

    @RequestMapping(value = "/favorite", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody
    Movie favoriteMovie(@RequestParam(value = "imdbID") String imdbID) {
        return watchlistOperations.favoriteMovie(imdbID);
    }

    @GetMapping(path = "/all-favorites")
    public @ResponseBody
    List<Movie> getAllFavorites() {
        return watchlistOperations.getAllFavorites();
    }
}
