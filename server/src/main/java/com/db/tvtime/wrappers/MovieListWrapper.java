package com.db.tvtime.wrappers;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class MovieListWrapper {
    @JsonProperty("Search")
    private List<SimpleMovieWrapper> movies;

    @JsonProperty("Response")
    private String response;

    public MovieListWrapper() {
        movies = new ArrayList<>();
    }

    public List<SimpleMovieWrapper> getMovies() {
        return movies;
    }

    public String getResponse() {
        return response;
    }
}
