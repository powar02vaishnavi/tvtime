package com.db.tvtime.repositories;

import com.db.tvtime.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {
    public List<Movie> findByFavorite(Boolean favorite);
}
